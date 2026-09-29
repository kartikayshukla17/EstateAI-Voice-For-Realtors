# Design — EstateAI (home page)

Locked design system for the home page redesign, studied from fin.ai.
Future Hallmark runs on this page read this file first. Scope note: this
covers the **marketing home page** specifically — the app's data-dense
surfaces (dashboard, call detail, scorecard) are out of scope and keep
their existing IBM Plex system unless amended here later.

**Correction record:** an earlier version of this file was built on a
wrong reading — a computed-style paste that turned out to be from some
other DOM node (white background, system-sans), not the actual visible
page. The user caught this with real screenshots of the live site. This
version is rebuilt from those screenshots (image-mode reading), which is
ground truth for what's actually rendered — the earlier "confirmed via
DevTools" claim was wrong precisely because the wrong element was
inspected. Confirmed-from-devtools is not automatically more reliable
than a screenshot if it's the wrong node.

## System
- Genre · **atmospheric** (dark canvas, warm radial blooms, serif display)
  — corrected from the earlier "modern-minimal" call, which was built on
  the wrong background reading.
- Closest catalog cousin · **Lumen** — the one atmospheric theme with a
  serif display + mono technical eyebrow (Modal / Anthropic / Together /
  ElevenLabs register). fin.ai's real hero (dark ground, warm amber/coral
  blooms, roman serif headline, tracked uppercase labels) matches this
  register closely. Still building as studied-DNA, not the catalog theme
  directly — this is a reference point, not the source of tokens.
- Macrostructure · centred atmospheric hero (headline + subhead + dual CTA,
  a small stat-badge row beneath) — the canvas itself is part of the
  design, type sits on top of it. Below the fold: a simple feature section
  (kept from EstateAI's own content, not fin.ai's 22-section structure —
  theme drift, stated plainly, since EstateAI has 3 features not 22).
- Axes · dark paper / roman editorial serif / warm accent (amber + a
  secondary coral bloom)

## Provenance
- Source: `https://fin.ai/`, read 2026-09-29. Mixed mode: an initial URL
  fetch + a DevTools paste (both turned out to be misleading), corrected
  by 5 real screenshots the user provided of the live homepage and
  pricing page.
- Attestation: public reference for EstateAI's own brand, not fin.ai's own
  site — proceeding on that basis given conversation context.
- Confidence, per image-mode rules (name roles, not exact fonts, from a
  screenshot):
  - **High confidence, visually unambiguous:** dark near-black ground,
    warm amber/orange radial blooms behind the hero, roman (non-italic)
    serif display headline, uppercase tracked-out labels, pill-shaped
    buttons, an orange-filled badge pill ("Includes Operator") as the one
    clear accent-color sighting.
  - **Font role, not exact name** (image mode can't reliably ID a
    typeface): display is a roman editorial serif — candidates **Fraunces**
    or **Newsreader** (both Google Fonts, both fit the visual weight seen).
    Body/UI sans is a neutral grotesque — candidate **Inter**. Labels read
    as mono or heavily-tracked uppercase sans — going with **IBM Plex
    Mono**, which is also what EstateAI's existing system already uses
    elsewhere, so this isn't a new family, just a confirmed continuation.
  - **Rhythm:** now observable from the screenshots — generous vertical
    spacing, centred hero, sections alternate between plain-dark and
    bloom-lit rather than one flat background throughout the page.

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:       oklch(14% 0.015 260);   /* near-black, cool-neutral base */
  --color-paper-2:      oklch(19% 0.015 260);   /* elevated card surface */
  --color-paper-3:      oklch(22% 0.016 260);   /* further-elevated (pricing-card equivalent) */
  --color-ink:          oklch(96% 0.005 90);    /* nearly-white primary text */
  --color-ink-2:        oklch(70% 0.01 260);    /* muted secondary text */
  --color-accent:       oklch(72% 0.15 45);     /* warm amber/orange — the one accent seen (badge pill) */
  --color-bloom-a:      oklch(75% 0.14 55 / 0.35);  /* amber bloom, hero background */
  --color-bloom-b:      oklch(70% 0.12 20 / 0.22);  /* secondary coral/pink bloom — genre caps at one + one */
  --color-accent-ink:   oklch(14% 0.02 45);
  --color-focus:        oklch(78% 0.14 55);

  --font-display: "Fraunces", ui-serif, Georgia, serif;              /* role-matched candidate, not exact-confirmed */
  --font-body:    "Inter", ui-sans-serif, system-ui, sans-serif;     /* role-matched candidate */
  --font-mono:    "IBM Plex Mono", ui-monospace, monospace;          /* continuation of EstateAI's existing system */

  /* 4-pt spacing scale: --space-3xs … --space-4xl. */
  /* Type scale, 1.25 ratio: --text-xs … --text-display (display can hit 6rem per atmospheric genre allowance). */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;  --dur-base: 240ms;  --dur-slow: 320ms;

  --radius-card: 16px;
  --radius-pill: 999px;
}
```

## CTA voice
- Primary · filled accent, pill-radius, confident not pastel
- Secondary · outline/ghost pill, same radius — both buttons visible
  side-by-side in the real hero (dual CTA, not restraint-to-one — corrects
  the earlier design.md's guess that fin.ai favors a single CTA)

## Motion stance
- **Fade-in only. No slide, no bounce** — per atmospheric genre's own
  rule; corrects the earlier fade+slide-up call, which was modern-minimal
  voice, not atmospheric. The atmosphere does the work, not the motion.
- Reduced-motion fallback · fade already ≤150ms-compatible, no change needed.

## Notes
- **Genre-specific rules now in force:** atmospheric explicitly bans
  hairline-on-dark card borders (use elevated `paper-2`/`paper-3` surfaces
  instead), bans glassmorphism, caps accent at one warm hue + one
  secondary, and keeps display text roman (no italics — global rule
  anyway). The previous version's white hairline-bordered cards violated
  the corrected genre's own conventions, not just the color reading.
- **Devanagari note still applies:** Fraunces has zero Devanagari coverage
  (same issue as drillback's original type system) — if this direction
  extends past the home page into any Hindi/English mixed content, the
  display face needs reconsidering there specifically; the home page's
  hero and card copy is English-only so it's not a problem on this page.
- **Anti-patterns to not carry over:** none confidently flagged from the
  screenshots — no bouncy hovers or obvious transition-all visible in
  static captures, but static images can't reveal script-level behavior
  either way.

## Exports
`tokens.css` (in this project) is the source of truth. Ask "extend
design.md with Tailwind exports" for additional formats.
