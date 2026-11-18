export type Investment = {
  slug: string;
  path: string;
  label: string;
  title: string;
  intro: string;
  summary: string;
  /** <title> and meta description for search engines */
  seo: { title: string; description: string };
  points: { title: string; text: string }[];
  lookFor: string[];
  belt?: "venture" | "realEstate";
  beltLabel?: string;
  extra?: { title: string; items: string[] };
  art: "skyline" | "growth" | "transfer" | "syndicate";
};

export const process = [
  { title: "Sourcing", text: "Opportunities come through founder, sponsor, shareholder and operator relationships." },
  { title: "Diligence", text: "We review the company or asset, the terms and the counterparties before anything is shared with investors." },
  { title: "Structuring", text: "Each transaction is structured as a direct holding or a dedicated vehicle, with terms and fees set out up front." },
  { title: "Closing & Reporting", text: "We manage closing and transfer approvals, then report to investors through to exit." },
];

export const investments: Investment[] = [
  {
    slug: "late-stage",
    seo: { title: "Late-Stage & Pre-IPO Investment Access | Velero Capital", description: "Access to late-stage and pre-IPO rounds for family offices and institutional investors: primary allocations in established private companies, Series C onward." },
    art: "growth",
    path: "/late-stage/",
    label: "Late-Stage & Pre-IPO",
    title: "Late-Stage & Pre-IPO: primary allocations in established private companies",
    intro: "Primary allocations in growth rounds of established private companies, typically Series C onward.",
    summary: "Primary allocations in growth rounds of established private companies, typically Series C onward.",
    points: [
      { title: "Access", text: "Allocations in competitive growth rounds, sourced through founder, sponsor and existing-shareholder relationships." },
      { title: "Stage", text: "Series C through pre-IPO, where the business model is proven and the route to liquidity is visible." },
      { title: "Sectors", text: "Artificial intelligence, robotics, fintech, healthcare and biotechnology, and space technology." },
    ],
    lookFor: ["Category leaders with durable revenue growth", "Experienced management and institutional investors in the round", "A credible path to IPO or strategic exit", "Valuation supported by fundamentals"],
    belt: "venture",
    beltLabel: "Access to Rounds Led by Leading VCs",
  },
  {
    slug: "secondaries",
    seo: { title: "Secondaries: Direct Secondaries & LP Fund Stakes | Velero Capital", description: "Secondary transactions for eligible investors: existing stakes from founders, employees and early investors, LP fund interests and structured liquidity." },
    art: "transfer",
    path: "/secondaries/",
    label: "Secondaries",
    title: "Secondaries: existing stakes in leading private companies and funds",
    intro: "Existing shares bought from founders, employees and early investors, and fund interests bought from limited partners seeking liquidity.",
    summary: "Existing stakes rather than new shares: direct secondaries from founders, employees and early investors, and fund interests from limited partners seeking liquidity.",
    points: [
      { title: "Direct Secondaries", text: "Shares purchased by eligible investors from founders, employees and early investors in established private companies." },
      { title: "Fund Stakes", text: "Limited partner interests acquired by eligible investors from holders who want liquidity before a fund reaches the end of its life." },
      { title: "Structured Liquidity", text: "Participation in tender offers and company-led liquidity programmes, coordinated with the issuer." },
    ],
    lookFor: ["Pricing at a sensible discount to the last round or to net asset value", "Clear title, with company consent and transfer approvals achievable", "Adequate information rights for the holding period", "A visible catalyst for liquidity"],
  },
  {
    slug: "real-estate",
    seo: { title: "Institutional Real Estate: Direct Deals, JVs & Funds | Velero Capital", description: "Institutional real estate for family offices and institutions: direct deals, joint ventures and fund positions with established operators and sponsors." },
    art: "skyline",
    path: "/real-estate/",
    label: "Real Estate",
    title: "Real Estate: direct deals, joint ventures and fund positions",
    intro: "Direct deals, joint ventures and fund positions in institutional-quality real estate.",
    summary: "Direct deals, joint ventures and fund positions in institutional-quality real estate.",
    points: [
      { title: "Direct Deals", text: "Single-asset and portfolio acquisitions where investors hold the property directly or through a dedicated vehicle." },
      { title: "Joint Ventures", text: "Partnerships with established operators and developers, with governance and economics agreed at the outset." },
      { title: "Fund Positions", text: "Commitments to, and secondary purchases of interests in, institutional real estate funds." },
    ],
    lookFor: ["Operators and sponsors with a long, audited track record", "Assets in markets with durable demand", "Conservative leverage and clear business plans", "Alignment: sponsors investing alongside our investors"],
    belt: "realEstate",
    beltLabel: "Access to Deals with Leading Real Estate Investors",
    extra: { title: "Sectors", items: ["Logistics and industrial", "Residential and multifamily", "Hospitality", "Office and mixed-use"] },
  },
  {
    slug: "co-investments",
    seo: { title: "Co-Investments & Syndicates: Deal-by-Deal Participation | Velero Capital", description: "How investors participate through Velero Capital: co-investments alongside a lead sponsor and dedicated deal-by-deal vehicles, with terms set out in writing." },
    art: "syndicate",
    path: "/co-investments/",
    label: "Co-Investments & Syndicates",
    title: "Co-Investments & Syndicates: how investors participate",
    intro: "The structures through which investors take part in the three strategies we cover: a co-investment alongside a lead sponsor, or a dedicated vehicle formed for one transaction.",
    summary: "The structures through which investors participate across the three strategies: deal by deal, alongside a lead sponsor, through a direct holding or a dedicated vehicle.",
    points: [
      { title: "Syndicates", text: "A dedicated vehicle is formed for each transaction, aggregating capital from approved investors into a single line on the cap table." },
      { title: "Co-Investments", text: "Investors participate alongside a lead sponsor in a specific deal, rather than committing to a blind pool." },
      { title: "Deal-By-Deal Choice", text: "Each opportunity is presented individually. Investors decide what to join and at what size." },
    ],
    lookFor: ["A credible lead sponsor with capital at risk", "Terms no worse than the lead’s own", "Vehicle costs and any carried interest disclosed in writing before commitment", "Reporting that passes through to every investor"],
    belt: "venture",
    beltLabel: "Access to Rounds Led by Leading VCs",
  },
];
