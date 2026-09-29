import { Form, useActionData } from "react-router";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  // TODO(next increment): insert a verification_tokens row (identifier=email,
  // a hashed token, ~15min expiry), send the link via Resend, and rate-limit
  // by email+IP so the public demo can't be spammed into running up cost.
  return { ok: true, email };
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="wrap flex justify-center py-20">
      <Card className="w-full max-w-sm p-6">
        {actionData?.ok ? (
          <>
            <h1 className="text-lg font-semibold">Check your email</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
              We've sent a sign-in link to <strong>{actionData.email}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold">Sign in to talk to the agent</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
              A quick email sign-in — this just keeps the public demo from
              being spammed, it's not a real account system.
            </p>
            <Form method="post" className="mt-4 flex flex-col gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="rounded-md border px-3 py-2 text-sm"
                style={{ borderColor: "var(--color-line-strong)", background: "var(--color-bg-sunken)" }}
              />
              <Button type="submit">Send me a magic link</Button>
            </Form>
          </>
        )}
      </Card>
    </main>
  );
}
