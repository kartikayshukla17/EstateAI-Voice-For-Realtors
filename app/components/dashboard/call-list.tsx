import { Card } from "~/components/ui/card";
import { CallListRow } from "~/components/dashboard/call-list-row";
import type { CallSession } from "~/types/call";
import type { Lead } from "~/types/lead";

export function CallList({ calls, leadsById }: { calls: CallSession[]; leadsById: Record<string, Lead> }) {
  if (calls.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
          No calls yet — click "Talk to the agent" to run the demo.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-2">
      {calls.map((call) => {
        const lead = leadsById[call.leadId];
        if (!lead) return null;
        return <CallListRow key={call.id} call={call} lead={lead} />;
      })}
    </Card>
  );
}
