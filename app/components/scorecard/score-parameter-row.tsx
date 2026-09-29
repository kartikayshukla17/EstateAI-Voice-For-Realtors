import type { ScoreParameter } from "~/types/call";

export function ScoreParameterRow({ parameter }: { parameter: ScoreParameter }) {
  return (
    <div className="flex flex-col gap-1 border-b py-3 last:border-b-0" style={{ borderColor: "var(--color-line)" }}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{parameter.label}</span>
        <span className="font-mono text-sm" style={{ color: "var(--color-accent)" }}>
          {parameter.score}/5
        </span>
      </div>
      <p className="text-sm" style={{ color: "var(--color-text-dim)" }}>
        {parameter.rationale}
      </p>
    </div>
  );
}
