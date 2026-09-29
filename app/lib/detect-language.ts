import type { LeadLanguage } from "~/types/lead";

// Devanagari unicode block (U+0900–U+097F) — the script Hindi is written in.
// Presence alone means Hindi content; mixed with Latin letters means Hinglish
// (code-switching); no Devanagari at all means English. A simple heuristic,
// good enough for a UI display label — not meant to be linguistically exact.
const DEVANAGARI = /[ऀ-ॿ]/;
const LATIN_LETTER = /[a-zA-Z]/;

export function detectLanguage(text: string): LeadLanguage {
  const hasDevanagari = DEVANAGARI.test(text);
  const hasLatin = LATIN_LETTER.test(text);
  if (hasDevanagari && hasLatin) return "hinglish";
  if (hasDevanagari) return "hindi";
  return "english";
}
