import { Link } from "react-router";
import { Card } from "~/components/ui/card";
import { auth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/login-verify";

// Better Auth's own handler (mounted at /api/auth/*) is what actually
// processes the magic-link token and sets the session cookie — this route is
// just the callbackURL it redirects to afterward, so by the time we're here
// the session should already exist (or the link was bad/expired and it
// doesn't).
export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  return { verified: Boolean(session) };
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
