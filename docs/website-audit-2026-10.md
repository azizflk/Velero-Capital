# Velero Capital — website audit and repositioning, October 2026

Scope: velero.capital (this repository). Audit of the codebase, copy, claims, conversion flows, legal coverage and technical
set-up, followed by the changes that could be made without inventing business facts. Items that need a decision, a fact or
legal review are listed at the end, not guessed.

## 1. The most important problems found

Ranked by risk to credibility.

1. **Unverified regulatory statement in the footer (local only).** An SEC Rule 15a-6 chaperoning notice had been added to the
   footer but never shipped. It states a fact about a signed agreement with a named U.S. broker-dealer that does not yet exist.
2. **Investor logos implied relationships.** 28 venture firms and 21 real estate investors were shown under headings such as
   "Co-invest alongside leading venture firms", "Alongside the leading real estate investors" and "Who we invest alongside",
   with no disclaimer. No transaction with any of these firms has been confirmed.
3. **Firm figures were internally inconsistent and unlabelled.** `$350M+` "raised, placed and advised" sat beside `$65M+`
   capital raising and `$50M+` M&A advisory with no explanation of the remaining ~`$235M`, no as-of date and no indication
   that the figures are unaudited. `3000+ investors and LPs met for mandates` is a network claim with no basis stated.
4. **No legal or disclosure coverage.** No "not an offer" language, no eligibility statement, no risk disclosure, no
   statement on access or allocations, no corporate identification. The privacy policy (drafted earlier in this project)
   has not had legal review.
5. **Copy implied Velero invests its own capital and manages a portfolio.** "Certainty of capital", "our private company
   positions", "Our Portfolio / Companies Shaping The Future", "Request Full Portfolio … position-level detail", and a
   Company page describing the firm as "founder-focused" with "hands-on partnership" and backing "bold ideas". None of this
   matches the positioning as an investment-access and advisory firm, and none of it has been verified.
6. **Four "categories" where there are three strategies.** Co-Investments & Syndicates was presented as a fourth asset
   class; it is a structure.
7. **Conversion flows were undifferentiated.** Every CTA was "Get in Touch" / "Discuss a mandate"; the site had no
   investor journey, no route for companies or sponsors introducing an opportunity, and no explanation of eligibility or
   what submitting a form does and does not do.
8. **Legacy Web3 material in the codebase.** Exchange/DEX/blockchain logo data and files, a crypto price ticker component,
   a parked "Stories" page, Telegram links in the (hidden) team data, and "Head of OTC" as a title.
9. **Twenty-four sector pages with broad activity claims.** The Solutions section, paraphrased from a reference site,
   answers "Yes, we advise …" across oil and gas, public sector, sports and other sectors, and describes "fund placement".
   None of this has been confirmed as actual Velero activity. (Left in place; see section 6.)
