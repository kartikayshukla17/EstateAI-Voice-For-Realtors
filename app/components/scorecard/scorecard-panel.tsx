import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ScoreParameterRow } from "~/components/scorecard/score-parameter-row";
import type { Scorecard } from "~/types/call";

export function ScorecardPanel({ scorecard }: { scorecard: Scorecard | null }) {
  if (!scorecard) {
    return (
      <Card className="p-6">
        <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
          No scorecard — this call ended before the agent gathered enough to
          evaluate.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Call quality scorecard</h3>
        <Badge tone={scorecard.callSuccessful ? "qualified" : undefined}>
          {scorecard.overallScore}/100
        </Badge>
      </div>
      <div>
        {scorecard.parameters.map((parameter) => (
          <ScoreParameterRow key={parameter.key} parameter={parameter} />
        ))}
      </div>
    </Card>
  );
}
