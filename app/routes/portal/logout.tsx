import { auth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  // asResponse: true so we get Better Auth's actual Set-Cookie (clearing)
  // header back, rather than just its parsed body — we need to forward that
  // header on to the browser for the session to actually end.
  const authResponse = await auth.api.signOut({ headers: request.headers, asResponse: true });
  const headers = new Headers(authResponse.headers);
  headers.set("Location", "/");
  return new Response(null, { status: 302, headers });
}
