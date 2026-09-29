import { requireUser } from "~/lib/auth/require-user.server";
import { getMockCallSession } from "~/lib/mock/calls";
import { getMockLead } from "~/lib/mock/leads";
import { TranscriptPanel } from "~/components/call/transcript-panel";
import { ScorecardPanel } from "~/components/scorecard/scorecard-panel";
import { Card } from "~/components/ui/card";
import type { Route } from "./+types/call-detail";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireUser(request);
  // TODO(next increment): db.query.calls.findFirst({ where: eq(calls.id, params.callId) })
  // + ownership/visibility check + `throw new Response("Not found", { status: 404 })`
  // on a real miss. getMockCallSession() always returns a canned record in
  // this increment (falls back to the first fixture), so there's no real
  // "miss" case to 404 on yet — that check lands with the DB swap.
  const call = getMockCallSession(params.callId);
  const lead = getMockLead(call.leadId);
  return { user, call, lead };
}

export default function CallDetail({ loaderData }: Route.ComponentProps) {
  const { call, lead } = loaderData;
  return (
    <main className="wrap py-12">
      <p className="font-mono text-xs uppercase tracking-wide" style={{ color: "var(--color-text-faint)" }}>
        Call with {lead.name} · {new Date(call.startedAt).toLocaleString()}
      </p>
      <h1 className="mt-2 mb-6 text-xl font-semibold">{call.transcriptSummary}</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-semibold">Transcript</h2>
          <TranscriptPanel lines={call.transcript} />
        </Card>
        <ScorecardPanel scorecard={call.scorecard} />
      </div>
    </main>
  );
}
