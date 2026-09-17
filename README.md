# Corefinity

Marketing site for Corefinity. Next.js App Router, TypeScript, Tailwind v4,
statically prerendered and deployed on Vercel.

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Unit tests |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run analyze` | Build with the bundle treemap |
| `npm run lighthouse` | Lighthouse CI against the built site |

## Environment

Copy `.env.example` to `.env.local` and fill it in. Everything is optional for
local development, but note what each one turns off when missing:

| Variable | Without it |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonicals fall back to the production domain, which is wrong on preview deploys |
| `RESEND_API_KEY`, `BRIEF_FROM_EMAIL` | The brief form returns 503 rather than silently dropping a lead |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | The Google verification tag is omitted |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | The Bing verification tag is omitted |
| `INDEXNOW_KEY` | `/api/indexnow` and `/indexnow-key.txt` return 404 |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No analytics script, ever |

## How it is put together

```
src/
  app/          routes, metadata, sitemap, robots, generated OG image and icons
  components/   UI, all server components unless they need state
  lib/          site config, consent, schema, FAQ content
brand/          full resolution logo masters, never deployed
public/         only what is actually served
```

`src/lib/site.ts` is the single source of truth. Metadata, sitemap, structured
data and `public/llms.txt` all read from it, so they cannot drift apart. The
FAQ content lives in `src/lib/faqs.ts` for the same reason: the page and the
`FAQPage` schema render from one array.

### Things worth knowing before changing them

- **Only four components are client components.** Navbar, HeroBanner, Faq,
  QuoteForm and Select. Keep it that way unless state genuinely requires it.
- **`Fillet` only works over white.** The concave corners are a radial gradient
  hardcoded to `#fff`. Put a notched card on a coloured surface and the cutout
  shows as a white wedge.
- **Nav link order is load bearing.** The scroll spy pill walks the `links`
  array in `Navbar.tsx`. If it stops matching document order, the pill jumps
  backwards as the page scrolls.
- **Faded text has a floor.** Anything below `text-ink/60` on white or mist
  fails WCAG AA, and below `text-white/45` on ink. The tones in use were
  raised to clear it; dropping one back reintroduces a Lighthouse failure.
- **Consent gates analytics for real.** `Analytics.tsx` renders no script tag
  until the visitor opts in. The cookie policy makes that promise in writing,
  so anything that sets a cookie needs that page updated too.
- **Structured data claims nothing that cannot be verified.** No ratings, no
  headcount, no social profiles that do not exist. There are tests asserting
  this, in `src/lib/schema.test.ts`.

### Regenerating brand assets

Masters are in `brand/`, outside `public/` so they are versioned but never
deployed. See `brand/README.md` for how the shipped logos and icons are derived.

## Search and AI discovery

- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- `public/llms.txt` describes the business for language models, and explicitly
  tells them not to invent figures the site does not publish.
- `/api/indexnow` pings Bing and Yandex after a deploy. Bing matters beyond its
  own search share because its index is what ChatGPT browsing and Copilot
  retrieve from.

```bash
curl -X POST https://corefinity.tech/api/indexnow \
  -H "content-type: application/json" \
  -d '{"secret":"<INDEXNOW_KEY>","urls":["/","/contact"]}'
```
