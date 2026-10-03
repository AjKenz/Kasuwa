# Kasuwa: The One Project That Covers Cloud, AI APIs and i18n

_Source doc, Oct 3 2026 · @KenNY — saved here so it travels with the repo._

## Overview

Build one product, Kasuwa, and practise every skill in the job post on a single deployed
system instead of thirty throwaway demos.

Kasuwa (Hausa for "market") is a multilingual AI storefront. A seller photographs a product
and gets a finished listing in English, French and Arabic plus a generated lifestyle image.
Buyers browse in their own language and currency and can ask a shopping assistant questions.

| Job objective | Where it lives in Kasuwa |
|---|---|
| Cloud: IaC, serverless, logging, monitoring, CI/CD on Vercel, AWS, GCP | Web app on Vercel. API and job queue on AWS Lambda and SQS, defined in Terraform. Image worker on GCP Cloud Run. GitHub Actions deploys all three. Logs, alarms and dashboards on top. |
| Third-party AI APIs: LLM, function calling, multimodal | Photo to listing (vision), a shopping assistant that calls tools, generated product images. |
| Internationalisation | English, French and Arabic (right-to-left), locale routes, NGN, USD and EUR formatting, translated listings stored per locale. |

### Ground rules

- Free first. Vercel Hobby, AWS and GCP free tiers, a free Postgres (Neon or Supabase), and
  Gemini's free tier for AI. Swap to OpenAI with about $5 of credit at level B4. Free-tier
  terms change, so check each pricing page before you start.
- Set billing alerts on AWS and GCP on day one, and run `terraform destroy` on anything you
  are not demoing.
- One level at a time, and every level ends with something deployed.
- Add a skill to your CV only after its level is done, so you can explain it in an interview.
- Realistic pace: about 3 months at 8 to 10 hours a week.

## The product

Kasuwa has three users and ten features. The seller lists products, the buyer browses and
chats, and you, as operator, watch cost and errors.

| # | Feature | What the user sees | What runs behind it | Track |
|---|---|---|---|---|
| 1 | Sign in | Email magic link or Google login | Auth on Lambda, users in Postgres | A |
| 2 | Photo upload | Upload form with progress bar | Lambda issues a presigned S3 URL | A |
| 3 | AI listing draft | Editable draft: title, description, category, attributes | Lambda sends the photo to a vision model and validates the JSON reply | B |
| 4 | Auto-translation | Language tabs (EN, FR, AR) in the editor | A translations table, one row per locale | B, C |
| 5 | Generated lifestyle image | "Generating..." then the image appears | SQS job, GCP Cloud Run worker, result saved to S3 | A, B |
| 6 | Localised storefront | /en, /fr, /ar routes, right-to-left Arabic, local currency | Product API that takes a locale | C |
| 7 | Search | Search box with results | Postgres full-text search, pgvector later | B |
| 8 | Shopping assistant | Streaming chat panel | Tool calls: search_products, get_product, convert_price, check_stock | B |
| 9 | Operator dashboard | Cost per request, errors, queue depth | CloudWatch and Grafana Cloud | A |
| 10 | Mobile buyer app (stretch) | Expo app | Same API and the same message files | C |

### The MVP is done when all four of these are true

- A seller on a phone goes from photo to published three-language listing in under two minutes.
- A French buyer sees EUR, a Nigerian buyer sees NGN, and an Arabic buyer gets a right-to-left page.
- Asked "do you have a blue bag under 20,000 naira?", the assistant calls `search_products`
  instead of guessing.
- With the image worker switched off, listings still publish and an alert fires.

## Architecture

Vercel serves the app, AWS runs the API and queue, GCP makes the images.

```
Buyers and sellers (web browser)
        |
        v
  Vercel: Next.js app (pages + chat, i18n routes)
        |            \
        v              v
  AWS: API Lambda   AWS: SQS queue (+ dead-letter queue)
  (auth, listings,         |
   products)                v
        |             AWS: Dispatcher Lambda (forwards each job to GCP)
        v                   |  \
  AWS: S3 buckets            |   presigned upload URL
  (photos, generated         v
   images)              GCP: Cloud Run image worker (calls image API)
        |                    |
        +--------> AI provider APIs (Gemini and OpenAI: text, vision, images) <--------+
```

