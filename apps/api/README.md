# apps/api

TypeScript Lambda handlers, bundled with esbuild into a single file per handler (`dist/`, gitignored — AWS gets the built output, not the source).

- `src/handlers/products.ts` — `GET /products`, returns mock JSON. Deployed by hand to a Lambda with a Function URL at Track A level **A4**; rebuilt as Terraform-managed infrastructure at level **A5**.

```bash
npm run build -w apps/api   # bundles to apps/api/dist/products.js
```
