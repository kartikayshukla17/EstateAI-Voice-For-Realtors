import type { TranscriptLine as TranscriptLineType } from "~/types/call";

export function TranscriptLineRow({ line }: { line: TranscriptLineType }) {
  const isAgent = line.speaker === "agent";
  return (
    <div
      className="flex flex-col gap-1"
      style={{ alignItems: isAgent ? "flex-start" : "flex-end" }}
    >
      <span
        className="font-mono text-xs uppercase tracking-wide"
        style={{ color: "var(--color-text-faint)" }}
      >
        {isAgent ? "Riya (agent)" : "Caller"} · {line.language}
      </span>
      <p
        className="max-w-[85%] rounded-lg px-3 py-2 text-sm"
        style={{
          background: isAgent ? "var(--color-bg-1)" : "var(--color-bg-2)",
          border: "1px solid var(--color-line)",
        }}
      >
        {line.text}
      </p>
    </div>
  );
}
