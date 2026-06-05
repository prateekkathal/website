"use client";

import { useId, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { sendContactMessage } from "@/lib/actions";
import type { ContactState } from "@/lib/schema";

const initialState: ContactState = { ok: false };
const emptyValues = { name: "", email: "", message: "" };

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs text-muted">
        <span className="text-prompt">$</span> {label}
      </label>
      {children(id)}
      {error && (
        <p className="mt-1.5 text-xs text-[#ff7a7a]" role="alert">
          ! {error}
        </p>
      )}
    </div>
  );
}

const fieldClass =
  "w-full rounded-md border border-border bg-surface-2/80 px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent/30";

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState);
  const [pending, setPending] = useState(false);
  // Controlled values so the inputs survive a failed submit (React resets the
  // form after an action); we clear them ourselves only on success.
  const [values, setValues] = useState(emptyValues);
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const update =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await sendContactMessage(state, formData);
    setState(result);
    if (result.ok) {
      setValues(emptyValues);
    }
    // A validation failure keeps the (still-valid) token; a captcha/send
    // failure consumed it, so refresh the widget.
    if (result.ok || (result.message && !result.errors)) {
      turnstileRef.current?.reset();
      setToken("");
    }
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-5" noValidate>
      <Field label="name" error={state.errors?.name}>
        {(id) => (
          <input
            id={id}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="ada lovelace"
            className={fieldClass}
            value={values.name}
            onChange={update("name")}
            required
          />
        )}
      </Field>

      <Field label="email" error={state.errors?.email}>
        {(id) => (
          <input
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ada@example.com"
            className={fieldClass}
            value={values.email}
            onChange={update("email")}
            required
          />
        )}
      </Field>

      <Field label="message" error={state.errors?.message}>
        {(id) => (
          <textarea
            id={id}
            name="message"
            rows={5}
            placeholder="what's on your mind?"
            className={`${fieldClass} resize-y`}
            value={values.message}
            onChange={update("message")}
            required
          />
        )}
      </Field>

      {siteKey ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
          options={{ theme: "dark" }}
        />
      ) : (
        <p className="text-xs text-[#ff7a7a]">
          ! captcha not configured (set NEXT_PUBLIC_TURNSTILE_SITE_KEY)
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending || !token}
          className="rounded-md border border-accent/50 bg-accent/10 px-5 py-2 text-sm text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "sending…" : "› send"}
        </button>

        {state.message && (
          <p
            role="status"
            className={`text-sm ${state.ok ? "text-prompt" : "text-[#ff7a7a]"}`}
          >
            {state.ok ? "✓ " : ""}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
