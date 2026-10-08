export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "contact@velero.capital";

/** `mega` marks the item whose dropdown is the full-width Solutions panel. */
export type NavItem = { label: string; to: string; mega?: boolean; children?: { label: string; to: string }[] };
export const nav: NavItem[] = [
  { label: "Solutions", to: "/solutions/", mega: true },
  { label: "Portfolio", to: "/portfolio/" },
  {
    label: "Capital",
    to: "/capital/",
    children: [
      { label: "Late-Stage & Pre-IPO", to: "/late-stage/" },
      { label: "Secondaries", to: "/secondaries/" },
      { label: "Real Estate", to: "/real-estate/" },
      { label: "Co-Investments & Syndicates", to: "/co-investments/" },
    ],
  },
  {
    label: "Services",
    to: "/services/",
    children: [
      { label: "Fundraising Advisory", to: "/services/fundraising-advisory/" },
      { label: "Corporate Development", to: "/services/corporate-development/" },
      { label: "M&A Advisory", to: "/services/m-and-a-advisory/" },
      { label: "Cap Table & Equity Advisory", to: "/services/cap-table-equity-advisory/" },
      { label: "Valuation & Modelling", to: "/services/valuation-modelling/" },
    ],
  },
  {
    label: "Company",
    to: "/company/",
    children: [
      { label: "Inside Velero Capital", to: "/company/" },
      { label: "Investor Access", to: "/investor-access/" },
      { label: "Submit an Opportunity", to: "/submit-an-opportunity/" },
      { label: "Account Verification", to: "/verification/" },
      { label: "Contact", to: "/contact-us/" },
      { label: "Legal & Disclosures", to: "/legal/" },
    ],
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/107078065/" },
];

export const offices = [
  { region: "United Arab Emirates", address: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, UAE" },
  { region: "San Francisco", address: "San Francisco, CA, USA" },
];

/**
 * Firm figures: the single source of truth for every number shown on the site.
 * Stated by the firm from its own records, unaudited, and to be confirmed before each update (see docs/website-audit-2026-10.md).
 * The total aggregates three kinds of activity, so it is larger than the two advisory lines beneath it.
 */
export const STATS_ASOF = "29 September 2026";
export const stats = [
  { value: 350, prefix: "$", suffix: "M+", title: "Raised, placed and advised", note: "aggregate transaction value across all mandates since 2023" },
  { value: 65, prefix: "$", suffix: "M+", title: "Capital raised", note: "for companies and funds, as fundraising adviser" },
  { value: 50, prefix: "$", suffix: "M+", title: "M&A advised", note: "buy-side and sell-side mandates" },
  { value: 3000, prefix: "", suffix: "+", title: "Investor network", note: "family offices, institutions and LPs met on mandates" },
];
export const STATS_NOTE = `Figures stated by the firm from its own records as at ${STATS_ASOF}; unaudited. They aggregate capital raised, placed and advised and are not a measure of investment performance.`;

/** Venture firms shown in the homepage co-invest marquee. Two rows, no firm appears twice. */
export type VC = { name: string; src: string };
export const coInvestors: [VC[], VC[]] = [
  [
    { name: "Andreessen Horowitz", src: "/logos/vc/a16z.svg" },
    { name: "Sequoia Capital", src: "/logos/vc/sequoia.svg" },
    { name: "Accel", src: "/logos/vc/accel.svg" },
    { name: "Lightspeed Venture Partners", src: "/logos/vc/lightspeed.svg" },
    { name: "Greylock", src: "/logos/vc/greylock.svg" },
    { name: "Kleiner Perkins", src: "/logos/vc/kleiner-perkins.svg" },
    { name: "Bessemer Venture Partners", src: "/logos/vc/bessemer.png" },
    { name: "General Catalyst", src: "/logos/vc/general-catalyst.svg" },
    { name: "NEA", src: "/logos/vc/nea.svg" },
  ],
  [
    { name: "Founders Fund", src: "/logos/vc/founders-fund.svg" },
    { name: "Khosla Ventures", src: "/logos/vc/khosla.svg" },
    { name: "Menlo Ventures", src: "/logos/vc/menlo.png" },
    { name: "Redpoint Ventures", src: "/logos/vc/redpoint.svg" },
    { name: "Benchmark", src: "/logos/vc/benchmark.svg" },
    { name: "Mayfield", src: "/logos/vc/mayfield.png" },
    { name: "Wing Venture Capital", src: "/logos/vc/wing.svg" },
    { name: "Sapphire Ventures", src: "/logos/vc/sapphire.png" },
    { name: "Scale Venture Partners", src: "/logos/vc/scale.svg" },
    { name: "Madrona", src: "/logos/vc/madrona.png" },
    { name: "Boldstart Ventures", src: "/logos/vc/boldstart.png" },
    { name: "Pear VC", src: "/logos/vc/pear.svg" },
    { name: "Amplify Partners", src: "/logos/vc/amplify.svg" },
    { name: "Costanoa Ventures", src: "/logos/vc/costanoa.svg" },
    { name: "SignalFire", src: "/logos/vc/signalfire.svg" },
    { name: "Felicis", src: "/logos/vc/felicis.svg" },
    { name: "Conviction", src: "/logos/vc/conviction.png" },
    { name: "Gradient Ventures", src: "/logos/vc/gradient.svg" },
    { name: "Y Combinator", src: "/logos/vc/y-combinator.svg" },
  ],
];

/** Institutional real estate investors shown on the homepage. Two rows, no firm appears twice. */
export const realEstateInvestors: [VC[], VC[]] = [
  [
    { name: "Blackstone", src: "/logos/re/blackstone.svg" },
    { name: "Brookfield", src: "/logos/re/brookfield.svg" },
    { name: "Starwood Capital Group", src: "/logos/re/starwood.svg" },
    { name: "Prologis", src: "/logos/re/prologis.svg" },
    { name: "CBRE", src: "/logos/re/cbre.svg" },
    { name: "Hines", src: "/logos/re/hines.svg" },
    { name: "Tishman Speyer", src: "/logos/re/tishman-speyer.png" },
    { name: "KKR", src: "/logos/re/kkr.svg" },
    { name: "The Carlyle Group", src: "/logos/re/carlyle.svg" },
    { name: "Greystar", src: "/logos/re/greystar.png" },
    { name: "JLL", src: "/logos/re/jll.svg" },
  ],
  [
    { name: "Related Companies", src: "/logos/re/related.svg" },
    { name: "Nuveen", src: "/logos/re/nuveen.png" },
    { name: "PGIM", src: "/logos/re/pgim.svg" },
    { name: "LaSalle Investment Management", src: "/logos/re/lasalle.svg" },
    { name: "Invesco", src: "/logos/re/invesco.svg" },
    { name: "Ares Management", src: "/logos/re/ares.svg" },
    { name: "Lone Star Funds", src: "/logos/re/lone-star.png" },
    { name: "AEW Capital Management", src: "/logos/re/aew.png" },
    { name: "Simon Property Group", src: "/logos/re/simon.svg" },
    { name: "Apollo Global Management", src: "/logos/re/apollo.svg" },
  ],
];

export const differentiators = [
  {
    title: "Transparent Terms",
    text: "Structure, costs and reporting are set out in writing before any commitment, and investors see the same information we have reviewed.",
  },
  {
    title: "Relationships, Not Platforms",
    text: "Opportunities come through the founders, sponsors and shareholders who lead and own them, and investors are known to us by mandate, not by sign-up.",
  },
  {
    title: "Selectivity",
    text: "We decline most of what we see. What is shared has been reviewed against the strategy, the counterparties, the information available and the terms.",
  },
];

export const faqs = [
  {
    q: "What does Velero Capital invest in?",
    a: "Velero Capital does not invest its own capital. It connects eligible investors with select private-market opportunities in three strategies — late-stage and pre-IPO companies, secondary transactions and institutional real estate — through direct holdings, co-investments alongside a lead sponsor, or dedicated deal-by-deal vehicles.",
  },
  {
    q: "Who can invest with Velero Capital?",
    a: "Family offices, institutional investors and other professional or accredited investors who meet the eligibility rules of their jurisdiction. Opportunities are shared only with eligible investors whose mandate they fit, on a deal-by-deal basis, and access is never guaranteed.",
  },
  {
    q: "How do secondary transactions work?",
    a: "Rather than buying new shares in a funding round, investors acquire existing stakes — from founders, employees and early investors, or fund interests from limited partners seeking liquidity. We source the position, run diligence, and manage transfer approvals through closing.",
  },
  {
    q: "What advisory services does Velero Capital offer?",
    a: "A focused corporate finance practice: fundraising advisory, corporate development, M&A advisory, cap table and equity advisory, and valuation and modelling.",
  },
];

export const team = [
  { name: "Aziz Falak", role: "Founder", photo: "/team/aziz-falak.jpg", telegram: "https://t.me/AJF_VC", linkedin: "https://www.linkedin.com/in/aziz-f-4a9a6b179/" },
  { name: "Alisa Shapo", role: "Head of Operations", photo: "/team/alisa-shapo.jpg", telegram: "https://t.me/alisa_vc1" },
  { name: "Nubar Dadash", role: "Business Development Manager", telegram: "https://t.me/nubar_vc" },
  { name: "Rosie Gazar", role: "Head of Strategy", photo: "/team/rosie-gazar.jpg", telegram: "https://t.me/rosie_vc1" },
  { name: "Kamala Aliyeva", role: "Head of OTC", photo: "/team/kamala-aliyeva.jpg", telegram: "https://t.me/kamala_vc" },
  { name: "Lika Gazar", role: "Head of Investments", photo: "/team/lika-gazar.jpg", telegram: "https://t.me/lika_vc" },
  { name: "Sabina Taghi", role: "Head of Partnerships", photo: "/team/sabina-taghi.jpg" },
  { name: "Elvin Mammadli", role: "Head of Partnerships", telegram: "https://t.me/elvin_vc" },
];

/** Official email domains used by the Account Verification page. Keep this list current. */
export const officialAccounts = {
  emailDomains: ["velero.capital"],
};
