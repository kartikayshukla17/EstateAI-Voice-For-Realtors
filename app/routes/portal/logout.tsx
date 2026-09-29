import { redirect } from "react-router";
import { clearUserSession } from "~/lib/auth/session.server";
import type { Route } from "./+types/logout";

export async function action(_args: Route.ActionArgs) {
  // TODO(next increment): actually clear the signed session cookie.
  await clearUserSession();
  return redirect("/");
}
