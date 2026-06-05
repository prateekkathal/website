# prateekkathal.com

Personal portfolio for Prateek Kathal — a small, fast Next.js site with a
terminal aesthetic (dark, monospace, typewriter intro). Three pages: **Home**,
**About**, **Contact** (with a Cloudflare Turnstile–gated contact form that
delivers via Resend).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) — typewriter, page transitions, scroll reveals
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) — bot protection
- [Resend](https://resend.com) — transactional email
- [Zod](https://zod.dev) — shared client/server validation

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

`.env.local` ships with Cloudflare's **always-pass Turnstile test keys** so the
form works locally out of the box. Add a `RESEND_API_KEY` to actually send mail.

## Environment variables

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | Turnstile widget site key |
| `TURNSTILE_SECRET_KEY` | secret | Turnstile server-side verification |
| `RESEND_API_KEY` | secret | from resend.com/api-keys |
| `MAIL_FROM` | secret | verified sender; `onboarding@resend.dev` until a domain is verified |
| `MAIL_TO` | secret | where contact submissions are delivered |

## Contact flow

The form (`components/contact-form.tsx`) posts to a Server Action
(`lib/actions.ts`) which (1) validates with Zod, (2) verifies the Turnstile
token server-side (`lib/turnstile.ts`), then (3) sends the email via Resend
(`lib/email.ts`). Content/links live in `lib/site.ts`.

## Deploy (Vercel)

1. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the environment variables above (Production + Preview).
3. Deploy. No extra config needed — it runs on the free Hobby plan.

## Project layout

```
app/            routes (home, about, contact) + layout, globals, icon
components/     terminal-window, nav, footer, avatar, typewriter, contact-form, motion/
lib/            site (content), schema, turnstile, email, actions
public/         avatar.jpg, pk.png
```
