import type { ReactNode } from "react";

export function Badge({
  tone,
  children,
}: {
  tone?: "qualified" | "handoff";
  children: ReactNode;
}) {
  return (
    <span className="badge" data-tone={tone}>
      {children}
    </span>
  );
}
