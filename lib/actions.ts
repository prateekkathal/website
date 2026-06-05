"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactState } from "./schema";
import { verifyTurnstile } from "./turnstile";
import { sendContactEmail } from "./email";

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Validate (server is the source of truth).
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: NonNullable<ContactState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "please fix the errors below.", errors };
  }

  // 2. Verify the Turnstile token.
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

  const human = await verifyTurnstile(token, ip);
  if (!human) {
    return {
      ok: false,
      message: "captcha check failed — please try again.",
    };
  }

  // 3. Send.
  const sent = await sendContactEmail(parsed.data);
  if (!sent) {
    return {
      ok: false,
      message: "couldn't send right now — please try again later.",
    };
  }

  return { ok: true, message: "message sent — i'll get back to you soon." };
}
