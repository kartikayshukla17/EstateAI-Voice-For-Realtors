import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type { TranscriptLine, Scorecard } from "~/types/call";

// Better Auth's own tables (user, session, account, verification) are
// generated separately by its CLI once app/lib/auth/auth.server.ts exists —
// not hand-written here. This file only owns EstateAI's own domain tables.

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  language: text("language").notNull(), // "hindi" | "english" | "hinglish"
  config: text("config"), // UnitConfig | null
  budgetInr: integer("budget_inr"),
  timelineMonths: integer("timeline_months"),
  locality: text("locality"),
  wantsLoanAssistance: boolean("wants_loan_assistance").notNull().default(false),
  qualified: boolean("qualified").notNull().default(false),
  propensityScore: integer("propensity_score").notNull().default(0),
  summary: text("summary"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const calls = pgTable("calls", {
  id: text("id").primaryKey(), // ElevenLabs conversation_id
  leadId: text("lead_id")
    .notNull()
    .references(() => leads.id),
  status: text("status").notNull(), // CallStatus
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  durationSeconds: integer("duration_seconds"),
  handoffTriggered: boolean("handoff_triggered").notNull().default(false),
  handoffReason: text("handoff_reason"),
  transcriptSummary: text("transcript_summary"),
  // Small, fixed-shape structured data — jsonb is the right call here rather
  // than normalizing transcript lines / scorecard parameters into their own
  // tables for what's always read/written as one unit per call.
  transcript: jsonb("transcript").$type<TranscriptLine[]>().notNull().default([]),
  scorecard: jsonb("scorecard").$type<Scorecard | null>(),
});
