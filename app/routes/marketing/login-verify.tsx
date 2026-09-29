import { Link } from "react-router";
import { Card } from "~/components/ui/card";
import type { Route } from "./+types/login-verify";

export async function loader({ request }: Route.LoaderArgs) {
  const token = new URL(request.url).searchParams.get("token");
  // TODO(next increment): verifyMagicLinkToken(token) against a real
  // verification_tokens row (hash-compare, check expires_at/used_at), then
  // mint a signed session cookie via session.server.ts and redirect to /demo.
  return { verified: Boolean(token) };
}

export default function LoginVerify({ loaderData }: Route.ComponentProps) {
  return (
    <main className="wrap flex justify-center py-20">
      <Card className="w-full max-w-sm p-6 text-center">
        {loaderData.verified ? (
          <>
            <h1 className="text-lg font-semibold">You're in</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
              Head over to the demo to start a call.
            </p>
            <Link to="/demo" className="btn btn--sm mt-4 inline-flex">
              Go to the demo
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold">Link missing or expired</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
              Request a new sign-in link.
            </p>
            <Link to="/login" className="btn btn--sm mt-4 inline-flex">
              Back to sign in
            </Link>
          </>
        )}
      </Card>
    </main>
  );
}
