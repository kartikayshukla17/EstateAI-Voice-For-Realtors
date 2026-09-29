/**
 * Cheap fixed gradient + grain layers, no JS/images — pattern adapted from
 * drillback's .sky/.grain technique, re-themed to a warm-paper palette.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(60% 50% at 15% 0%, oklch(85% 0.05 60 / 0.5), transparent 60%), " +
          "radial-gradient(50% 40% at 100% 20%, oklch(88% 0.04 90 / 0.4), transparent 60%)",
      }}
    />
  );
}
