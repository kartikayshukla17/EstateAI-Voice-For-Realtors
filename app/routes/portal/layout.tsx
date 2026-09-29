import { Outlet } from "react-router";
import { requireUser } from "~/lib/auth/require-user.server";
import { PortalNav } from "~/components/chrome/portal-nav";
import { SiteFooter } from "~/components/chrome/site-footer";
import { AmbientBackdrop } from "~/components/chrome/ambient-backdrop";
import type { Route } from "./+types/layout";

// The one shared auth check for everything nested under /demo, /dashboard,
// /calls/:id — every protected loader relies on this running first, rather
// than each route re-implementing its own check (see require-user.server.ts).
export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  return { user };
}

export default function PortalLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <AmbientBackdrop />
      <PortalNav user={loaderData.user} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
