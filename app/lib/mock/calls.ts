import type { CallSession, Scorecard } from "~/types/call";
import {
  TRANSCRIPT_ABANDONED,
  TRANSCRIPT_BOOKED,
  TRANSCRIPT_BOOKED_EN,
  TRANSCRIPT_HANDOFF,
} from "~/lib/mock/transcripts";

const SCORECARD_STRONG: Scorecard = {
  overallScore: 92,
  callSuccessful: true,
  parameters: [
    { key: "greeting", label: "Greeting", score: 5, rationale: "Disclosed it's an automated assistant and the recording notice up front, as required." },
    { key: "languageHandling", label: "Language handling", score: 5, rationale: "Mirrored the caller's Hinglish naturally without ever commenting on it." },
    { key: "objectionHandling", label: "Objection handling", score: 4, rationale: "No real objections raised; handled the loan question by deferring to a colleague correctly." },
    { key: "tone", label: "Tone", score: 5, rationale: "Warm, unhurried, no hard-sell — matched the target tone throughout." },
    { key: "guardrailCompliance", label: "Guardrail compliance", score: 5, rationale: "No discounts, no price-appreciation claims, no unit hold promised; loan specifics correctly deferred." },
    { key: "resolution", label: "Resolution", score: 5, rationale: "Site visit booked with a confirmed day/time; name and phone captured." },
  ],
};

const SCORECARD_HANDOFF: Scorecard = {
  overallScore: 74,
  callSuccessful: true,
  parameters: [
    { key: "greeting", label: "Greeting", score: 5, rationale: "Opened correctly with the automated-assistant and recording disclosure." },
    { key: "languageHandling", label: "Language handling", score: 5, rationale: "Stayed in Hindi/Hinglish matching the caller throughout." },
    { key: "objectionHandling", label: "Objection handling", score: 3, rationale: "Caller pushed twice for exact EMI figures before the agent escalated — could have offered the handoff a turn earlier." },
    { key: "tone", label: "Tone", score: 4, rationale: "Stayed calm and non-defensive when pressed on a guardrail topic." },
    { key: "guardrailCompliance", label: "Guardrail compliance", score: 5, rationale: "Correctly refused to give exact loan eligibility/EMI figures and escalated on request, exactly as instructed." },
    { key: "resolution", label: "Resolution", score: 3, rationale: "No visit booked; handed off to a human rather than closing the qualification itself." },
  ],
};

const CALLS: CallSession[] = [
  {
    id: "call-1",
    leadId: "lead-1",
    status: "completed",
    startedAt: "2026-09-20T10:15:00.000Z",
    endedAt: "2026-09-20T10:16:35.000Z",
    durationSeconds: 95,
    handoffTriggered: false,
    handoffReason: null,
    transcriptSummary: "Qualified 3 BHK lead, budget ~1.2Cr, wants loan help. Booked Saturday 3 PM site visit.",
    transcript: TRANSCRIPT_BOOKED,
    scorecard: SCORECARD_STRONG,
  },
  {
    id: "call-2",
    leadId: "lead-2",
    status: "completed",
    startedAt: "2026-09-21T14:40:00.000Z",
    endedAt: "2026-09-21T14:41:33.000Z",
    durationSeconds: 93,
    handoffTriggered: false,
    handoffReason: null,
    transcriptSummary: "Qualified 2 BHK lead, budget ~85L, wants loan help. Booked Saturday 11 AM site visit.",
    transcript: TRANSCRIPT_BOOKED_EN,
    scorecard: {
      ...SCORECARD_STRONG,
      overallScore: 90,
      parameters: SCORECARD_STRONG.parameters.map((p) =>
        p.key === "languageHandling"
          ? { ...p, rationale: "Caller stayed in English throughout; agent matched cleanly with no code-switching needed." }
          : p,
      ),
    },
  },
  {
    id: "call-3",
    leadId: "lead-3",
    status: "escalated",
    startedAt: "2026-09-22T09:05:00.000Z",
    endedAt: "2026-09-22T09:06:00.000Z",
    durationSeconds: 60,
    handoffTriggered: true,
    handoffReason: "Buyer asked for exact loan eligibility/EMI figures, out of the agent's guardrails — escalated on request.",
    transcriptSummary: "Interested in 2 BHK + study, ~60L budget, ~12 month timeline. Pushed for exact EMI figures; escalated to a human.",
    transcript: TRANSCRIPT_HANDOFF,
    scorecard: SCORECARD_HANDOFF,
  },
  {
    id: "call-4",
    leadId: "lead-4",
    status: "abandoned",
    startedAt: "2026-09-23T18:22:00.000Z",
    endedAt: "2026-09-23T18:22:20.000Z",
    durationSeconds: 20,
    handoffTriggered: false,
    handoffReason: null,
    transcriptSummary: "Only asked for 3 BHK pricing; call dropped before budget/timeline were captured.",
    transcript: TRANSCRIPT_ABANDONED,
    scorecard: null,
  },
];

/**
 * TODO(next increment): replace with `db.query.calls.findFirst({ where: eq(calls.id, id) })`
 * + ownership/visibility check + 404 on a real miss. For this increment, any id
 * not in the fixture list falls back to CALLS[0] so the /demo → /calls/:randomId
 * flow (using a client-generated crypto.randomUUID()) always has something to show.
 */
export function getMockCallSession(id: string): CallSession {
  return CALLS.find((c) => c.id === id) ?? CALLS[0];
}

export function listMockCallSessions(): CallSession[] {
  return CALLS;
}
