export type Service = {
  /** anchor on the overview page */
  id: string;
  /** detail page address: /services/<slug>/ */
  slug: string;
  path: string;
  title: string;
  /** one-paragraph description used on the overview page */
  text: string;
  /** three headline points on the overview page */
  items: string[];
  /** opening paragraph on the detail page */
  intro: string;
  when: string[];
  work: { title: string; text: string }[];
  deliverables: string[];
  insights: { title: string; text: string }[];
};

const make = (s: Omit<Service, "path">): Service => ({ ...s, path: `/services/${s.slug}/` });

export const services: Service[] = [
  make({
    id: "fundraising",
    slug: "fundraising-advisory",
    title: "Fundraising Advisory",
    text: "End-to-end support across equity and structured raises. We shape the positioning and narrative, build the investor list and materials, then run the process and the negotiation — keeping the operating business protected and your options open through close.",
    items: ["Positioning, narrative and investor materials", "Investor targeting and outreach strategy", "Process management and negotiation support"],
    intro: "Raising capital is a process, not an event. We prepare the company, build the investor universe and run the raise, so management can keep operating the business while it happens.",
    when: [
      "You are planning a priced equity round in the next six to twelve months",
      "A previous process stalled, or produced terms you could not accept",
      "You need to weigh equity against structured or debt alternatives",
      "The team has limited time or experience running a formal process",
    ],
    work: [
      { title: "Positioning and narrative", text: "We work out what the round is for, who it is for, and why now. The story is tested against what investors in your sector actually underwrite." },
      { title: "Materials", text: "Deck, model, data room and a short written memo. Each is built to answer diligence questions before they are asked." },
      { title: "Investor targeting", text: "A named list, ranked by fit: stage, cheque size, sector thesis and portfolio conflicts. The quality of the list matters more than its length." },
      { title: "Process management", text: "Sequenced outreach, a single timetable and the same information to every party, so momentum builds instead of leaking away." },
      { title: "Negotiation and close", text: "Term sheets compared beyond headline valuation — preferences, governance and protective provisions — through to signing and funding." },
    ],
    deliverables: ["Investor-ready deck and narrative memo", "Operating model and use-of-proceeds analysis", "Ranked investor target list", "Organised data room", "Term sheet comparison and negotiation support"],
    insights: [
      { title: "Preparation sets the outcome", text: "Most of the result is decided before the first meeting. Companies that answer diligence questions quickly keep the process competitive." },
      { title: "Price is one term among many", text: "Liquidation preferences, anti-dilution and board rights can move more value than a few points of headline valuation." },
      { title: "A tight timetable is leverage", text: "Running investors in parallel on one calendar creates the competitive tension that sequential conversations never do." },
    ],
  }),
  make({
    id: "corporate-development",
    slug: "corporate-development",
    title: "Corporate Development",
    text: "Embedded support for partnerships, licensing, commercial agreements and acquisition-led growth. We work as a flexible extension of your corporate development function, from origination through diligence and execution.",
    items: ["Partnership and licensing strategy", "Commercial agreement structuring", "Target origination, diligence and execution"],
    intro: "Not every company needs a full-time corporate development team, but most reach a point where partnerships, licensing and acquisitions need dedicated attention. We act as that function for as long as it is needed.",
    when: [
      "A strategic partner or acquirer has approached you",
      "You want to grow through acquisitions but lack the internal bandwidth",
      "A licensing or commercial agreement needs structuring and negotiation",
      "The board wants a clear strategy for growth beyond the core business",
    ],
    work: [
      { title: "Strategy", text: "Where partnerships and acquisitions can do what organic growth cannot, and where they would only distract. We set the priorities with management and the board." },
      { title: "Origination", text: "A mapped landscape of partners and targets, approached through relationships where we have them and directly where we don’t." },
      { title: "Evaluation", text: "Strategic fit, economics and risk for each opportunity, so decisions are made on a consistent basis instead of case by case." },
      { title: "Diligence", text: "We coordinate commercial, financial and legal workstreams and turn the findings into terms." },
      { title: "Execution", text: "Structuring, negotiation and documentation through to signing, with integration planned before the deal closes." },
    ],
    deliverables: ["Growth strategy and priority list", "Partner and target screening", "Deal structure and term recommendations", "Diligence coordination and findings summary", "Negotiation support through signing"],
    insights: [
      { title: "Partnerships fail on incentives", text: "The contract rarely breaks a partnership. Misaligned incentives do. We structure for what each side needs to see in year two, not just at signing." },
      { title: "Saying no early is valuable", text: "A clear screen saves months. Most opportunities should be declined quickly so the few that matter get proper attention." },
      { title: "Integration starts before signing", text: "The value of an acquisition is realised after close. Planning how the businesses combine belongs in the deal process, not after it." },
    ],
  }),
  make({
    id: "m-and-a",
    slug: "m-and-a-advisory",
    title: "M&A Advisory",
    text: "Sell-side and buy-side advice covering preparation, valuation, structuring and execution. We are strongest in technically complex situations, where real sector fluency changes the outcome.",
    items: ["Sell-side preparation and buyer outreach", "Buy-side screening and approach", "Valuation, structuring and execution"],
    intro: "Sell-side or buy-side, a transaction is decided by preparation, a credible valuation and a process that keeps options open until close.",
    when: [
      "You are considering a sale, merger or carve-out",
      "You have received an unsolicited approach",
      "You want to acquire a specific company or build a pipeline of targets",
      "Shareholders need an independent view on value and structure",
    ],
    work: [
      { title: "Preparation", text: "We find the issues a counterparty will find, and fix or explain them first. The information memorandum and management presentation follow from that." },
      { title: "Valuation", text: "A defensible range from comparable companies, precedent transactions and cash flows, with a clear account of what drives the differences." },
      { title: "Outreach", text: "On the sell side, a curated buyer list and controlled approach. On the buy side, discreet contact with targets and their shareholders." },
      { title: "Structuring", text: "Cash, shares, deferred consideration and earn-outs, weighed for value, tax, risk and certainty of close." },
      { title: "Execution", text: "Diligence, negotiation and documents run on one timetable, with decisions escalated to you when they matter." },
    ],
    deliverables: ["Information memorandum and management presentation", "Valuation analysis", "Buyer or target list with rationale", "Offer comparison across price, structure and certainty", "Coordination of diligence and transaction documents"],
    insights: [
      { title: "Certainty has a price", text: "The highest offer is not always the best one. Financing, approvals and conditions decide whether a deal actually closes." },
      { title: "Structure bridges valuation gaps", text: "When buyer and seller disagree on value, earn-outs, rollover equity and deferred consideration can close a gap that price alone cannot." },
      { title: "An approach deserves a process", text: "An unsolicited offer is a starting point. Testing it against alternatives is how shareholders know it is fair." },
    ],
  }),
  make({
    id: "cap-table",
    slug: "cap-table-equity-advisory",
    title: "Cap Table & Equity Advisory",
    text: "Cap table architecture, secondary transactions, anti-dilution analysis and equity programme design — including option pool sizing, refresh strategy and incentive structures aligned with long-term value creation.",
    items: ["Cap table architecture and clean-up", "Secondary transactions and liquidity", "Option pools, refreshes and incentive design"],
    intro: "The cap table records every promise a company has made about ownership. Kept clean and well designed, it makes financings and exits easier. Left alone, it becomes the thing diligence trips over.",
    when: [
      "You are preparing for a priced round or an exit",
      "Founders, employees or early investors want liquidity",
      "The option pool is exhausted, or incentives no longer retain people",
      "Convertible notes or SAFEs make ownership hard to read",
    ],
    work: [
      { title: "Review and clean-up", text: "We reconcile the cap table against the legal record, resolve discrepancies and produce a single fully diluted view everyone can rely on." },
      { title: "Dilution modelling", text: "What the next round, the conversion of outstanding instruments and a refreshed pool do to each holder, shown before terms are agreed." },
      { title: "Secondary transactions", text: "Structured liquidity for founders, employees and early investors: pricing, eligibility, company consent and transfer approvals." },
      { title: "Equity programmes", text: "Option pool sizing, vesting, refresh grants and incentive structures matched to the hiring plan and the path to exit." },
      { title: "Preference analysis", text: "Liquidation preferences and anti-dilution provisions modelled across exit values, so the real economics are understood." },
    ],
    deliverables: ["Reconciled, fully diluted cap table", "Dilution and exit waterfall scenarios", "Secondary transaction plan", "Option pool and refresh recommendations", "Summary for the board"],
    insights: [
      { title: "Model the waterfall", text: "Ownership percentages say who owns what. The waterfall says who gets paid, and in what order. They are often very different pictures." },
      { title: "Liquidity can be a retention tool", text: "A well-structured secondary lets long-serving people realise some value without leaving, and keeps them invested in the outcome." },
      { title: "Size the pool to the plan", text: "An option pool should follow the hiring plan for the next eighteen to twenty-four months, not a customary percentage." },
    ],
  }),
  make({
    id: "valuation",
    slug: "valuation-modelling",
    title: "Valuation & Modelling",
    text: "Operating and valuation models built to stand up to scrutiny, for board reviews, financings, transactions and strategic decisions.",
    items: ["Operating and financial models", "Valuation analysis for rounds and transactions", "Board and strategic decision support"],
    intro: "A model is an argument about the future expressed in numbers. Ours are built to be questioned — by boards, investors, buyers and auditors — and still stand.",
    when: [
      "A financing, transaction or board decision depends on the numbers",
      "Your current model cannot answer what-if questions",
      "You need an independent view on value",
      "Investors or buyers will scrutinise the forecasts",
    ],
    work: [
      { title: "Operating model", text: "Revenue, costs, headcount and cash built up from the drivers of the business, linked through to the three financial statements." },
      { title: "Valuation analysis", text: "Comparable companies, precedent transactions and discounted cash flow, presented together with the reasons they differ." },
      { title: "Scenarios and sensitivities", text: "Base, upside and downside cases, and the handful of assumptions that actually move the answer." },
      { title: "Board and investor reporting", text: "A clear summary of what the numbers say and what they do not, written for people who will not open the spreadsheet." },
      { title: "Transaction support", text: "The model maintained through diligence, answering questions from counterparties and updated as terms change." },
    ],
    deliverables: ["Three-statement operating model", "Valuation analysis across relevant methods", "Scenario and sensitivity pack", "Assumptions book", "Board-ready summary"],
    insights: [
      { title: "Assumptions matter more than formulas", text: "A model is only as good as its inputs. We document every assumption and where it came from, so it can be challenged directly." },
      { title: "One method is never enough", text: "Each valuation method has blind spots. Using several, and explaining the gaps between them, is what makes a range credible." },
      { title: "Build for the questions", text: "The best model is the one that answers what a board or buyer will ask next, quickly and without rebuilding." },
    ],
  }),
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
