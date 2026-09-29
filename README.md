# Velero Capital — velero.capital

Marketing site for Velero Capital, rebuilt as a static React app (previously WordPress + Elementor on Hostinger).

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
| Shared UI (nav, footer, hero, cards, ticker, forms) | `src/components/` |
| Logos, team photos, fonts | `public/` |

Routes keep the old WordPress slugs (`/otc-investment/`, `/about-us/`, …) so existing links and SEO carry over. Dead links from the old site (`/advisory/`, `/web3-and-crypto-marketing/`, `/tech-startups-investments-part/`) redirect to the closest page.

## Forms

Contact and OTC forms post to `VITE_FORM_ENDPOINT` when set (Formspree, Web3Forms, or any JSON endpoint). When unset they open the visitor's email client addressed to `VITE_CONTACT_EMAIL`. Copy `.env.example` to `.env` and fill it in.

## Live prices

The homepage ticker pulls 24h prices from Kraken's public API in the browser. No key needed. If it fails, the strip simply doesn't render.

## Deploy

The build is static (`dist/`), so it works on any host.

- **Vercel / Netlify:** connect the repo, build command `npm run build`, output `dist`. `vercel.json` already rewrites all routes to `index.html`.
- **Hostinger (current host):** upload the contents of `dist/` to `public_html`. The included `.htaccess` handles SPA routing on LiteSpeed/Apache.

## Notes

- Coinbase Sans is self-hosted in `public/fonts/`, carried over from the previous site. Confirm you hold a licence for it or swap `--font-sans` in `src/index.css` to a free alternative like Inter.
- Nubar Dadash has no photo yet; the card shows initials until one is added to `public/team/` and referenced in `src/data/site.ts`.
