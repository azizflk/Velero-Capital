# Velero Capital — velero.capital

Marketing site for Velero Capital, rebuilt as a static React app (previously WordPress + Elementor on Hostinger). The design follows an editorial, General Catalyst-style system: off-white paper, condensed uppercase headlines, hairline rules, sticky left sidebar on subpages, and a full-bleed wordmark footer.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS 4 · React Router 7

## Develop

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # builds, then prerenders every page to static HTML in dist/
npm run preview    # serve the production build locally
```

## Where things live

| What | Where |
|---|---|
| Page copy, nav, footer, team, partners, stats, FAQs | `src/data/site.ts` |
| Official Telegram handles / email domains for the verifier | `officialAccounts` in `src/data/site.ts` |
| Pages (one file per route) | `src/pages/` |
| Top nav headers and dropdowns | `nav` in `src/data/site.ts` |
| Search index (what the Search overlay can find) | `src/data/search.ts` |
| News & Content cards | `stories` in `src/pages/Stories.tsx` |
| Shared UI (nav, footer, hero, cards, ticker, forms) | `src/components/` |
| Logos, team photos | `public/` |
| Layout primitives (sidebar page, sections, columns, quote) | `src/components/Layout.tsx` |

Top-level sections are Portfolio, Capital, Company, Services and Our Team (News & Content is parked: the page file remains but is not linked or routed), plus a Search overlay (also Cmd/Ctrl+K). Capital has four category pages (`/late-stage/`, `/secondaries/`, `/real-estate/`, `/co-investments/`), all rendered by `src/pages/Investment.tsx` from `src/data/investments.ts`. Old WordPress slugs redirect: `/otc-investment/` to Secondaries, `/strategic-investments/` and `/tech-investments-part/` to Late-Stage, `/web3-services/` to Capital, `/about-us/` to Company.

## Forms

Contact and OTC forms post to `VITE_FORM_ENDPOINT` when set (Formspree, Web3Forms, or any JSON endpoint). When unset they open the visitor's email client addressed to `VITE_CONTACT_EMAIL`. Copy `.env.example` to `.env` and fill it in.

## Live prices

The homepage ticker pulls 24h prices from Kraken's public API in the browser. No key needed. If it fails, the strip simply doesn't render.

## Deploy

The build is static (`dist/`), so it works on any host.

- **Vercel:** connect the repo, build command `npm run build`, output `dist`. Every page is a prerendered file, so there is no catch-all rewrite: unknown addresses get `404.html` with a 404 status. `vercel.json` holds the trailing-slash rule, the www and legacy-URL redirects, and the rewrite that serves the client-only walkthrough from `app.html`.
- **Hostinger (current host):** upload the contents of `dist/` to `public_html`. The included `.htaccess` handles SPA routing on LiteSpeed/Apache.

## Search and AI visibility

The build prerenders each route (`scripts/prerender.mjs`, using `src/entry-server.tsx`), so crawlers that do not run JavaScript still get the full page. For each page it writes its own title, description, canonical URL, social tags and schema.org data, all set in the page component through `useTitle` (`src/lib/useTitle.ts`). The same step generates `sitemap.xml`, `llms.txt` and `llms-full.txt` from the route table and the data files, and fails the build if a page has a duplicate title or description, more or fewer than one `<h1>`, or an image without alt text.

- A new page needs a route in `src/App.tsx`, an entry in `routes` in `src/entry-server.tsx`, and a `useTitle` call.
- Site-wide Organization and WebSite data is in `index.html`; keep it in step with `src/data/site.ts`.
- `public/robots.txt` names the AI crawlers that are allowed. Details and the remaining owner-side steps: `docs/seo-geo-2026-11.md`.

## Notes

- Fonts are loaded from Google Fonts: Barlow Condensed (headlines), Schibsted Grotesk (body), Newsreader (pull quotes). Swap them in `index.html` and the `@theme` block of `src/index.css`.
- Brand colour is `#023CCF`, sampled from the logo. The logo lives at `public/images/logo-box.png`.
- Team portraits are shown in black and white via a CSS filter (`grayscale` in `src/pages/Team.tsx`); remove the class for colour.
- Nubar Dadash has no photo yet; the card shows initials until one is added to `public/team/` and referenced in `src/data/site.ts`.