The web app calls the API Lambda for data and the AI APIs for chat. The API enqueues image
jobs, and a dispatcher hands each one to the GCP worker with a presigned upload URL. All
services share one Postgres database (Neon or Supabase). GitHub Actions deploys all three
clouds without stored keys, and Sentry, CloudWatch and Grafana watch them.

### Stack

| Layer | Choice | Cost |
|---|---|---|
| Web | Next.js (App Router, TypeScript), next-intl, Vercel AI SDK | Free on Vercel Hobby |
| API | TypeScript on AWS Lambda, bundled with esbuild | Free-tier eligible |
| Infrastructure as code | OpenTofu or Terraform | Free |
| Database | Postgres with pgvector (Neon or Supabase) | Free tier |
| Queue and storage | SQS with a dead-letter queue, S3 | Free-tier eligible |
| Image worker | Node container on GCP Cloud Run | Free-tier eligible |
| AI | Gemini or Groq free tiers, OpenAI with about 5 USD credit | Free, plus a small credit |
| CI/CD | GitHub Actions with OIDC | Free on public repos |
| Observability | pino logs, CloudWatch, Sentry, Grafana Cloud, an uptime check | Free tiers |

### Data model

- `users`
- `products`: id, seller, price_minor, currency, source_locale, status
- `product_translations`: product id, locale, title, description, status (`machine` or `reviewed`)
- `product_embeddings`: product id, vector
- `media`: product id, kind, S3 key, status
- `ai_usage`: request id, provider, model, tokens, estimated cost
- `agent_audit`: every seller-agent tool call with its arguments and result

### Repo layout

```
kasuwa/
  apps/
    web/      Next.js app, messages/, Playwright tests
    api/      Lambda handlers, ai/ client, database migrations
    worker/   Cloud Run image worker (Dockerfile)
  evals/      prompt test cases and runner
  infra/
    aws/      Terraform for Lambda, SQS, S3, alarms
    gcp/      Terraform for Cloud Run
  docs/       i18n.md, runbook, postmortem
  .github/workflows/  ci.yml, deploy-api.yml, deploy-worker.yml
```

## Build order

Within a phase, do the levels in the order **cloud, AI, i18n** — later AI and i18n levels
reuse earlier cloud work. Count a gate as met only when you can demo it on the deployed app.

4 phases, ~13 weeks total at 8–10 hours/week, each phase ends at a gate:

| Phase | Weeks | Cloud | AI | i18n | Gate |
|---|---|---|---|---|---|
| Foundation | 1–3 | A1–A4 | B1 | C1–C3 | **Gate 1**: Storefront on Vercel reads products from Lambda; model replies |
| Core product | 4–7 | A5–A6 | B2–B5 | C4–C5 | **Gate 2**: Photo to listing works; Terraform and keyless deploys run |
| Async and depth | 8–10 | A7–A8 | B6–B7 | C6–C7 | **Gate 3**: Images made on Cloud Run; Arabic mirrors; translations in the DB |
| Production | 11–13 | A9–A10 | B8–B10 | C8–C10 | **Gate 4**: Alarms fire; CI evals and 3-locale tests pass; game day done |

---

## Track A: Cloud, IaC, serverless, CI/CD, monitoring

Use a monorepo: `apps/web`, `apps/api`, `apps/worker`, `infra/`.

### A1. Ship the web app on Vercel
1. Create a Next.js (App Router, TypeScript) repo named `kasuwa` on GitHub.
2. Import it into Vercel on the Hobby plan and set the root directory to `apps/web`.
3. Add one environment variable, `NEXT_PUBLIC_APP_ENV`, and display it on a page.
4. Open a pull request and confirm Vercel posts a preview URL.

**Done when:** the production URL is live and every PR gets its own preview.

### A2. Add a CI gate
1. Create `.github/workflows/ci.yml` that runs install, lint, typecheck, test and build on
   every PR. It is free on public repos.
2. Add one Vitest test, for example a price formatter.
3. Turn on branch protection for `main` and require the CI check.

