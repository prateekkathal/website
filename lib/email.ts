import { Resend } from "resend";
import type { ContactInput } from "./schema";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Sends the contact submission via Resend. Returns false (and logs) on any
// failure so the action can surface a friendly error.
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? "onboarding@resend.dev";
  const to = process.env.MAIL_TO ?? "contact@prateekkathal.com";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — email not sent");
    return false;
  }

  const { name, email, message } = input;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#090c12;color:#c9d3e3;padding:24px;border-radius:12px;max-width:560px;margin:0 auto">
          <p style="color:#43d17a;margin:0 0 16px">$ new message</p>
          <p style="margin:0 0 6px"><span style="color:#67748b">name:</span> <strong style="color:#eef3fb">${esc(name)}</strong></p>
          <p style="margin:0 0 16px"><span style="color:#67748b">email:</span> <a href="mailto:${esc(email)}" style="color:#009ff9">${esc(email)}</a></p>
          <pre style="white-space:pre-wrap;word-break:break-word;background:#0d121b;border:1px solid #1b2433;border-radius:8px;padding:16px;margin:0;color:#c9d3e3">${esc(message)}</pre>
        </div>`,
    });

    if (error) {
      console.error("Resend error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email send error", err);
    return false;
  }
}
