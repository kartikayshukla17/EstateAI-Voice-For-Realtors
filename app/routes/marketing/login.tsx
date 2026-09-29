import { Form, useActionData } from "react-router";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false as const, email, error: "Enter a valid email address." };
  }

  try {
    await auth.api.signInMagicLink({
      body: { email, callbackURL: "/login/verify" },
      headers: request.headers,
    });
    return { ok: true as const, email };
  } catch (error) {
    // Most likely cause right now: GMAIL_USER/GMAIL_APP_PASSWORD not set yet.
    const message = error instanceof Error ? error.message : "Something went wrong sending the link.";
    return { ok: false as const, email, error: message };
  }
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
                defaultValue={actionData?.email ?? ""}
                placeholder="you@example.com"
                className="rounded-md border px-3 py-2 text-sm"
                style={{ borderColor: "var(--color-line-strong)", background: "var(--color-bg-sunken)" }}
              />
              {actionData && !actionData.ok && (
                <p className="text-sm" style={{ color: "var(--color-handoff)" }}>
                  {actionData.error}
                </p>
              )}
              <Button type="submit">Send me a magic link</Button>
            </Form>
          </>
        )}
      </Card>
    </main>
  );
}