**Done when:** a failing test blocks the merge.

### A3. Vercel serverless and cron
1. Add `/api/health` that returns the app version and the time.
2. Add a Vercel cron entry that calls `/api/cron/cleanup` once a day. Hobby limits cron
   frequency, so check the current limit.
3. Open the function logs in the Vercel dashboard and find your own request.
4. Write two lines in the README on the Node runtime versus the Edge runtime.

**Done when:** you can point to a request in the logs.

### A4. First Lambda by hand
1. Create an AWS account, enable MFA on the root user, and create a separate admin user for
   daily work. Set a 5 USD budget alert under Billing.
2. In `apps/api`, write a TypeScript handler for `GET /products` that returns mock JSON.
   Bundle it with esbuild.
3. Create the Lambda in the console with a function URL and call it from Next.js server code.
4. Find its log group in CloudWatch.

**Done when:** the Vercel app renders products served by Lambda.

### A5. Infrastructure as code
1. Install OpenTofu or Terraform (both free). Create `infra/aws` with the AWS provider.
2. Rebuild A4 in code: the Lambda, its IAM role, the function URL, and a log group with
   14-day retention.
3. Add a private S3 bucket for photo uploads with CORS for your domain, and store the
   database URL in SSM Parameter Store (standard parameters are free).
4. Run `plan` and `apply`, change the memory size, apply again, then `destroy` and apply
   from scratch.

**Done when:** the whole AWS stack rebuilds from one command.

### A6. Deploy from CI with no stored keys
1. In AWS, add GitHub as an OIDC identity provider and create a deploy role limited to your
   repo and the `main` branch.
2. Add `deploy-api.yml`: on merge to `main`, build the Lambda and apply the infrastructure.
3. Create `staging` and `production` environments in GitHub and require manual approval for
   production. Use a separate variable file for each.
4. Ship a trivial change and watch it go staging, approval, production.

**Done when:** no AWS access keys exist in GitHub secrets.

### A7. Queue and the GCP media worker
1. Add an SQS queue and a dead-letter queue in Terraform. When a listing is created, the API
   enqueues an `image.generate` job.
2. Write `apps/worker` (Node plus a Dockerfile) that takes a job, calls the image API
   (a stub for now), and uploads the result.
3. Add a small dispatcher Lambda triggered by SQS. It posts the job to the worker and
   includes a presigned S3 upload URL, so GCP never holds AWS keys.
4. Create a GCP project, set a budget alert, enable Cloud Run and Artifact Registry, and
   deploy the worker with `gcloud run deploy` or the Terraform `google` provider.
5. Authenticate GitHub Actions to GCP with Workload Identity Federation, which is also keyless.

**Done when:** a new listing triggers the job, the Cloud Run worker handles it, the image
lands in S3, and a poison job ends up in the dead-letter queue.

### A8. Logs and error tracking
1. Switch every service to structured JSON logs with pino and pass a `requestId` from Vercel
   to Lambda to the queue to the worker.
2. Add Sentry's free tier to the web app and the API, with source maps.
3. Write three CloudWatch Logs Insights queries: errors by route, p95 duration, and the
   slowest requests.
4. Create a metric filter that turns error-level logs into a metric.

**Done when:** you can follow one listing across all three clouds using its `requestId`.

### A9. Monitoring and alerts
1. In Terraform, add CloudWatch alarms for Lambda errors, p95 duration and dead-letter queue
   depth. Send them to an SNS email topic.
2. Build a Grafana Cloud dashboard (free tier) with request rate, error rate, queue depth and
   AI cost per day.
3. Add a free uptime check on `/api/health` with UptimeRobot or Better Stack.
4. Break something on purpose, such as a bad environment variable, and confirm an email
   arrives within minutes.

**Done when:** you learn about a failure from an alert rather than by luck.

### A10. Production readiness
1. Turn the Terraform into one module used by dev, staging and prod through variable files.
2. Keep the last five Lambda versions behind an alias and write down a one-command rollback.
   Use Vercel's instant rollback for the web app.
3. Add cost guardrails: AWS and GCP budgets, a Lambda concurrency cap, Cloud Run max
   instances, and a per-user rate limit.
