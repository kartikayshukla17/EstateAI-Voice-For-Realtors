import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { z } from "zod";
import { db } from "~/lib/db/client";
import { calls, leads } from "~/lib/db/schema";
import { detectLanguage } from "~/lib/detect-language";
import { isQualified } from "~/lib/qualify";
import { scoreTranscript } from "~/lib/scoring/score-transcript.server";
import type { CallStatus, TranscriptLine } from "~/types/call";
import type { Route } from "./+types/post-call";

// Parsed defensively — every field we don't strictly need is optional or
// passed through, since this is untrusted external input and ElevenLabs'
// payload may carry more than we use.
const postCallPayloadSchema = z
  .object({
    event_timestamp: z.number().optional(),
    data: z
      .object({
        conversation_id: z.string(),
        transcript: z
          .array(
            z.object({
              role: z.enum(["agent", "user"]),
              message: z.string().nullable(),
              time_in_call_secs: z.number(),
            }),
          )
          .optional(),
        analysis: z
          .object({
            transcript_summary: z.string().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
  })
  .passthrough();

export async function action({ request }: Route.ActionArgs) {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured yet — fail loudly rather than silently accepting
    // unverified webhooks once ElevenLabs is wired up.
    return new Response("ELEVENLABS_WEBHOOK_SECRET is not set", { status: 500 });
  }

  const sigHeader = request.headers.get("elevenlabs-signature");
  if (!sigHeader) {
    return new Response("Missing elevenlabs-signature header", { status: 401 });
  }

  const rawBody = await request.text();

  const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
  let event: unknown;
  try {
    event = await client.webhooks.constructEvent(rawBody, sigHeader, secret);
  } catch {
    return new Response("Invalid webhook signature", { status: 401 });
  }

  const parsed = postCallPayloadSchema.safeParse(event);
  if (!parsed.success) {
    return new Response("Unrecognized payload shape", { status: 400 });
  }

  const { data, event_timestamp } = parsed.data;
  const rawTranscript = data.transcript ?? [];

  const transcript: TranscriptLine[] = rawTranscript
    .filter((turn) => turn.message)
    .map((turn, i) => ({
      id: `t-${i}`,
      speaker: turn.role === "agent" ? "agent" : "caller",
      text: turn.message as string,
      language: detectLanguage(turn.message as string),
      timestampMs: Math.round(turn.time_in_call_secs * 1000),
    }));

  const transcriptSummary = data.analysis?.transcript_summary ?? null;

  const scored = await scoreTranscript(transcript, transcriptSummary);
  const qualified = isQualified({
    budgetINR: scored.lead.budgetINR,
    timelineMonths: scored.lead.timelineMonths,
  });

  // Deterministic from conversation_id, not random — a retried webhook for
  // the same call upserts the same rows instead of duplicating them.
  const leadId = `lead-${data.conversation_id}`;

  const leadValues = {
    id: leadId,
    name: scored.lead.name || "Unknown caller",
    phone: scored.lead.phone || "Not shared",
    language: scored.lead.language,
    config: scored.lead.config,
    budgetInr: scored.lead.budgetINR,
    timelineMonths: scored.lead.timelineMonths,
    locality: scored.lead.locality,
    wantsLoanAssistance: scored.lead.wantsLoanAssistance,
    qualified,
    // A simple derived placeholder, not a real predictive model — same
    // spirit as the mock fixtures' propensityScore, just computed from the
    // one signal we actually have post-call (whether the lead qualified).
    propensityScore: qualified ? 75 : 30,
    summary: scored.lead.summary,
  };

  await db.insert(leads).values(leadValues).onConflictDoUpdate({ target: leads.id, set: leadValues });

  const status: CallStatus = scored.handoff.triggered ? "escalated" : "completed";
  const startedAt = new Date((event_timestamp ?? Date.now() / 1000) * 1000);
  const durationSeconds = transcript.length
    ? Math.round(transcript[transcript.length - 1].timestampMs / 1000)
    : null;

  const callValues = {
    id: data.conversation_id,
    leadId,
    status,
    startedAt,
    endedAt: new Date(),
    durationSeconds,
    handoffTriggered: scored.handoff.triggered,
    handoffReason: scored.handoff.reason,
    transcriptSummary,
    transcript,
    scorecard: scored.scorecard,
  };

  await db.insert(calls).values(callValues).onConflictDoUpdate({ target: calls.id, set: callValues });

  return new Response("ok", { status: 200 });
}
