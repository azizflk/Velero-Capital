import { groups } from "./solutions";

export type MenuItem = { label: string; to: string; desc?: string };
export type MenuGroup = { title: string; to?: string; items: MenuItem[] };
export type Menu = {
  eyebrow: string;
  headline: string;
  text: string;
  cta: { label: string; to: string };
  /** the button at the foot of the panel; defaults to Investor Access */
  action?: { label: string; to: string };
  groups: MenuGroup[];
};

/** The full-width panels that open under the header, keyed by the nav label that owns them. */
export const menus: Record<string, Menu> = {
  Solutions: {
    eyebrow: "Industry coverage",
    headline: "Sector knowledge. Disciplined execution.",
    text: "An understanding of each industry’s capital, cycle and counterparties, applied to every mandate.",
    cta: { label: "Explore the sectors we serve", to: "/solutions/" },
    action: { label: "Discuss a mandate", to: "/contact-us/" },
    groups: groups.map((g) => ({ title: g.title, to: `/solutions/#${g.id}`, items: g.sectors.map((s) => ({ label: s.title, to: s.path })) })),
  },
  Capital: {
    eyebrow: "Capital",
    headline: "Access is the edge.",
    text: "Select private-market opportunities for family offices and institutional investors, sourced through relationships.",
    cta: { label: "Explore how we invest", to: "/capital/" },
    groups: [
      { title: "Private companies", items: [
        { label: "Late-Stage & Pre-IPO", to: "/late-stage/", desc: "Primary allocations in growth rounds, Series C onward." },
        { label: "Secondaries", to: "/secondaries/", desc: "Existing stakes from founders, employees and fund investors." },
      ] },
      { title: "Real assets", items: [
        { label: "Real Estate", to: "/real-estate/", desc: "Direct deals, joint ventures and fund positions." },
      ] },
      { title: "Structures", items: [
        { label: "Co-Investments & Syndicates", to: "/co-investments/", desc: "How investors participate, deal by deal." },
      ] },
      { title: "Overview", items: [
        { label: "Investment strategies", to: "/capital/", desc: "The three strategies and how a deal runs." },
        { label: "Investor Access", to: "/investor-access/", desc: "The staged process, from enquiry to transaction." },
        { label: "Portfolio", to: "/portfolio/", desc: "Where we work, and the investor landscape." },
      ] },
    ],
  },
  Services: {
    eyebrow: "Advisory services",
    headline: "A focused corporate finance practice.",
    text: "Senior-led, tightly scoped engagements across the financing and transaction lifecycle.",
    cta: { label: "Explore all services", to: "/services/" },
    action: { label: "Discuss an engagement", to: "/contact-us/?role=founder&goal=services" },
    groups: [
      { title: "Capital raising", items: [
        { label: "Fundraising Advisory", to: "/services/fundraising-advisory/", desc: "Equity and structured raises, end to end." },
      ] },
      { title: "Transactions", items: [
        { label: "M&A Advisory", to: "/services/m-and-a-advisory/", desc: "Sell-side and buy-side, from preparation to close." },
        { label: "Corporate Development", to: "/services/corporate-development/", desc: "Partnerships, licensing and acquisition-led growth." },
      ] },
      { title: "Equity", items: [
        { label: "Cap Table & Equity Advisory", to: "/services/cap-table-equity-advisory/", desc: "Cap tables, secondaries and incentive design." },
      ] },
      { title: "Analysis", items: [
        { label: "Valuation & Modelling", to: "/services/valuation-modelling/", desc: "Models built to stand up to scrutiny." },
      ] },
    ],
  },
  Company: {
    eyebrow: "Company",
    headline: "Velero means sailing vessel.",
    text: "A private investment firm headquartered in Dubai, with an office in San Francisco.",
    cta: { label: "Inside Velero Capital", to: "/company/" },
    groups: [
      { title: "About", items: [
        { label: "Inside Velero Capital", to: "/company/", desc: "Who we are, and what the name means." },
      ] },
      { title: "Work with us", items: [
        { label: "Investor Access", to: "/investor-access/", desc: "For family offices and institutions." },
        { label: "Submit an Opportunity", to: "/submit-an-opportunity/", desc: "For companies, shareholders and sponsors." },
      ] },
      { title: "Trust", items: [
        { label: "Account Verification", to: "/verification/", desc: "Check that an email is officially ours." },
        { label: "Privacy Policy", to: "/privacy/", desc: "How we handle personal data." },
        { label: "Legal & Disclosures", to: "/legal/", desc: "Eligibility, risk and the basis of what we share." },
      ] },
      { title: "Contact", items: [
        { label: "Contact", to: "/contact-us/", desc: "Tell us about your mandate." },
      ] },
    ],
  },
};