4. Run a game day: switch off the worker, watch the alert fire, restore it, and write a
   one-page runbook and postmortem in `docs/`.

**Done when:** the README holds an architecture diagram, the runbook and the postmortem.

---

## Track B: LLM and generative media APIs

Use a free key (Google AI Studio or Groq) for most levels and add about 5 USD of OpenAI
credit at B4.

### B1. First model call
1. Get a free API key and store it as a server-side environment variable, never in the browser.
2. In `apps/api/src/ai/client.ts`, write `complete(prompt)` using plain `fetch`.
3. Add a timeout with `AbortController` and retry with backoff on HTTP 429.
4. Log the tokens used on every call. The A9 dashboard will read this later.

**Done when:** an `/ai/ping` endpoint on Lambda returns a model reply and logs usage.

### B2. Structured output for listings
1. Define a zod schema `ListingDraft` with title, description, category, attributes and
   suggested price in NGN.
2. Write a system prompt and ask for JSON only, or use the provider's JSON or
   response-schema mode.
3. Validate the reply with zod. On failure, retry once and include the validation error in
   the prompt.
4. Test it with 10 product descriptions you type by hand.

**Done when:** at least 9 of 10 inputs produce a valid `ListingDraft`.

### B3. Streaming chat
1. Install the Vercel AI SDK (open source) in `apps/web`.
2. Build a `/api/chat` route handler and a chat panel using `useChat`.
3. Give the assistant a system prompt: Kasuwa's shopping assistant, replies in the buyer's
   language.
4. Handle stop and error states in the UI.

**Done when:** tokens appear live on the storefront.

### B4. Function calling
1. Define four tools with zod schemas: `search_products(query, maxPriceNGN)`,
   `get_product(id)`, `convert_price(amount, from, to)` and `check_stock(id)`.
2. Build the loop: the model returns a tool call, you run it against your database, you send
   the result back, the model answers. Cap it at 5 iterations.
3. Add OpenAI with your small credit and port the same loop. Write a short table of the
   differences in tool schema shape, message roles and streamed tool calls.
4. Ask "do you have a blue bag under 20,000 naira?" and confirm the right tool is called with
   the right arguments. Make the assistant decline questions outside the catalogue.

**Done when:** the assistant answers from real data on two providers.

### B5. Multimodal: photo to listing
1. After the S3 upload in feature 2, send the image (base64 or a signed URL) to a vision
   model with the B2 schema.
2. Prefill the listing editor with the draft and let the seller confirm or edit every field.
3. Test on 15 messy real photos: dark, cluttered, several items. Record the failures.
4. Add guardrails: a file size limit, and an `isProduct` flag so non-product photos are rejected.

**Done when:** a photo becomes an editable draft in about 15 seconds or less.

### B6. Generated media
1. Pick an image provider. Try a free option first (Gemini image generation or a Hugging
   Face free tier) and fall back to OpenAI images with credit. Check current limits and prices.
2. In `apps/worker`, build a prompt from the listing's category, attributes and a style line,
   call the image API, and upload the result with the presigned URL from A7.
3. Show a placeholder in the web app and poll `/listings/:id/media` every 3 seconds until the
   image is ready.
4. Keep the seller's original photo as the fallback, and label generated images
   "AI-generated" in the UI.

**Done when:** a listing gains its generated image after about 30 seconds without blocking
publishing.

### B7. Embeddings and retrieval
1. Enable pgvector on your free Neon or Supabase database.
2. Create an embedding for each product (title plus description) and store it in a
   `product_embeddings` table.
3. Add a `semantic_search` tool to the assistant and blend it with Postgres full-text search.
4. Make the assistant answer with product links.

**Done when:** "something for a rainy commute" returns sensible products.

### B8. Reliability, cost and security
1. Put an `AiProvider` interface in front of Gemini and OpenAI, and fall back to the second
   on a 5xx or timeout.
2. Use 20-second timeouts, exponential backoff with jitter, and a simple circuit breaker.
3. Cache identical requests for 24 hours, keyed on a hash of prompt and model.
4. Record tokens and estimated cost per request in a table the A9 dashboard reads, and set a
   per-user daily token budget.
