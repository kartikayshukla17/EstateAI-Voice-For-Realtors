/**
 * TODO(next increment): a real signed session cookie (e.g. via react-router's
 * createCookieSessionStorage), storing the user id only. Keep the app's own
 * `users` table separate from whatever issues this session (a "shadow row" join
 * pattern, keyed by an external id) — do not conflate the two, the way this
 * seam is separated from require-user.server.ts's user lookup.
 */

export async function createUserSession(_userId: string): Promise<Headers> {
  return new Headers();
}

export async function clearUserSession(): Promise<Headers> {
  return new Headers();
}
