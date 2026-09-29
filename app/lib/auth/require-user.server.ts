export interface SessionUser {
  id: string;
  email: string;
}

const MOCK_USER: SessionUser = { id: "user-mock", email: "you@example.com" };

/**
 * TODO(next increment): verify the signed session cookie (see session.server.ts),
 * look up the user row, and redirect to /login on failure. This is the ONE place
 * every protected loader calls — do not re-implement this check per-route (see
 * the offclock lesson: that app duplicated this exact check in every API route
 * with no shared helper).
 */
export async function requireUser(_request: Request): Promise<SessionUser> {
  return MOCK_USER;
}
