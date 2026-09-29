# Design — EstateAI (home page)

Locked design system for the home page redesign, studied from fin.ai's
typography. Future Hallmark runs on this page read this file first.
Scope note: this covers the **marketing home page** specifically — the
app's data-dense surfaces (dashboard, call detail, scorecard) are out of
scope and keep their existing IBM Plex system unless amended here later.

## System
- Genre · modern-minimal
- Macrostructure · Marquee Hero, with a deliberate deviation: the strict
  archetype specifies no subhead/no CTA in the fold, but EstateAI's hero
  keeps both — a recruiter skimming this needs the value clear in seconds,
  not after a blind scroll. fin.ai's own hero also pairs a headline with
  dual CTAs, so the pure "typography only" reading doesn't even match the
  source faithfully. Hero fills the fold; a 3-card grid follows below.
- Theme · studied-DNA (source: url, https://fin.ai/)
- Axes · light paper / grotesk-sans display / warm accent

## Provenance
- Source: `https://fin.ai/`, read 2026-09-29.
- Attestation: public reference for EstateAI's own brand, not fin.ai's own
  site — proceeding on that basis given the conversation context (fin.ai is
  a well-known third-party company being used as design inspiration, not a
  source being represented as EstateAI's own work). Flag if that's wrong.
- Confidence: typography and background colour are **exact**, pasted
  directly from fin.ai's DevTools Computed panel by the user (not a
  WebFetch guess). Accent colour is **approximated** — visually apparent
  on the source but no exact hex was captured. Macrostructure is a
  **lower-confidence inference** from a page description, not DOM-level
  extraction. Rhythm (density, pacing) is **unknown** — the standard
  URL-mode blind spot; a fetch can't judge whether spacing reads generous
  or templated.

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:      oklch(100% 0 0);           /* confirmed: rgb(255,255,255) */
  --color-paper-2:     oklch(97% 0.003 90);        /* estimated — subtle card lift off white */
  --color-ink:         oklch(20% 0.01 260);        /* estimated — near-black, not captured exactly */
  --color-ink-2:       oklch(45% 0.01 260);        /* estimated */
  --color-rule:        oklch(90% 0.005 90);        /* estimated — hairline border */
  --color-accent:      oklch(70% 0.15 45);         /* APPROXIMATED — warm coral/orange, no exact hex captured */
  --color-accent-ink:  oklch(99% 0.005 90);
  --color-focus:       oklch(70% 0.15 45);         /* reuses accent */

  --font-display: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* CONFIRMED — fin.ai's exact computed font-family */
  --font-body:    ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* CONFIRMED — same stack throughout, no second family found */
  --font-mono:    "IBM Plex Mono", ui-monospace, monospace; /* kept from EstateAI's existing system, NOT part of the fin.ai DNA — fin.ai's own labels are uppercase sans, not mono (see Notes) */

  /* 4-pt spacing scale, named: --space-3xs … --space-4xl. */
  /* Type scale, 1.25 (major-third) ratio: --text-xs … --text-display. */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;  --dur-base: 240ms;  --dur-slow: 320ms;

  --radius-card: 12px;   /* estimated */
  --radius-pill: 999px;  /* estimated */
  --radius-input: 8px;   /* estimated */
}
```

## CTA voice
- Primary · filled accent · `--radius-pill` · generous horizontal padding
- Secondary · plain text link, no border — fin.ai leans on restraint over a
  visible ghost-button secondary action

## Motion stance
- 2 reveal primitives: fade + slide-up per section, triggered by
  `IntersectionObserver` as each section enters the viewport — the *feel*
  of fin.ai's long-page progressive reveal, built with a standard technique
  rather than a guessed-at reverse-engineering of their actual JS.
- Reduced-motion fallback · ≤150ms opacity crossfade, no slide.

## Notes
- **Anti-patterns to not carry over:** none confidently detected — this
  read came from a URL fetch, not a live browser inspection, so script-level
  anti-patterns (transition-all, hover-scale, bouncy easing) couldn't be
  checked. Don't assume the absence of a flag here means the source is
  clean — it means the signal wasn't available.
- **Devanagari tradeoff:** switching from IBM Plex Sans Devanagari to this
  system-font stack still renders Hindi text correctly (OS-level font
  fallback covers Devanagari codepoints even though `system-ui` doesn't
  name a Devanagari font explicitly), but loses the *intentional*
  cross-script visual coherence IBM Plex was originally chosen for. Real
  tradeoff, not a technical risk — worth revisiting if the redesign extends
  past the home page into the live-call transcript view.
- **Label treatment:** fin.ai's own numbered section labels (01–22) are
  plain uppercase sans, not monospace — the redesigned home page follows
  that (drops the `font-mono` eyebrow label EstateAI currently uses on the
  hero) even though `--font-mono` stays defined for the app's data surfaces
  elsewhere.

## Exports
`tokens.css` (in this project) is the source of truth. Ask "extend
design.md with Tailwind exports" for additional formats.
