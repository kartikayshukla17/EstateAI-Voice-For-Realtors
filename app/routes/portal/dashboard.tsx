import { requireUser } from "~/lib/auth/require-user.server";
import { listMockCallSessions } from "~/lib/mock/calls";
import { listMockLeads } from "~/lib/mock/leads";
import { CallList } from "~/components/dashboard/call-list";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  // TODO(next increment): query `calls` joined to `scorecards`/`leads`,
  // paginated. Open question, not blocking this increment: is this list
  // scoped per-visitor, or an owner-only admin view? Likely the latter, since
  // the magic-link here is cost control, not multi-tenant identity — resolve
  // when the auth-wiring increment lands.
  const calls = listMockCallSessions();
  const leadsById = Object.fromEntries(listMockLeads().map((lead) => [lead.id, lead]));
  return { user, calls, leadsById };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <main className="wrap py-12">
      <h1 className="mb-6 text-xl font-semibold">Call history</h1>
      <CallList calls={loaderData.calls} leadsById={loaderData.leadsById} />
    </main>
  );
}
