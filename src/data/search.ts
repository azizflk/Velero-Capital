import { faqs, team } from "./site";

export type SearchDoc = { title: string; text: string; to: string; section: string };

export const searchIndex: SearchDoc[] = [
  { section: "Portfolio", title: "Portfolio", text: "125+ raises supported, 8 unicorns in portfolio, $21M+ funds deployed. Focus areas DeFi GameFi RWA NFT Metaverse Data AI Crypto. Exchange and chain partners.", to: "/portfolio/" },
  { section: "Portfolio", title: "Exchange partners (CEX)", text: "Binance Gate.io KuCoin Huobi HTX OKX MEXC Bitget Bitfinex Bybit BitMart Coinbase LBank XT.com Kraken", to: "/portfolio/#network" },
  { section: "Portfolio", title: "DEX partners", text: "Pangolin Uniswap Injective Trader Joe Perpetual Protocol SushiSwap dYdX OpenOcean PancakeSwap QuickSwap", to: "/portfolio/#network" },
  { section: "Portfolio", title: "Chains", text: "Ethereum Harmony Cosmos Avalanche BNB Smart Chain Tezos NEAR Polygon Algorand", to: "/portfolio/#network" },
  { section: "Capital", title: "Capital", text: "Private investment syndicate connecting global investors with high-growth Web3 and tech projects. Curated, vetted, closed investor circle.", to: "/capital/" },
  { section: "Capital", title: "OTC Investment", text: "Daily over-the-counter OTC deals in utility tokens. Token-for-USDT/USD deals at discounted rates. Steady capital flow, minimal market disruption, privacy.", to: "/otc-investment/" },
  { section: "Capital", title: "Get an OTC proposal", text: "Submit email, Telegram ID and CMC / CoinGecko link. No obligations, no upfront costs, 100% transparent.", to: "/otc-investment/#proposal" },
  { section: "Capital", title: "Strategic Investments", text: "Early-stage blockchain ventures. Seed and pre-seed funding. Stage: initial ticket to Series A. Investment size $50k to $10,000,000. Global reach.", to: "/strategic-investments/" },
  { section: "Capital", title: "Our ticket", text: "Raise capital from $50,000 to $10,000,000 through OTC acquisitions and venture capital prior to TGE token generation event.", to: "/capital/#ticket" },
  { section: "Capital", title: "Tech", text: "Artificial intelligence AI, robotics, biotechnology, space technology, fintech, healthcare technology. Startup scouting, cross-border access, capital matching, advisory support.", to: "/tech-investments-part/" },
  { section: "Famiglia", title: "About Velero Capital", text: "Private investment syndicate headquartered in Dubai, UAE and San Francisco, CA. Network of investors, industry experts, dealmakers and operational leaders. Since 2017.", to: "/famiglia/" },
  { section: "Famiglia", title: "Vision and mission", text: "Accelerate the future of decentralised finance and innovation. Bridge the gap between bold ideas and strategic capital.", to: "/famiglia/#vision" },
  { section: "Famiglia", title: "Core values", text: "Innovation-first, integrity and trust, global connectivity, agility, founder-focused, excellence.", to: "/famiglia/#values" },
  { section: "Famiglia", title: "Account Verification", text: "Beware of scammers. Verify a Telegram handle or email is officially associated with Velero Capital. Impersonation.", to: "/verification/" },
  { section: "Famiglia", title: "Contact", text: "Get in touch. Enquiry: OTC investment, fundraising, crypto marketing, tech startup investments, partnerships. Offices Dubai UAE and Singapore.", to: "/contact-us/" },
  { section: "Transformations", title: "Transformations", text: "From token design to investor-ready launches. Hands-on advisory and marketing that turns early projects into investor-ready companies.", to: "/transformations/" },
  { section: "Transformations", title: "Advisory", text: "Tokenomics strategy, regulatory compliance, market positioning, fundraising support, TGE and listings on Tier 1 and 2 exchanges.", to: "/transformations/#advisory" },
  { section: "Transformations", title: "Web3 & Crypto Marketing", text: "Get noticed. Building hype, growing real communities, making sure the right people are talking about your project.", to: "/transformations/#marketing" },
  { section: "Transformations", title: "How we add value", text: "Capital access, fundraising support, pitch deck feedback, round structuring, token strategy, unlock schedules, listings, OTC partners.", to: "/transformations/#value" },
  { section: "News & Content", title: "News & Content", text: "Announcements, insights and frequently asked questions from Velero Capital.", to: "/stories/" },
  ...faqs.map((f) => ({ section: "News & Content", title: f.q, text: f.a, to: "/stories/#faq" })),
  { section: "Our Team", title: "Our Team", text: "The operators shaping the future of tech and Web3.", to: "/team/" },
  ...team.map((m) => ({ section: "Our Team", title: m.name, text: m.role, to: "/team/" })),
];

export function search(q: string): SearchDoc[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((d) => {
      const title = d.title.toLowerCase();
      const hay = `${title} ${d.text.toLowerCase()} ${d.section.toLowerCase()}`;
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (title.startsWith(t) ? 4 : title.includes(t) ? 2 : 1), 0);
      return { d, score };
    })
    .filter((x): x is { d: SearchDoc; score: number } => !!x)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((x) => x.d);
}
