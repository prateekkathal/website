const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

// Server-side validation of a Turnstile token. Fails closed (returns false) on
// any error. An idempotency key guards against a single-use token being
// wrongly rejected if a retry happens after a network hiccup.
export async function verifyTurnstile(
  token: string,
  ip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set — rejecting submission");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);
  body.set("idempotency_key", crypto.randomUUID());

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    const data = (await res.json()) as SiteVerifyResponse;
    if (!data.success) {
      console.warn("Turnstile verification failed", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error", err);
    return false;
  }
}
