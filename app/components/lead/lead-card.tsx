import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { UNIT_CONFIG_LABELS, type Lead } from "~/types/lead";

function formatINR(amount: number | null): string {
  if (amount === null) return "Not shared";
  if (amount >= 10_000_000) return `Rs ${(amount / 10_000_000).toFixed(2)} crore`;
  return `Rs ${(amount / 100_000).toFixed(1)} lakh`;
}

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
            Incoming lead
          </p>
          <h2 className="text-xl font-semibold">{lead.name}</h2>
          <p className="text-sm" style={{ color: "var(--color-text-dim)" }}>
            {lead.phone}
          </p>
        </div>
        <Badge tone={lead.qualified ? "qualified" : undefined}>
          {lead.qualified ? "Qualified" : "Not yet qualified"}
        </Badge>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt style={{ color: "var(--color-text-faint)" }}>Interested in</dt>
          <dd>{lead.config ? UNIT_CONFIG_LABELS[lead.config] : "Not shared"}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--color-text-faint)" }}>Budget</dt>
          <dd>{formatINR(lead.budgetINR)}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--color-text-faint)" }}>Timeline</dt>
          <dd>{lead.timelineMonths !== null ? `${lead.timelineMonths} months` : "Not shared"}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--color-text-faint)" }}>Locality</dt>
          <dd>{lead.locality ?? "Not shared"}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--color-line)" }}>
        <span className="text-sm" style={{ color: "var(--color-text-faint)" }}>
          Propensity score
        </span>
        <span className="font-mono text-lg" style={{ color: "var(--color-accent)" }}>
          {lead.propensityScore}
        </span>
      </div>
    </Card>
  );
}
