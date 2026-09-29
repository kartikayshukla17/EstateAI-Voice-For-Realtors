import nodemailer from "nodemailer";

// Gmail SMTP, not an HTTP transactional-email API — a deliberate choice made
// with the tradeoffs known (no domain owned yet; accepted risk of Google
// flagging serverless-origin SMTP traffic). If that becomes a real problem in
// production, the fix is swapping this one file for Resend (or the Gmail API
// over HTTPS) — nothing else about the auth flow needs to change.
//
// The env check is lazy (inside the function, not at module load) so this
// module can be safely imported by tooling — e.g. Better Auth's schema
// generator — without every secret needing to be set yet.
function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD are not set — see docs/SETUP.md.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendMagicLinkEmail(email: string, url: string): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your EstateAI sign-in link",
    text: `Sign in to EstateAI: ${url}\n\nThis link expires shortly and can only be used once.`,
    html: `<p>Sign in to EstateAI:</p><p><a href="${url}">${url}</a></p><p>This link expires shortly and can only be used once.</p>`,
  });
}
