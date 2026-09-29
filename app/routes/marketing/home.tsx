import { Link } from "react-router";
import { Card } from "~/components/ui/card";

export function meta() {
  return [
    { title: "EstateAI — a bilingual voice agent for real-estate leads" },
    {
      name: "description",
      content:
        "A live demo AI voice agent that qualifies real-estate leads in Hindi and English, with real interruption handling.",
    },
  ];
}

export default function Home() {
  return (
    <main className="wrap py-16">
      <section className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-wide" style={{ color: "var(--color-text-faint)" }}>
          Fictional demo · built for a SquadStack.ai interview
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          An AI voice agent that qualifies real-estate leads —
          in Hindi and English, at the same time.
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--color-text-dim)" }}>
          Click through and have a real, live conversation with Vera. She
          code-switches naturally, handles interruptions, and knows exactly
          when to hand off to a human.
        </p>
        <div className="mt-8">
          <Link to="/login" className="btn">
            Talk to the agent
          </Link>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto mt-20 grid max-w-3xl gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <h2 className="font-semibold">Code-switching</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
            Hindi, English, or Hinglish — the agent mirrors whatever the
            caller speaks, mid-sentence if needed.
          </p>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Real qualification</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
            Budget, timeline, locality, loan interest — the same qualifying
            sequence a real sales team would run.
          </p>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Knows its limits</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
            No discounts, no loan-eligibility guesses, no fake availability —
            and a clean handoff to a human when it's out of scope.
          </p>
        </Card>
      </section>
    </main>
  );
}
