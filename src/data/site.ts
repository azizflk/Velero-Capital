export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "info@velero.capital";

export const nav = [
  {
    label: "Web3",
    to: "/web3-services/",
    children: [
      { label: "Overview", to: "/web3-services/" },
      { label: "OTC Investment", to: "/otc-investment/" },
      { label: "Strategic Investments", to: "/strategic-investments/" },
    ],
  },
  { label: "Tech", to: "/tech-investments-part/" },
  { label: "About", to: "/about-us/" },
  { label: "Team", to: "/team/" },
  { label: "Verification", to: "/verification/" },
  { label: "Contact", to: "/contact-us/" },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/107078065/" },
  { label: "CoinMarketCap", href: "https://coinmarketcap.com/community/profile/velerocapital/" },
  { label: "X", href: "https://x.com/velerocapital" },
  { label: "Telegram", href: "https://t.me/velerocapital" },
];

export const offices = [
  { region: "United Arab Emirates", address: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, UAE" },
  { region: "Singapore", address: "10 Anson Road #33-10 Suite C International Plaza Singapore 079903" },
];

export const STATS_ASOF = "9.29.26";
export const stats = [
  { value: 125, suffix: "+", label: "raises supported" },
  { value: 8, suffix: "", label: "unicorns in portfolio" },
  { value: 21, prefix: "$", suffix: "M+", label: "funds deployed" },
  { value: 100, suffix: "+", label: "new funding rounds" },
  { value: 3, suffix: "", label: "global offices" },
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

export const services = [
  {
    title: "OTC Investment",
    text: "Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved.",
    to: "/otc-investment/",
  },
  {
    title: "Investment Focus",
    text: "Early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth.",
    to: "/strategic-investments/",
  },
  {
    title: "Advisory",
    text: "Growth with expert support in tokenomics, regulatory compliance, TGE on Tier1&2 CEXs, market strategy, and capital raising.",
    to: "/strategic-investments/",
  },
];

export const differentiators = [
  {
    title: "100% Transparency",
    text: "At Velero Capital, transparency isn’t just a feature — it’s our foundation. From deal flow to due diligence, we ensure complete visibility at every stage of the investment process, keeping our partners informed, aligned, and confident.",
  },
  {
    title: "Collaborative Approach",
    text: "We’re more than helping you with investment purposes— we become part of your team. Our hands-on advisory model connects founders with strategic funding, seasoned operators, and a powerful Web3 network to drive sustainable growth.",
  },
  {
    title: "Smart Risk & Custom Alerts",
    text: "Our proprietary alert system monitors on-chain signals, market trends, and ecosystem movements in real-time, enabling smarter, faster decisions. We don’t react — we anticipate.",
  },
];

export const faqs = [
  {
    q: "What is Velero Capital's investment focus?",
    a: "Velero Capital specializes in early-stage Web3 projects, offering customized strategies, hands-on guidance, and critical resources to accelerate growth, particularly in blockchain ventures.",
  },
  {
    q: "How does Velero Capital’s OTC investment service work?",
    a: "Velero Capital offers daily OTC deals in utility tokens, ensuring consistent cash flow, market stability, and minimal disruption with transparent, secure transactions and discounted rates.",
  },
  {
    q: "What types of strategic investments does Velero Capital make?",
    a: "Velero Capital partners with early-stage blockchain ventures, investing between $50,000 and $10 million, focusing on B2B solutions and value-driven investments from seed to Series A stages.",
  },
  {
    q: "What advisory services does Velero Capital offer?",
    a: "Velero Capital provides expertise in tokenomics strategy, regulatory compliance, market positioning, fundraising support, and listings to ensure long-term growth and success for blockchain projects.",
  },
];

export const team = [
  { name: "Aziz Falak", role: "Founder", photo: "/team/aziz-falak.jpg", telegram: "https://t.me/AJF_VC", linkedin: "https://www.linkedin.com/in/aziz-f-4a9a6b179/" },
  { name: "Alisa Shapo", role: "Head of Operations", photo: "/team/alisa-shapo.jpg", telegram: "https://t.me/alisa_vc1" },
  { name: "Nubar Dadash", role: "Business Development Manager", telegram: "https://t.me/nubar_vc" },
  { name: "Rosie Gazar", role: "Head of Strategy", photo: "/team/rosie-gazar.jpg", telegram: "https://t.me/rosie_vc1" },
  { name: "Kamala Aliyeva", role: "Head of OTC", photo: "/team/kamala-aliyeva.jpg", telegram: "https://t.me/kamala_vc" },
  { name: "Lika Gazar", role: "Head of Investments", photo: "/team/lika-gazar.jpg", telegram: "https://t.me/lika_vc" },
  { name: "Elvin Mammadli", role: "Head of Partnerships", photo: "/team/elvin-mammadli.jpg", telegram: "https://t.me/elvin_vc" },
];

/** Official accounts used by the Account Verification page. Keep this list current. */
export const officialAccounts = {
  telegram: ["velerocapital", "AJF_VC", "alisa_vc1", "nubar_vc", "rosie_vc1", "kamala_vc", "lika_vc", "elvin_vc"],
  emailDomains: ["velero.capital"],
};