10. **Technical gaps.** No canonical URLs, no structured data, Open Graph image pointing at the logo file, `/team/` still in
    the sitemap after the page was hidden, an obsolete `.htaccess`, ~700 KB of unused images, no skip link, no backend
    behind the contact form (it opens the visitor's mail client).

## 2. Implemented improvements

**Credibility and legal**
- New **Legal & Disclosures** page (`/legal/`): no offer or solicitation, eligibility, no advice, risk, access and
  allocations, how figures are stated, third-party marks, corporate identification, contact. It states only what is true of
  the website itself and makes no claim about licences or registrations. Linked from the footer, the Company menu, search,
  and the contact form's consent line.
- Footer bottom bar now carries a short no-offer / eligibility / risk / third-party line and the Legal link. The 15a-6
  wording is kept in `Footer.tsx` as a switched-off constant with instructions on when it may be enabled.
- Firm figures are now a single source of truth in `src/data/site.ts` with consistent labels ("Raised, placed and advised",
  "Capital raised", "M&A advised", "Investor network"), an as-of date, and an "unaudited, not a measure of performance" note
  rendered under every stats grid. The `$350M+` stat is removed from the Portfolio meta description.
- Investor logos are reframed as the market landscape ("The lead investors in late-stage venture", "The institutional real
  estate market", "The investor landscape") with a non-affiliation note under every belt and grid.

**Positioning and copy**
- Supporting statement "Private-market opportunities. Institutional discipline." added to the hero and the closing band.
- Homepage pillars rewritten: no "proprietary", no "certainty of capital", no "closed investor circle"; the three pillars
  are relationship-sourced access, institutional discipline, and a mandate-led investor network.
- "Our Portfolio / Companies Shaping The Future / Request Full Portfolio" replaced with "Sector Focus / The Industries We
  Follow", with an explicit line that sector focus is not a promise of availability.
- Company page: title, intro, vision, mission, values and differentiators rewritten in an institutional register. It now
  states that Velero does not manage a fund or invest its own balance sheet. FAQs updated to match.
- Co-Investments & Syndicates reframed as the structures through which investors participate in the three strategies; the
  Capital page is titled "Investment strategies".
- "Alternatives & fund placement" on the Solutions overview changed to "Alternatives & secondaries".

**Conversion**
- CTA system: primary **Investor Access** (blue), secondary **Explore Our Strategies**, additional **Submit an
  Opportunity**, used on the hero, approach section, strategies section, closing band, strategy pages, Portfolio and the
  mega menus (Services and Solutions menus keep an engagement/mandate button).
- New **Investor Access** page (`/investor-access/`): who we work with, the six-stage process (enquiry, eligibility, mandate
  alignment, confidentiality and verification, review of opportunities, transaction engagement), what we do and do not do.
- New **Submit an Opportunity** page (`/submit-an-opportunity/`): who it is for, what to include, screening questions,
  engagement, with a note not to send confidential documents through the website.
- Contact form: third role "A sponsor or intermediary" with its own fields (role, authority, opportunity type, size,
  jurisdiction, timing, materials, summary); `?role=` and `?goal=` presets so every CTA lands on the right branch; consent
  line links to the legal page. Privacy policy updated to describe what the form now collects.

**Clean-up**
- Removed: crypto price ticker, exchange/DEX/chain logo data and 30+ logo files, parked Stories page, unused team
  slideshow, obsolete `.htaccess`, ~700 KB of unused images (`logo.png`, `graph.png`, `icon.png`).

**Technical and SEO**
- Canonical `<link>` and `og:url` set per route; Organization JSON-LD; Open Graph image switched to the 960×748 `og.png`.
- Sitemap regenerated from the route table (45 URLs, `lastmod`, no `/team/`); robots.txt unchanged.
- Skip-to-content link and `main` landmark.

## 3. Revised website structure

| Area | Route(s) | Notes |
| --- | --- | --- |
| Home | `/` | Hero, Why Us (+ figures + venture landscape), Approach (+ match animation), Investment Strategies, Real estate landscape, Sector focus, closing band |
| Investment strategies | `/capital/`, `/late-stage/`, `/secondaries/`, `/real-estate/` | Three verticals |
| Structures | `/co-investments/` | Co-investments and syndicates as the way investors participate |
| Investor access | `/investor-access/` | Six-stage journey → `/contact-us/?role=investor` |
| Submit an opportunity | `/submit-an-opportunity/` | Sponsor journey → `/contact-us/?role=sponsor` |
| Services | `/services/` + five detail pages | Advisory practice → `/contact-us/?role=founder&goal=services` |
| Solutions | `/solutions/` + 24 sector pages | Unchanged content; see section 6 |
| Portfolio | `/portfolio/` | Industries and the investor landscape (no holdings claimed) |
| Company | `/company/` | Rewritten; team page hidden at the owner's request (`/team/` → `/company/`) |
| Contact | `/contact-us/` | Three-way branching form |
| Trust & legal | `/verification/`, `/privacy/`, `/legal/` | |
| Selected Transactions, Insights | — | Not created: no verified transactions or research to publish (section 6) |

## 4. Updated copy

The new copy lives in `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/InvestorAccess.tsx`,
`src/pages/SubmitOpportunity.tsx`, `src/pages/Legal.tsx`, `src/data/site.ts` (stats, FAQs, differentiators) and
`src/data/investments.ts`. Positioning sentence, supporting statement and tagline are unchanged from the brief.

## 5. Removed or corrected claims

| Before | Now |
| --- | --- |
| "Co-invest alongside leading venture firms" / "Alongside the leading real estate investors" / "Who we invest alongside" | Market landscape headings plus a non-affiliation note on every logo row |
| "Institutional Execution … certainty of capital" | "Institutional Discipline": review before sharing; terms in writing |
| "Sourcing proprietary opportunities" | "Opportunities sourced through … relationships, not through listing platforms" |
| "Our Portfolio / Companies Shaping The Future / Request Full Portfolio / position-level detail" | "Sector Focus / The Industries We Follow"; Portfolio page CTA is Investor Access |
| "Institutional real estate sits beside our private company positions. We track and co-invest alongside the platforms…" | "…sits beside late-stage companies and secondaries in what we offer investors. We follow the platforms…" |
| "Four areas" of investment | Three strategies plus structures |
| "Only approved investors can participate" / "closed investor circle" | "eligible investors whose mandate they fit"; access never guaranteed |
| Company: "empowering innovation through strategic capital", "bold ideas", "Innovation-First", "act boldly", "Founder-Focused … hands-on partnership", "100% Transparency", "We don't react — we anticipate" | Institutional vision, mission and values; "does not manage a fund or invest its own balance sheet" |
| "Alternatives & fund placement" | "Alternatives & secondaries" |
| Footer SEC 15a-6 notice (never published) | Switched off in code until the arrangement exists |
| `$350M+` in the Portfolio meta description | Removed |
| Stat labels "Capital raising", "M&A advisory", "Investors and LPs met for mandates" | "Capital raised", "M&A advised", "Investor network", with an as-of/unaudited note |

## 6. Facts requiring confirmation (not invented)

Please confirm or correct each; the site is written so that none of these is asserted beyond what is stated.

1. **Figures.** `$350M+` total, `$65M+` capital raised, `$50M+` M&A advised, `3000+` investor network, "since 2023", as-of
   date 29 September 2026. What does the ~`$235M` balance consist of (placements? real estate?). Provide the breakdown or
   the figures to remove.
2. **Investor logos.** Has Velero or its investors actually participated in a transaction led by any of the 49 firms shown?
   If not, decide whether to keep them as "market landscape" (current framing, with disclaimer) or remove them.
3. **Legal entities.** Legal name(s), registration numbers, registered addresses and jurisdiction(s) for Dubai, the U.S. and
   Germany, for the Legal page.
4. **Regulatory status** in the UAE (DFSA/ADGM/SCA?), the U.S. (15a-6 arrangement, if and when signed) and Germany/EU.
5. **Solutions / 24 sector pages.** Which sectors reflect real Velero mandates? The pages answer "Yes, we advise…" across
   all 24, including oil and gas, public sector and sports, and one carries an "illustrative mandate". Recommend trimming to
   sectors with real experience.
6. **Selected transactions.** Any completed or advisory transactions that may be disclosed (anonymised or named), with the
   counterparty's permission. Until then, no transactions section exists.
7. **Team.** Whether to restore the Team page, with current titles (e.g. "Head of OTC" is outdated) and without Telegram
   links; founding year of the firm.
8. **Offices.** Street addresses (or "representative presence") for San Francisco, Los Angeles and Berlin.
9. **Contact handling.** A form endpoint (Formspree or similar) so enquiries are delivered by email rather than via the
   visitor's mail client; which inbox receives them.
10. **Deal-size and ticket-size ranges** in the contact form are illustrative and should match real minimums, if any.

## 7. Technical validation

- `tsc -b`: passes. `vite build`: passes (no ESLint is configured in the project; none was added).
- In-browser crawl of all 45 sitemap URLs: every page renders with an `h1`, correct canonical URL, a meta description, no
  404 and no horizontal overflow; all internal links resolve to a known route or redirect; legacy redirects
  (`/team/`, `/about-us/`, `/web3-services/`, `/otc-investment/`, `/stories/`, `/famiglia/`) land on the right pages.
- Contact form: all three roles and both founder goals render their field sets; `?role=` / `?goal=` presets work on fresh
  load and on in-page navigation; no console errors.
- Mobile (375 px): no overflow on the homepage, the three new pages, or the contact form.
- Not tested: actual email delivery (no endpoint configured); animation playback (the test browser does not render motion).

## 8. Legal and compliance review items

For qualified counsel in each relevant jurisdiction:

- `/legal/` and `/privacy/` in full, and the footer disclaimer line.
- Whether describing "fundraising advisory", "M&A advisory", "sourcing", "structuring", "managing closing and transfer
  approvals" and forming "a dedicated vehicle for each transaction" requires licensing (UAE, U.S., Germany), and whether
  any compensation is transaction-based.
- Cross-border solicitation: the site is public and in English; eligibility language is generic ("professional, qualified or
  accredited … in the laws of their own jurisdiction").
- The U.S. 15a-6 notice: only after the chaperoning agreement is signed and the broker-dealer's compliance team has
  approved the wording. It is switched off in `src/components/Footer.tsx`.
- Use of third-party logos under the "market landscape" framing with disclaimer.
- Cookie consent implementation versus GDPR/ePrivacy requirements in Germany.
- Verification page language ("We are not responsible for any communication … outside of our verified accounts").

## 9. Recommendations for future work

1. **Form backend** (Formspree/Resend) — the single biggest functional gap; enquiries are currently not reliably delivered.
2. **Pre-rendering** of routes (e.g. `vite-plugin-prerender` or Vercel static generation) so that search engines and link
   previews see each page's own title, description and content rather than the SPA shell.
3. **Trim Solutions** to sectors with real experience, and remove the illustrative mandate unless a real, permitted example
   replaces it.
4. **Selected transactions** section once there is permitted material; **Insights** once there is real commentary (the
   service pages' "Insights" blocks are a start).
5. **Team page** restored with verified titles and photos, since leadership is a credibility signal.
6. **Image optimisation**: convert PNG logos to SVG where possible; serve team photos as WebP.
7. **Analytics** behind the existing consent store (the "Analytics" cookie category is wired but no provider is set).
8. **Accessibility pass** with a screen reader on the mega menu and search overlay; contrast of `text-ink/50` labels.
