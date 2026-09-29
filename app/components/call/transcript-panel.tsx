import type { TranscriptLine } from "~/types/call";
import { TranscriptLineRow } from "~/components/call/transcript-line";

export function TranscriptPanel({ lines }: { lines: TranscriptLine[] }) {
  if (lines.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
        Transcript will appear here once the call connects.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line) => (
        <TranscriptLineRow key={line.id} line={line} />
      ))}
    </div>
  );
}
