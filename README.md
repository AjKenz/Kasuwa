# Kasuwa

A multilingual AI storefront, built as a learning project covering cloud infrastructure,
third-party AI APIs and internationalisation — one level at a time. The full build doc lives
at [`docs/kasuwa-levels.md`](./docs/kasuwa-levels.md).

## Status

**Frontend scaffold only.** `apps/web` is a complete, componentized Next.js UI running on
mock data — no real auth, database, cloud infrastructure, or AI calls yet. Those arrive level
by level per the doc above, starting at **Track A, level A1**.

## Monorepo layout

```
apps/
  web/      Next.js (App Router, TypeScript) + Tailwind — built out, see below
  api/      not built yet — arrives at Track A level A4
  worker/   not built yet — arrives at Track A level A7
infra/
  aws/      not built yet — arrives at Track A level A5
  gcp/      not built yet — arrives at Track A level A7
evals/      not built yet — arrives at Track B level B9
docs/       kasuwa-levels.md (the build doc), i18n.md and runbook arrive in later levels
```

## Running the web app

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## What's in `apps/web` right now

Six routes, all composed from small components under `src/components/`:

- `/` — storefront home (search + product grid)
- `/products/[id]` — product detail, with an EN/FR/AR translation preview and an
  "AI-generated vs. source photo" gallery toggle
- `/sign-in` — magic link / Google sign-in UI
- `/sell/dashboard` — seller's listing table
- `/sell/new` — photo upload → mock AI draft generation → listing editor with locale tabs
- `/admin` — operator dashboard (cost, error rate, queue depth)
- `/api/health` and `/api/cron/cleanup` — both GET endpoints. `/api/health` returns the
  app's version and the current time; `/api/cron/cleanup` is triggered once a day by a
  Vercel cron job (see `vercel.json`).

Both run on the Node runtime, not Edge. Edge's latency benefit comes from running close to
*the caller* — useful for a real person's browser request, but irrelevant for the cron job,
which is only ever called by Vercel's own scheduler, not a geographically distributed user.
Node also keeps the door open for both routes to use real Node APIs and database drivers
later (cleanup jobs tend to need database access, which Edge supports poorly).

Plus a floating shopping-assistant chat panel available on the storefront.

Everything here is mock data and local component state — see
[`docs/kasuwa-levels.md`](./docs/kasuwa-levels.md) for what each piece becomes as we work
through Tracks A (cloud), B (AI APIs) and C (i18n).
