export type CallStatus = "in_progress" | "completed" | "escalated" | "abandoned";

export interface TranscriptLine {
  id: string;
  speaker: "agent" | "caller";
  text: string;
  language: "hindi" | "english" | "hinglish";
  timestampMs: number;
}

export type ScoreParameterKey =
  | "greeting"
  | "languageHandling"
  | "objectionHandling"
  | "tone"
  | "guardrailCompliance"
  | "resolution";

export interface ScoreParameter {
  key: ScoreParameterKey;
  label: string;
  score: number; // 0-5
  rationale: string;
}

export interface Scorecard {
  overallScore: number; // 0-100 aggregate
  parameters: ScoreParameter[];
  callSuccessful: boolean; // mirrors ElevenLabs analysis.call_successful
}

export interface CallSession {
  id: string; // mirrors ElevenLabs data.conversation_id
  leadId: string;
  status: CallStatus;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number | null;
  handoffTriggered: boolean;
  handoffReason: string | null;
  transcriptSummary: string | null; // mirrors analysis.transcript_summary
  transcript: TranscriptLine[];
  scorecard: Scorecard | null; // null while in_progress / not yet scored
}