5. Treat product text and chat input as untrusted (prompt injection). Keep tools read-only
   except publishing, which needs user confirmation.

**Done when:** you disable the primary key, the app falls back, and the dashboard shows it.

### B9. Evals and tracing
1. Create `evals/` with 25 cases: 10 listing drafts, 10 assistant questions with the expected
   tool call, and 5 prompt-injection attempts.
2. Write a runner that scores each case pass or fail: schema valid, correct tool, no system
   prompt leaked.
3. Run it in GitHub Actions on pull requests that touch prompts, using a small model to stay
   inside free limits.
4. Add Langfuse (open source, free tier) to trace prompts, latency and cost.

**Done when:** a prompt change that breaks a case fails the PR.

### B10. Seller agent with approval
1. Add a seller-side agent for "restock and reprice" with tools `list_my_products`,
   `update_price`, `update_stock` and `draft_promo_email`.
2. Make every write tool return a proposed change. Nothing runs until the seller approves it
   in the UI.
3. Record each tool call, its arguments and its result in an audit table.
4. Cap each run by steps and by cost, and deploy it serverless.

**Done when:** the agent proposes changes, nothing changes without approval, and the audit
trail is complete.

---

## Track C: Internationalisation (i18n)

Everything here is free: `Intl` is built into the browser, and next-intl, Tolgee and
Playwright are open source.

### C1. Locale concepts with Intl
1. Read the MDN pages for `Intl.NumberFormat`, `DateTimeFormat`, `PluralRules` and
   `RelativeTimeFormat`.
2. In a scratch file, format one price, one date and one relative time in `en-NG`, `fr-FR`
   and `ar-EG`. Note how the Arabic output differs.
3. Write a short cheat sheet in `docs/i18n.md`: language versus locale versus region, and why
   `ar-EG` and `ar-SA` are not the same.

**Done when:** a test file proves the expected output for three locales.

### C2. Message files
1. Add next-intl to `apps/web` (App Router).
2. Create `messages/en.json` and `messages/fr.json`.
3. Move every UI string out of the components and read it with `useTranslations`.

**Done when:** no visible text is hard-coded and French renders when you switch the setting.

### C3. Locale routing
1. Add a `[locale]` route segment so pages live at `/en` and `/fr`.
2. Add middleware that redirects `/` to the right locale.
3. Build a language switcher that remembers the choice in a cookie.
4. Load messages in server components and pre-render each locale with `generateStaticParams`.

**Done when:** `/fr/products` and `/en/products` both work and the choice persists.

### C4. Real-world formatting
1. Write messages with ICU syntax for plurals ("1 item", "3 items"), variables and select cases.
2. Format money with `Intl.NumberFormat` in NGN, USD and EUR, and show "listed 3 days ago"
   with relative time.
3. Store prices in the database as integer minor units plus a currency code, never as floats.
4. Reuse the B4 `convert_price` tool so the assistant and the storefront agree.

**Done when:** the same product shows the correct price and wording in each locale.

### C5. Quality workflow
1. Add an ESLint rule that flags hard-coded strings (for example `i18next/no-literal-string`).
2. Turn on typed message keys so a typo fails the typecheck.
3. Fall back to English when a key is missing and log a warning.
4. Add a CI script that fails when two locale files have different key sets.

**Done when:** deleting a French key fails the build.

### C6. Arabic and right-to-left
1. Add `ar.json` and set `lang` and `dir="rtl"` on `<html>` for Arabic.
2. Convert CSS to logical properties (`margin-inline-start`, `padding-inline`). In Tailwind
   use `ms-`, `me-`, `ps-` and `pe-`.
3. Mirror directional icons such as arrows and chevrons.
4. Wrap mixed text, such as an English brand name or a number inside Arabic, in `<bdi>`, and
   load an Arabic font with `next/font`.
5. Test with pseudo-localisation and very long French strings to catch overflow.

**Done when:** the Arabic storefront mirrors correctly with no clipped or overlapping elements.

