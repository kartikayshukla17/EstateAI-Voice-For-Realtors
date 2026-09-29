import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { CallSession } from "~/types/call";
import type { Lead } from "~/types/lead";

export function CallListRow({ call, lead }: { call: CallSession; lead: Lead }) {
  return (
    <Link
      to={`/calls/${call.id}`}
      className="flex items-center justify-between gap-4 border-b px-1 py-3 text-sm last:border-b-0"
      style={{ borderColor: "var(--color-line)" }}
    >
      <div>
        <p className="font-medium">{lead.name}</p>
        <p style={{ color: "var(--color-text-faint)" }}>
          {new Date(call.startedAt).toLocaleString()} · {call.durationSeconds}s
        </p>
      </div>
      <div className="flex items-center gap-3">
        {call.handoffTriggered && <Badge tone="handoff">Escalated</Badge>}
        {lead.qualified && <Badge tone="qualified">Qualified</Badge>}
        <span className="font-mono" style={{ color: "var(--color-text-dim)" }}>
          {call.scorecard ? `${call.scorecard.overallScore}/100` : "—"}
        </span>
      </div>
    </Link>
  );
}
