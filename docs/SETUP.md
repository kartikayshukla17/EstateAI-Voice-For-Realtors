# EstateAI — Increment 2 setup

Everything below creates a free account or a generated secret. **Never paste real
key values into chat** — fill them into your local `.env` file only (already
git-ignored). Once `.env` is filled in, the code just reads from it.

## 1. ElevenLabs — Conversational AI agent

1. Sign up at [elevenlabs.io](https://elevenlabs.io) (free tier: 15 min/mo, 4
   concurrent calls).
2. Go to **Conversational AI / Agents** in the dashboard → **Create an agent**.
3. Paste the agent's brain from `../lead-assistant/docs/system-prompt.md`
   (the "You are Riya..." body) into the agent's **System Prompt** field.
4. Upload `../lead-assistant/docs/project-factsheet.md` as a **Knowledge Base**
   document, so the agent can answer from real (fictional) facts instead of
   guessing.
5. Set the voice to one of ElevenLabs' stock multilingual voices (check it
   supports Hindi — most of their newer multilingual voices do; no need to use
   Voice Design for this).
6. Under the agent's **Settings → Security**, grab:
   - **Agent ID**
   - An **API key** (Profile → API Keys, if you don't have one yet)
7. Enable the **Widget** embed option so it can run in-browser via WebRTC (no
   Twilio/PSTN needed for this project).

→ Save as `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID`.

## 2. Neon — Postgres database

1. Sign up at [neon.tech](https://neon.tech) (free tier).
2. Create a new project (any region close to you is fine for a demo).
3. On the project dashboard, copy the **connection string** — it looks like
   `postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require`.

→ Save as `DATABASE_URL`.

## 3. Google AI Studio — Gemini Flash-Lite

1. Go to [aistudio.google.com](https://aistudio.google.com) and sign in with
   any Google account.
2. **Get API key** → **Create API key** (no credit card needed for the free
   tier).
3. No further setup — the free tier (500 req/day on Flash-Lite) activates
   automatically.

→ Save as `GEMINI_API_KEY`.

## 4. Gmail — magic-link email sending (instead of Resend, since no domain yet)

1. On the Gmail account you want to send from, turn on **2-Step Verification**
   if it isn't already (Google Account → Security).
2. Go to **Google Account → Security → 2-Step Verification → App passwords**.
3. Create a new app password (name it something like "EstateAI").
4. Google shows the 16-character password once — copy it now.

→ Save as `GMAIL_USER` (the Gmail address) and `GMAIL_APP_PASSWORD` (the
16-character password, not your normal Gmail password).

**Note:** later, once you own a domain, swapping this for Resend is a small,
isolated change (just the `sendMagicLink` transport) — everything else about
the auth flow stays the same.

## 5. Better Auth secret (generated locally, no account needed)

Run this yourself and paste the output into `.env`:

```bash
openssl rand -base64 32
```

→ Save as `BETTER_AUTH_SECRET`.

## 6. Final `.env` (create this file in `estate-ai/`, it's already git-ignored)

```bash
# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=

# Neon Postgres
DATABASE_URL=

# Gemini (post-call scoring)
GEMINI_API_KEY=

# Gmail SMTP (magic-link transport, no domain needed)
GMAIL_USER=
GMAIL_APP_PASSWORD=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:5173
```

## What to do once it's filled in

Tell me it's ready — I don't need to see the actual values. I'll write the
Drizzle schema, the Better Auth config, the ElevenLabs widget wiring, and the
Gemini scoring call all against these env var names, then we run it locally
against your real accounts to verify end-to-end.
