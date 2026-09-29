import { redirect } from "react-router";
import { auth } from "~/lib/auth/auth.server";

export interface SessionUser {
  id: string;
  email: string;
}

/**
 * The ONE place every protected loader checks auth — see portal/layout.tsx,
 * which calls this once and lets nested routes rely on it. Do not
 * re-implement this check per-route (see the offclock lesson in memory: that
 * app duplicated an equivalent check in every API route with no shared
 * helper).
 */
export async function requireUser(request: Request): Promise<SessionUser> {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect("/login");
  }
  return { id: session.user.id, email: session.user.email };
}