### C7. Translatable content in the database
1. Keep products language-neutral: id, seller, price_minor, currency, source_locale.
2. Add `product_translations` with product id, locale, title, description, status (`machine`
   or `reviewed`) and updated time, unique on product id plus locale.
3. Make `GET /products?locale=fr` fall back from `fr` to `en` to the source locale.
4. Let the seller edit each locale's text in the listing editor.

**Done when:** a product with no Arabic translation still renders sensibly in Arabic.

### C8. Translation pipeline
1. At listing time, translate the draft into French and Arabic with your B2 structured-output
   call, using a glossary of terms never to translate, such as brand names.
2. Save results as `machine` and ask a native speaker to review them. Mark approved ones
   `reviewed`.
3. Manage UI strings in Tolgee (open source) or Crowdin (free for open-source projects).
4. Keep the C5 CI check so missing keys block a release.

**Done when:** a new listing gets French and Arabic text automatically, and reviewed text is
never overwritten by the machine.

### C9. SEO and performance
1. Add `hreflang` alternates and canonical URLs for every locale.
2. Localise `<title>` and meta tags with `generateMetadata`, and generate a sitemap per locale.
3. Load only the active locale's messages.
4. Include the locale in every cache key, including the B8 AI cache.
5. Run Lighthouse on each locale and fix regressions.

**Done when:** each locale scores the same as English on Lighthouse and search engines see
all three versions.

### C10. Full localisation
1. Detect the locale in this order: URL, saved cookie, `Accept-Language`. Let the user
   override it.
2. Treat currency as a separate preference from language, since a French speaker in Lagos may
   want NGN.
3. Store timestamps in UTC and show them in the user's timezone.
4. Localise transactional emails and the assistant's replies.
5. Write Playwright end-to-end tests for each locale that assert `dir="rtl"` for Arabic and
   the correct currency format.
6. Stretch: reuse the same message files in an Expo app with `expo-localization`.

**Done when:** the end-to-end suite passes for all three locales in CI.

---

## Cost and safety guardrails

Nothing in this project should cost money unless you choose it to, and no secret should ever
leave your control.

- **Budgets:** set a 5 USD alert on AWS and on GCP before creating any resource, and look at
  each billing page weekly. Read the current free-tier terms on both pricing pages first,
  because they change.
- **Teardown:** run `tofu destroy` on dev when you stop for the day and keep only what you
  are demoing.
- **Secrets:** never commit keys. Use Vercel environment variables and AWS SSM Parameter
  Store, and turn on GitHub secret scanning (free on public repos).
- **AI spend:** default to a small model, enforce the B8 per-user token budget, and cap agent
  steps.
- **Vercel Hobby** is for personal, non-commercial use. If Kasuwa turns into a paid product,
  move to a paid plan.
- **Data:** use fake products and fake buyers for demos, and only upload photos you own.
- **Honesty in the UI:** label generated images "AI-generated" and machine translations until
  a person has reviewed them.

## Definition of done and what you can claim

Kasuwa is done when the four MVP checks pass, each track has reached level 10 (or the level
you chose to stop at), and the README shows a live link, an architecture diagram and the
runbook.

CV bullets to add, each only once its levels are finished:

- Built and deployed Kasuwa, a multilingual AI storefront: Next.js on Vercel, a serverless API
  on AWS Lambda and SQS defined in Terraform, and an image worker on GCP Cloud Run, all
  deployed through GitHub Actions with OIDC and no stored keys. _(needs A7)_
- Integrated LLM and multimodal APIs for photo-to-listing, a function-calling shopping
  assistant and generated product images, with provider fallback, caching, CI evals and
  per-request cost tracking. _(needs B8 and B9)_
- Shipped English, French and Arabic (RTL) localisation with ICU messages, locale routing,
  per-locale content in Postgres, hreflang SEO and Playwright tests for every locale.
  _(needs C10)_

Interview talking points you will now have real answers for:
- Why GitHub OIDC beats long-lived cloud keys.
- Why a queue sits between Lambda and Cloud Run: retries, a dead-letter queue and decoupling.
- How you handled prompt injection and runaway AI cost.
- Why prices are stored as integer minor units, and why currency is a separate setting from
  language.
