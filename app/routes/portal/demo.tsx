import { useNavigate } from "react-router";
import { requireUser } from "~/lib/auth/require-user.server";
import { getMockLead } from "~/lib/mock/leads";
import { LeadCard } from "~/components/lead/lead-card";
import { VoiceAgentWidget } from "~/components/call/voice-agent-widget";
import type { Route } from "./+types/demo";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  // TODO(next increment): getMockLead() -> a db.query.leads lookup scoped to
  // this session (or a freshly-created lead row for this visitor).
  const lead = getMockLead();
  return { user, lead };
}

export default function Demo({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main className="wrap grid gap-6 py-12 lg:grid-cols-[minmax(0,320px)_1fr]">
      <LeadCard lead={loaderData.lead} />
      <VoiceAgentWidget
        lead={loaderData.lead}
        onCallEnd={(callId) => navigate(`/calls/${callId}`)}
      />
    </main>
  );
}
