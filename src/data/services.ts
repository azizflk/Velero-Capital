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
  make({
    id: "joint-ventures",
    slug: "joint-ventures-partnerships",
    title: "Joint Ventures & Partnerships",
    text: "Structuring alliances between companies, sponsors and investors that hold up commercially and culturally on both sides: partner selection, governance, economics and the alignment work that lets a venture survive its second year.",
    items: ["Partner identification and selection", "Governance, economics and exit terms", "Alignment across jurisdictions and cultures"],
    intro: "A joint venture is easy to announce and hard to run. Most fail not on the contract but on misaligned expectations that were never surfaced. We do that work before signing, and structure the venture so both sides can stand behind it.",
    when: [
      "You want to enter a market or a sector with a local partner rather than alone",
      "A strategic partner has proposed an alliance and you need to test and structure it",
      "An existing venture needs its governance or economics renegotiated",
      "Investors and an operator need a vehicle with clear roles, rights and exits",
    ],
    work: [
      { title: "Partner selection", text: "A short list of candidates judged on capability, capital, reputation and fit, approached through relationships where we have them." },
      { title: "Commercial design", text: "What each side contributes, what each side gets, and how value is shared as the venture grows or stalls." },
      { title: "Governance", text: "Board composition, reserved matters, deadlock mechanisms and reporting, set so that decisions can actually be made." },
      { title: "Exit and transfer terms", text: "Put and call options, rights of first refusal, drag and tag provisions, and valuation methods agreed while the parties still agree." },
      { title: "Negotiation to signing", text: "Term sheet through shareholders’ agreement, with legal and tax advisers coordinated on both sides." },
    ],
    deliverables: ["Partner long list and recommended short list", "Joint-venture term sheet", "Governance and decision framework", "Economic and exit model", "Negotiation support through signing"],
    insights: [
      { title: "Design for year two", text: "Every venture is aligned at signing. The structure has to hold when growth is slower, or faster, than either side planned." },
      { title: "Deadlock is a design question", text: "Ventures with two equal partners need a way out of stalemate that both sides accept in advance, or every disagreement becomes existential." },
      { title: "Culture is a term", text: "Decision speed, reporting style and the meaning of a handshake differ between markets. They belong in the structure, not in hope." },
    ],
  }),
  make({
    id: "introductions",
    slug: "strategic-introductions",
    title: "Strategic Introductions",
    text: "Curated introductions to the people who can move a decision — investors, sponsors, acquirers, operators and institutions — built on long-standing relationships rather than cold outreach, and made only where both sides have reason to meet.",
    items: ["Investor, sponsor and acquirer introductions", "Operator and institutional relationships", "Preparation so that the first meeting counts"],
    intro: "The right conversation at the right level changes the pace of a mandate. We open doors we have earned the right to open, prepare both sides properly, and stay involved so an introduction turns into a working relationship rather than a courtesy meeting.",
    when: [
      "You need to reach a specific investor, sponsor or institution and have no route in",
      "A transaction or raise needs a strategic party at the table",
      "You are entering a market where relationships decide who gets a hearing",
      "A senior counterpart will only take a meeting from someone they know",
    ],
    work: [
      { title: "Mapping", text: "Who actually decides, who influences them, and which of those people we or our network know well enough to approach." },
      { title: "Qualification", text: "We check interest and fit on both sides before anyone’s time is asked for. Introductions that waste a counterpart’s time cost everyone." },
      { title: "Preparation", text: "A short, accurate brief for each side: who they are meeting, why it matters, and what a good outcome looks like." },
      { title: "The introduction", text: "Made personally, at the right level, with context. Not a forwarded email." },
      { title: "Follow-through", text: "We stay in the loop after the first meeting, keep momentum between conversations and step back when the relationship stands on its own." },
    ],
    deliverables: ["Stakeholder map", "Qualified introduction plan", "Briefing notes for each meeting", "Personal introductions at the agreed level", "Follow-through until the relationship is established"],
    insights: [
      { title: "An introduction is a loan of trust", text: "We make them sparingly, because each one draws on a relationship we have spent years building." },
      { title: "Qualify before you ask", text: "The fastest way to lose access is to bring a counterpart something that was never going to fit." },
      { title: "The second meeting matters more", text: "A first meeting is a courtesy. Whether there is a second one depends on preparation and follow-through." },
    ],
  }),
  make({
    id: "market-entry",
    slug: "market-entry-trade-access",
    title: "Market Entry & Trade Access",
    text: "Market entry, route-to-market and trade facilitation for businesses expanding between the Gulf, the United States and wider international markets: partner selection, regulatory orientation, distribution and the relationships that make a new market workable.",
    items: ["Market entry strategy and partner selection", "Distribution, licensing and trade facilitation", "Regulatory and set-up orientation"],
    intro: "Entering a new market is as much about the partner and the sequence as the product. We help companies choose between a joint venture, a distributor, a licence and direct presence, find the right counterpart, and get the practical steps in the right order.",
    when: [
      "You are taking a product, service or brand into the Gulf or the United States for the first time",
      "A distributor or licensing partner needs to be found and structured",
      "Trade flows between the regions need counterparties, financing or logistics partners",
      "Regulatory set-up, licensing and local presence need to be sequenced with the commercial plan",
    ],
    work: [
      { title: "Market assessment", text: "Demand, competition, pricing and the practical route to customers in the target market, judged against what the business can actually support." },
      { title: "Entry structure", text: "Joint venture, distributor, licence, agency or direct subsidiary, weighed for control, cost, speed and risk." },
      { title: "Partner selection", text: "Distributors, agents, local sponsors and operating partners identified and qualified through relationships in the market." },
      { title: "Regulatory orientation", text: "Licensing, free-zone and onshore options, ownership rules and sector approvals mapped with specialist advisers, so the plan is lawful from day one." },
      { title: "Trade facilitation", text: "Counterparties, trade finance and logistics relationships for goods and commodities moving between the regions." },
    ],
    deliverables: ["Market entry assessment", "Recommended entry structure", "Qualified partner short list", "Regulatory and set-up roadmap", "Introductions to trade and logistics counterparties"],
    insights: [
      { title: "The partner is the strategy", text: "In most markets the choice of local partner decides more of the outcome than the product does." },
      { title: "Sequence beats speed", text: "Licensing, hiring and the first customer have to land in the right order. Doing them in parallel is how budgets disappear." },
      { title: "Trade is a relationship business", text: "Goods move on paper, but the paper moves because people on both sides trust each other." },
    ],
  }),
  make({
    id: "advisory-coordination",
    slug: "legal-advisory-coordination",
    title: "Legal & Advisory Coordination",
    text: "Bringing the right legal, tax, regulatory and specialist advisers into a transaction and keeping them pointed at the same outcome, so the deal is properly structured from the outset and the client has one coordinated team rather than several invoices.",
    items: ["Adviser selection across jurisdictions", "A single workplan and timetable", "Issues tracked and resolved, not circulated"],
    intro: "Cross-border transactions involve lawyers, tax advisers, regulators and specialists in more than one country. Someone has to choose them, brief them, sequence their work and settle their disagreements. We do that, so management can keep its attention on the business and the deal.",
    when: [
      "A transaction spans two or more jurisdictions and sets of advisers",
      "You need counsel in a market where you have no relationships",
      "Legal, tax and regulatory workstreams are out of step with each other or with the commercial timetable",
      "Advisory costs are rising without the deal moving forward",
    ],
    work: [
      { title: "Adviser selection", text: "Law firms, tax advisers and specialists chosen for the jurisdiction, the deal type and the budget, from relationships we already have." },
      { title: "Scoping and fees", text: "Clear scopes, fee arrangements and responsibilities agreed before work starts, so there are no surprises at closing." },
      { title: "Workplan", text: "One timetable across all workstreams, with dependencies made explicit and owners named." },
      { title: "Issue management", text: "Structuring, regulatory and documentation issues logged, prioritised and closed, with trade-offs put to the client clearly." },
      { title: "Closing coordination", text: "Conditions precedent, approvals, signatures and funds flow managed across time zones to a single closing." },
    ],
    deliverables: ["Adviser team and engagement terms", "Integrated transaction workplan", "Issues list with owners and status", "Weekly coordination and reporting", "Closing checklist and completion"],
    insights: [
      { title: "Advisers optimise their own workstream", text: "Each adviser is paid to perfect their piece. Someone has to be responsible for the whole." },
      { title: "Scope before advice", text: "Most cost overruns come from work nobody asked for. A clear scope at the start is the cheapest control there is." },
      { title: "We coordinate, we do not opine", text: "Legal and tax advice comes from the advisers engaged to give it. Our role is to make sure the right ones are in the room and working to one plan." },
    ],
  }),
  make({
    id: "relationship-management",
    slug: "cross-border-relationship-management",
    title: "Cross-Border Relationship Management",
    text: "A single point of contact across jurisdictions, time zones and stakeholder groups, keeping momentum on a mandate between visits and keeping every party informed, aligned and moving toward the same date.",
    items: ["One accountable point of contact", "Stakeholder alignment across markets", "Momentum between meetings and visits"],
    intro: "Cross-border mandates lose time in the gaps: between a visit and the next call, between a decision in one market and its execution in another. We fill those gaps, so the people on both sides always know where things stand and what happens next.",
    when: [
      "A mandate involves parties in the Gulf and the United States or Europe who rarely meet in person",
      "Decisions are made in one market and executed in another",
      "Stakeholders have lost track of who is doing what, and momentum is slipping",
      "You need someone on the ground in a market where you are not",
    ],
    work: [
      { title: "Stakeholder map", text: "Every party, their role, their interests and their decision-makers, kept current as the mandate evolves." },
      { title: "Cadence", text: "A rhythm of calls, updates and visits that fits the time zones and working weeks of both sides." },
      { title: "Alignment", text: "Differences in expectation surfaced early and resolved before they reach the negotiating table." },
      { title: "Local presence", text: "Meetings attended, documents walked through and relationships maintained in the market where the client is not." },
      { title: "Reporting", text: "Short, regular written updates so that principals on both sides can act without having been in every conversation." },
    ],
    deliverables: ["Named single point of contact", "Stakeholder map and contact plan", "Agreed meeting and reporting cadence", "Regular written status reports", "Representation at meetings in-market"],
    insights: [
      { title: "Momentum is the asset", text: "Most cross-border deals do not die; they drift. A mandate that is moving every week rarely drifts." },
      { title: "One voice, two markets", text: "Principals should hear the same account of events in Dubai and in San Francisco. A single point of contact is how." },
      { title: "Presence is persuasive", text: "Being in the room, in the right market, at the right time still decides more than any video call." },
    ],
  }),
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
