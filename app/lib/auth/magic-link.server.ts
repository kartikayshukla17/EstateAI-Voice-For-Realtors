/**
 * TODO(next increment): insert a `verification_tokens` row (identifier=email,
 * a hashed token, ~15min expiry), send the link via Resend, and rate-limit by
 * email+IP so the public ElevenLabs demo can't be spammed into running up cost.
 */
export async function sendMagicLink(_email: string): Promise<{ ok: true }> {
  return { ok: true };
}

/**
 * TODO(next increment): hash-compare `token` against the stored row, check
 * `expires_at` and `used_at`, and only then treat it as valid.
 */
export async function verifyMagicLinkToken(
  token: string | null,
): Promise<{ valid: boolean; email: string | null }> {
  return { valid: Boolean(token), email: token ? "you@example.com" : null };
}
