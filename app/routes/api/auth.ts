import { auth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/auth";

// Better Auth owns everything under this path (sign-in, magic-link send/verify,
// session endpoints) via its own fetch-compatible handler — this route is
// just a thin mount point, not where any auth logic lives.
export async function loader({ request }: Route.LoaderArgs) {
  return auth.handler(request);
}

export async function action({ request }: Route.ActionArgs) {
  return auth.handler(request);
}
