import { faqs, team } from "./site";
import { investments } from "./investments";

export type SearchDoc = { title: string; text: string; to: string; section: string };

export const searchIndex: SearchDoc[] = [
  { section: "Portfolio", title: "Portfolio", text: "$350M+ raised, placed and advised since 2023. Late-stage companies, secondaries and real estate. Sectors: AI, robotics, fintech, healthcare, biotech, space.", to: "/portfolio/" },
  { section: "Portfolio", title: "Who we invest alongside", text: "Venture firms and real estate investors: Andreessen Horowitz, Sequoia, Accel, Blackstone, Brookfield, Starwood, Prologis and more.", to: "/portfolio/#network" },
  { section: "Capital", title: "Capital", text: "Select private-market opportunities for family offices and institutional investors across late-stage companies, secondary transactions and real estate.", to: "/capital/" },
  ...investments.map((i) => ({ section: "Capital", title: i.label, text: `${i.summary} ${i.points.map((p) => p.title).join(", ")}.`, to: i.path })),
  { section: "Capital", title: "How it works", text: "Sourcing, diligence, structuring, closing and reporting. Direct holdings and deal-by-deal vehicles.", to: "/capital/#process" },
  { section: "Company", title: "About Velero Capital", text: "Private investment firm headquartered in Dubai with offices in San Francisco, Los Angeles and Berlin. Network of investors, industry experts, dealmakers and operational leaders.", to: "/company/" },
  { section: "Company", title: "Vision and mission", text: "The trusted route into private markets for family offices and institutions. Bridge the gap between bold ideas and strategic capital.", to: "/company/#vision" },
  { section: "Company", title: "Core values", text: "Innovation-first, integrity and trust, global connectivity, agility, founder-focused, excellence.", to: "/company/#values" },
  { section: "Company", title: "Account Verification", text: "Beware of scammers. Verify an email address is officially associated with Velero Capital. Impersonation.", to: "/verification/" },
  { section: "Company", title: "Contact", text: "Get in touch. Enquiry: late-stage and pre-IPO, secondaries, real estate, co-investments, advisory services, partnerships. Offices in Dubai, San Francisco, Los Angeles and Berlin.", to: "/contact-us/" },
  { section: "Services", title: "Services", text: "A focused corporate finance practice across the financing and transaction lifecycle. Senior-led, tightly scoped engagements on retainer.", to: "/services/" },
  { section: "Services", title: "Fundraising Advisory", text: "Equity and structured raises: positioning, narrative, investor targeting, materials, process management and negotiation.", to: "/services/#fundraising" },
  { section: "Services", title: "Corporate Development", text: "Partnerships, licensing, commercial agreements and acquisition-led growth. Origination, diligence and execution.", to: "/services/#corporate-development" },
  { section: "Services", title: "M&A Advisory", text: "Sell-side and buy-side advisory. Preparation, valuation, structuring and execution of mergers and acquisitions.", to: "/services/#m-and-a" },
  { section: "Services", title: "Cap Table & Equity Advisory", text: "Cap table architecture, secondaries, anti-dilution analysis, option pool sizing, refresh strategy and incentive design.", to: "/services/#cap-table" },
  { section: "Services", title: "Valuation & Modelling", text: "Operating and valuation models for board reviews, financings, transactions and strategic decisions.", to: "/services/#valuation" },
  { section: "Company", title: "Privacy Policy", text: "How Velero Capital handles personal data and cookies. Cookie settings, analytics, embedded media, your rights.", to: "/privacy/" },
  { section: "News & Content", title: "News & Content", text: "Announcements, insights and frequently asked questions from Velero Capital.", to: "/stories/" },
  ...faqs.map((f) => ({ section: "News & Content", title: f.q, text: f.a, to: "/stories/#faq" })),
  { section: "Our Team", title: "Our Team", text: "The operators behind every mandate.", to: "/team/" },
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
