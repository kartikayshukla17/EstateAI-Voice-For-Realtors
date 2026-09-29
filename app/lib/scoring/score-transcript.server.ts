import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI, Type } from "@google/genai";
import type { Lead, LeadLanguage, UnitConfig } from "~/types/lead";
import type { ScoreParameterKey, TranscriptLine } from "~/types/call";

const MODEL = "gemini-3.5-flash-lite";

const SCORE_PARAMETER_KEYS: ScoreParameterKey[] = [
  "greeting",
  "languageHandling",
  "objectionHandling",
  "tone",
  "guardrailCompliance",
  "resolution",
];

// Read once per process, not per request — the file doesn't change at runtime.
const SYSTEM_PROMPT = readFileSync(join(process.cwd(), "docs", "system-prompt.md"), "utf-8");

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    lead: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        phone: { type: Type.STRING },
        language: { type: Type.STRING, enum: ["hindi", "english", "hinglish"] },
        config: { type: Type.STRING, enum: ["2bhk", "2bhk_study", "3bhk", "3bhk_servant", "unknown"] },
        budgetInr: { type: Type.NUMBER, nullable: true },
        timelineMonths: { type: Type.NUMBER, nullable: true },
        locality: { type: Type.STRING, nullable: true },
        wantsLoanAssistance: { type: Type.BOOLEAN },
        summary: { type: Type.STRING },
      },
      required: ["name", "phone", "language", "config", "wantsLoanAssistance", "summary"],
    },
    handoff: {
      type: Type.OBJECT,
      properties: {
        triggered: { type: Type.BOOLEAN },
        reason: { type: Type.STRING, nullable: true },
      },
      required: ["triggered"],
    },
    scorecard: {
      type: Type.OBJECT,
      properties: {
        overallScore: { type: Type.NUMBER },
        callSuccessful: { type: Type.BOOLEAN },
        parameters: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              key: { type: Type.STRING, enum: SCORE_PARAMETER_KEYS },
              score: { type: Type.NUMBER },
              rationale: { type: Type.STRING },
            },
            required: ["key", "score", "rationale"],
          },
        },
      },
      required: ["overallScore", "callSuccessful", "parameters"],
    },
  },
  required: ["lead", "handoff", "scorecard"],
};

interface ScoredResult {
  lead: Pick<
    Lead,
    "name" | "phone" | "language" | "config" | "budgetINR" | "timelineMonths" | "locality" | "wantsLoanAssistance" | "summary"
  >;
  handoff: { triggered: boolean; reason: string | null };
  scorecard: {
    overallScore: number;
    callSuccessful: boolean;
    parameters: { key: ScoreParameterKey; label: string; score: number; rationale: string }[];
  };
}

const PARAMETER_LABELS: Record<ScoreParameterKey, string> = {
  greeting: "Greeting",
  languageHandling: "Language handling",
  objectionHandling: "Objection handling",
  tone: "Tone",
  guardrailCompliance: "Guardrail compliance",
  resolution: "Resolution",
};

function formatTranscriptForPrompt(transcript: TranscriptLine[]): string {
  return transcript
    .map((line) => `[${(line.timestampMs / 1000).toFixed(0)}s] ${line.speaker === "agent" ? "Vera" : "Caller"}: ${line.text}`)
    .join("\n");
}

export async function scoreTranscript(
  transcript: TranscriptLine[],
  transcriptSummary: string | null,
): Promise<ScoredResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set — see docs/SETUP.md.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `You are evaluating a completed call transcript for a voice AI real-estate agent named Vera, against her own instructions. Here are Vera's full instructions (her system prompt), which define correct behavior:

---
${SYSTEM_PROMPT}
---

Here is the call transcript to evaluate:

---
${formatTranscriptForPrompt(transcript)}
---

${transcriptSummary ? `A third-party summary of the call: ${transcriptSummary}\n` : ""}

Do two things:

1. Extract every lead fact the caller gave (name, phone, language they spoke, which unit config they're interested in, budget in INR, timeline in months, locality, whether they want loan assistance), plus a 1-2 sentence summary of the call. Use "unknown" for config if never mentioned, and null for any other field never mentioned. Never invent a fact that wasn't said.

2. Score Vera's performance in this specific call against her own instructions above, on a 0-5 scale for each of these six parameters: greeting, languageHandling, objectionHandling, tone, guardrailCompliance, resolution. Give a one-sentence rationale for each score that cites something specific from the transcript. Compute overallScore as a 0-100 aggregate. Set callSuccessful to true only if the call ended in either a site visit being offered or contact details being captured. Also determine whether Vera handed off to a human during this call, and if so, why.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response while scoring the transcript.");
  }

  const parsed = JSON.parse(text) as {
    lead: {
      name: string;
      phone: string;
      language: LeadLanguage;
      config: UnitConfig | "unknown";
      budgetInr: number | null;
      timelineMonths: number | null;
      locality: string | null;
      wantsLoanAssistance: boolean;
      summary: string;
    };
    handoff: { triggered: boolean; reason: string | null };
    scorecard: {
      overallScore: number;
      callSuccessful: boolean;
      parameters: { key: ScoreParameterKey; score: number; rationale: string }[];
    };
  };

  return {
    lead: {
      name: parsed.lead.name,
      phone: parsed.lead.phone,
      language: parsed.lead.language,
      config: parsed.lead.config === "unknown" ? null : parsed.lead.config,
      budgetINR: parsed.lead.budgetInr,
      timelineMonths: parsed.lead.timelineMonths,
      locality: parsed.lead.locality,
      wantsLoanAssistance: parsed.lead.wantsLoanAssistance,
      summary: parsed.lead.summary,
    },
    handoff: parsed.handoff,
    scorecard: {
      overallScore: parsed.scorecard.overallScore,
      callSuccessful: parsed.scorecard.callSuccessful,
      parameters: parsed.scorecard.parameters.map((p) => ({
        ...p,
        label: PARAMETER_LABELS[p.key],
      })),
    },
  };
}
