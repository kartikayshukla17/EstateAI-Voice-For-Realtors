export function HandoffBanner({ reason }: { reason: string }) {
  return (
    <div
      role="status"
      className="rounded-lg border px-4 py-3 text-sm"
      style={{
        borderColor: "color-mix(in oklch, var(--color-handoff) 40%, transparent)",
        background: "color-mix(in oklch, var(--color-handoff) 8%, var(--color-bg-0))",
        color: "var(--color-handoff)",
      }}
    >
      <strong>Escalating to a human agent.</strong> {reason}
    </div>
  );
}
