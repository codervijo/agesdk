# Server-only code dropped during the Astro port

The original `genai/` project was a TanStack Start app with a server entry and
a server-rendered route. Astro's static output model doesn't have a runtime
server by default, so these files were intentionally not ported:

## TODO: TanStack Start server entry — `genai/src/server.ts`

Implemented an h3-aware error normalizer that wrapped `@tanstack/react-start/server-entry`.
Astro static output handles SSR errors differently; nothing to port directly.
If we move to Astro SSR (`output: 'server'`), revisit and adapt the error
normalizer as middleware.

## TODO: TanStack Start route handler — `genai/src/routes/sitemap[.]xml.ts`

Defined `GET /sitemap.xml` returning a hand-rolled XML response. Replaced by
the existing `@astrojs/sitemap` integration registered in `astro.config.mjs`,
which auto-generates `/sitemap.xml` and `/sitemap-index.xml` at build time.
No further action needed — but if extra URLs are required, configure the
integration's `customPages` / `filter` options instead.

## TODO: Other server files (not ported)

- `genai/src/start.ts` — TanStack Start bootstrap.
- `genai/src/router.tsx` — client-router setup.
- `genai/src/routeTree.gen.ts` — generated route tree.
- `genai/src/lib/error-capture.ts`, `error-page.ts` — branded SSR error page.

If we later add server endpoints (`/api/*`), create them under `src/pages/api/`
with Astro endpoint syntax (`export const GET: APIRoute = ...`) and switch the
adapter accordingly.
