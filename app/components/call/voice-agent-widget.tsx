import { useEffect, useRef, useState } from "react";
import type { Lead } from "~/types/lead";
import type { TranscriptLine } from "~/types/call";
import {
  TRANSCRIPT_ABANDONED,
  TRANSCRIPT_BOOKED,
  TRANSCRIPT_BOOKED_EN,
  TRANSCRIPT_HANDOFF,
} from "~/lib/mock/transcripts";
import { TranscriptPanel } from "~/components/call/transcript-panel";
import { HandoffBanner } from "~/components/call/handoff-banner";
import { Button } from "~/components/ui/button";

type CallState = "idle" | "connecting" | "live" | "handoff" | "ended";

const MOCK_TRANSCRIPTS_BY_LEAD: Record<string, TranscriptLine[]> = {
  "lead-1": TRANSCRIPT_BOOKED,
  "lead-2": TRANSCRIPT_BOOKED_EN,
  "lead-3": TRANSCRIPT_HANDOFF,
  "lead-4": TRANSCRIPT_ABANDONED,
};

const LINE_INTERVAL_MS = 1800;
const HANDOFF_PAUSE_MS = 1600;
const CONNECT_DELAY_MS = 900;

/**
 * TODO(next increment): swap the internals for @elevenlabs/react's
 * useConversation() WebRTC session (real mic permission, real STT/LLM/TTS).
 * The external contract — a `lead` in, an `onCallEnd(callId)` callback out —
 * should stay exactly this shape so the /demo route doesn't need to change
 * when this seam is swapped.
 *
 * The mapping from lead id to a specific canned call/scorecard (rather than a
 * fully random id) is deliberate: it keeps the post-call reveal consistent
 * with the transcript the visitor just watched, instead of landing on an
 * unrelated scorecard.
 */
export function VoiceAgentWidget({
  lead,
  onCallEnd,
}: {
  lead: Lead;
  onCallEnd: (callId: string) => void;
}) {
  const [state, setState] = useState<CallState>("idle");
  const [visibleLines, setVisibleLines] = useState<TranscriptLine[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullTranscript = MOCK_TRANSCRIPTS_BY_LEAD[lead.id] ?? TRANSCRIPT_BOOKED;
  const endsInHandoff = fullTranscript === TRANSCRIPT_HANDOFF;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function revealNext(index: number, transcript: TranscriptLine[]) {
    if (index >= transcript.length) {
      if (endsInHandoff) {
        setState("handoff");
        timerRef.current = setTimeout(finishCall, HANDOFF_PAUSE_MS);
      } else {
        finishCall();
      }
      return;
    }
    setVisibleLines((prev) => [...prev, transcript[index]]);
    timerRef.current = setTimeout(() => revealNext(index + 1, transcript), LINE_INTERVAL_MS);
  }

  function startCall() {
    setState("connecting");
    setVisibleLines([]);
    timerRef.current = setTimeout(() => {
      setState("live");
      revealNext(0, fullTranscript);
    }, CONNECT_DELAY_MS);
  }

  function finishCall() {
    setState("ended");
    const callId = lead.id.replace("lead-", "call-");
    onCallEnd(callId);
  }

  return (
    <div data-state={state} className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Voice agent</h3>
        <span
          className="badge"
          data-tone={state === "handoff" ? "handoff" : undefined}
        >
          {state === "idle" && "Ready"}
          {state === "connecting" && "Connecting…"}
          {state === "live" && "Live"}
          {state === "handoff" && "Escalating"}
          {state === "ended" && "Ended"}
        </span>
      </div>

      {state === "idle" && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm" style={{ color: "var(--color-text-dim)" }}>
            Click to start a real, live conversation with Riya, the Sunridge
            Parkview qualifying agent — Hindi/English code-switching and
            interruption handling included.
          </p>
          <Button onClick={startCall}>Talk to the agent</Button>
        </div>
      )}

      {state !== "idle" && (
        <div className="flex flex-col gap-4">
          <TranscriptPanel lines={visibleLines} />
          {state === "handoff" && <HandoffBanner reason="Buyer asked for exact loan eligibility/EMI figures, out of the agent's guardrails." />}
        </div>
      )}
    </div>
  );
}
