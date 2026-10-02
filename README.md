# Velero Capital — velero.capital

Marketing site for Velero Capital, rebuilt as a static React app (previously WordPress + Elementor on Hostinger). The design follows an editorial, General Catalyst-style system: off-white paper, condensed uppercase headlines, hairline rules, sticky left sidebar on subpages, and a full-bleed wordmark footer.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS 4 · React Router 7

## Develop

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # outputs to dist/
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

Top-level sections are Portfolio, Capital, Famiglia, Transformations, News & Content and Our Team, plus a Search overlay (also Cmd/Ctrl+K). Old WordPress slugs still resolve: `/otc-investment/`, `/strategic-investments/` and `/tech-investments-part/` are live pages under Capital, while `/web3-services/` and `/about-us/` redirect to `/capital/` and `/famiglia/`. Dead links from the old site (`/advisory/`, `/web3-and-crypto-marketing/`, `/tech-startups-investments-part/`) redirect to the closest page.

## Forms

Contact and OTC forms post to `VITE_FORM_ENDPOINT` when set (Formspree, Web3Forms, or any JSON endpoint). When unset they open the visitor's email client addressed to `VITE_CONTACT_EMAIL`. Copy `.env.example` to `.env` and fill it in.

## Live prices

The homepage ticker pulls 24h prices from Kraken's public API in the browser. No key needed. If it fails, the strip simply doesn't render.

## Deploy

The build is static (`dist/`), so it works on any host.

- **Vercel / Netlify:** connect the repo, build command `npm run build`, output `dist`. `vercel.json` already rewrites all routes to `index.html`.
- **Hostinger (current host):** upload the contents of `dist/` to `public_html`. The included `.htaccess` handles SPA routing on LiteSpeed/Apache.

## Notes

- Fonts are loaded from Google Fonts: Barlow Condensed (headlines), Schibsted Grotesk (body), Newsreader (pull quotes). Swap them in `index.html` and the `@theme` block of `src/index.css`.
- Brand colour is `#023CCF`, sampled from the logo. The logo lives at `public/images/logo-box.png`.
- Team portraits are shown in black and white via a CSS filter (`grayscale` in `src/pages/Team.tsx`); remove the class for colour.
- Nubar Dadash has no photo yet; the card shows initials until one is added to `public/team/` and referenced in `src/data/site.ts`.
