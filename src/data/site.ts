export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "info@velero.capital";

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
      { label: "Account Verification", to: "/verification/" },
      { label: "Contact", to: "/contact-us/" },
    ],
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/107078065/" },
  { label: "X", href: "https://x.com/velerocapital" },
];

export const offices = [
  { region: "United Arab Emirates", address: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, UAE" },
  { region: "San Francisco", address: "San Francisco, CA, USA" },
  { region: "Los Angeles", address: "Los Angeles, CA, USA" },
  { region: "Berlin", address: "Berlin, Germany" },
];

export const STATS_ASOF = "9.29.26";
export const stats = [
  { value: 350, prefix: "$", suffix: "M+", title: "Raised, placed and advised", note: "across every mandate since 2023" },
  { value: 65, prefix: "$", suffix: "M+", title: "Capital raising", note: "raised for companies and funds" },
  { value: 50, prefix: "$", suffix: "M+", title: "M&A advisory", note: "advised on buy and sell-side" },
  { value: 3000, prefix: "", suffix: "+", title: "Investors and LPs", note: "met for mandates" },
];

export const trustedExchanges = [
  { name: "Binance", src: "/logos/cex/binance.svg" },
  { name: "Kraken", src: "/logos/cex/kraken.svg" },
  { name: "Bybit", src: "/logos/cex/bybit.svg" },
  { name: "Bitfinex", src: "/logos/cex/bitfinex.svg" },
  { name: "Gate.io", src: "/logos/cex/gateio.svg" },
  { name: "MEXC", src: "/logos/cex/mexc.svg" },
  { name: "HTX", src: "/logos/cex/htx.svg" },
];

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

export const partners = {
  CEX: [
    { name: "Binance", src: "/logos/cex/binance.svg" },
    { name: "Gate.io", src: "/logos/cex/gateio.svg" },
    { name: "KuCoin", src: "/logos/cex/kucoin.svg" },
    { name: "Huobi", src: "/logos/cex/huobi.svg" },
    { name: "OKX", src: "/logos/cex/okx.svg" },
    { name: "MEXC", src: "/logos/cex/mexc.svg" },
    { name: "Bitget", src: "/logos/cex/bitget.svg" },
    { name: "Bitfinex", src: "/logos/cex/bitfinex.svg" },
    { name: "Bybit", src: "/logos/cex/bybit.svg" },
    { name: "BitMart", src: "/logos/cex/bitmart.svg" },
    { name: "Coinbase", src: "/logos/cex/coinbase.svg" },
    { name: "LBank", src: "/logos/cex/lbank.svg" },
    { name: "XT.com", src: "/logos/cex/xt.png" },
  ],
  DEX: [
    { name: "Pangolin", src: "/logos/dex/pangolin.png" },
    { name: "Uniswap", src: "/logos/dex/uniswap.svg" },
    { name: "Injective", src: "/logos/dex/injective.png" },
    { name: "Trader Joe", src: "/logos/dex/traderjoe.png" },
    { name: "Injective Protocol", src: "/logos/dex/injective-protocol.svg" },
    { name: "Perpetual Protocol", src: "/logos/dex/perpetual.svg" },
    { name: "SushiSwap", src: "/logos/dex/sushiswap.png" },
    { name: "dYdX", src: "/logos/dex/dydx.webp" },
    { name: "OpenOcean", src: "/logos/dex/openocean.png" },
    { name: "PancakeSwap", src: "/logos/dex/pancakeswap.png" },
    { name: "QuickSwap", src: "/logos/dex/quickswap.png" },
  ],
  Chains: [
    { name: "Ethereum", src: "/logos/chains/ethereum.png" },
    { name: "Harmony", src: "/logos/chains/harmony.png" },
    { name: "Cosmos", src: "/logos/chains/cosmos.png" },
    { name: "Avalanche", src: "/logos/chains/avalanche.png" },
    { name: "BNB Smart Chain", src: "/logos/chains/bsc.png" },
    { name: "Tezos", src: "/logos/chains/tezos.png" },
    { name: "NEAR", src: "/logos/chains/near.png" },
    { name: "Polygon", src: "/logos/chains/polygon.png" },
    { name: "Algorand", src: "/logos/chains/algorand.svg" },
  ],
};


export const differentiators = [
  {
    title: "100% Transparency",
    text: "At Velero Capital, transparency isn’t just a feature — it’s our foundation. From deal flow to due diligence, we ensure complete visibility at every stage of the investment process, keeping our partners informed, aligned, and confident.",
  },
  {
    title: "Collaborative Approach",
    text: "We do more than place capital — we become part of your team. Our hands-on model connects investors, founders and seasoned operators through a global network built on relationships, not platforms.",
  },
  {
    title: "Disciplined Risk",
    text: "We track market signals, sector trends and secondary pricing closely, so decisions are made early and on evidence. We don’t react — we anticipate.",
  },
];

export const faqs = [
  {
    q: "What does Velero Capital invest in?",
    a: "Select private-market opportunities across four areas: late-stage and pre-IPO companies, secondary transactions, real estate, and deal-by-deal co-investments and syndicates.",
  },
  {
    q: "Who can invest with Velero Capital?",
    a: "We work with family offices and institutional investors. Opportunities are shared only with approved investors, on a deal-by-deal basis.",
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
