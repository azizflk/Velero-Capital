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
  /** Optional deeper sections, shown only on services that have them. */
  more?: {
    /** heading for the approaches section (default "Methods explained") */
    methodsTitle?: string;
    /** the approaches explained, each with where it helps and where it misleads */
    methods?: { title: string; text: string; useful: string; watch: string }[];
    /** how an engagement runs, step by step */
    process?: { title: string; text: string }[];
    /** what we ask the company for */
    needs?: string[];
    /** questions people ask about this service; answers state only what the firm has confirmed */
    faqs?: { q: string; a: string }[];
    /** slugs of the services most often combined with this one */
    related?: string[];
  };
};

const make = (s: Omit<Service, "path">): Service => ({ ...s, path: `/services/${s.slug}/` });

export const allServices: Service[] = [
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
    more: {
      methodsTitle: "Ways to raise, explained",
      methods: [
        {
          title: "Priced equity round",
          text: "New shares are sold at an agreed price per share, which sets a valuation for the company and the ownership each investor receives.",
          useful: "When the company has the traction to support a valuation and wants the clarity of fixed terms, a lead investor and, often, a board seat filled by them.",
          watch: "The headline valuation is only part of the deal; liquidation preferences, anti-dilution and governance rights agreed in the same round shape every later one.",
        },
        {
          title: "Convertible instruments",
          text: "Convertible notes and SAFEs take investment now and convert into shares at a later priced round, usually at a discount or subject to a valuation cap.",
          useful: "For smaller or earlier raises, or bridging between rounds, when agreeing a price today would be premature and speed and simpler documents matter.",
          watch: "Caps, discounts and stacked instruments can add up to more dilution than expected when they convert, so the effect should be modelled before each one is signed.",
        },
        {
          title: "Structured and debt alternatives",
          text: "Venture debt, revenue-based finance, preferred structures and other instruments that provide capital with less, or different, dilution than ordinary equity.",
          useful: "When the business has predictable revenue or assets that can support repayment, or when management wants to extend runway without resetting the valuation.",
          watch: "Repayment schedules, covenants, security and warrants carry real obligations, and they bite hardest when the business is behind plan.",
        },
      ],
      process: [
        { title: "Scope", text: "The engagement is led by a senior member of the team. Scope, responsibilities, deliverables and commercial terms are agreed in writing before any investor is approached." },
        { title: "Positioning", text: "We work out with management what the round is for, who it is for and why now, and test the story against what investors in the sector underwrite." },
        { title: "Materials", text: "The deck, narrative memo, operating model, use-of-proceeds analysis and data room are prepared so that diligence questions are answered before they are asked." },
        { title: "Investor list", text: "A named list ranked by fit on stage, cheque size, sector thesis and portfolio conflicts, agreed with management before outreach begins." },
        { title: "Outreach and diligence", text: "Investors are approached in sequence on a single timetable and given the same information, and diligence requests are handled through the data room." },
        { title: "Negotiation and close", text: "Term sheets are compared beyond headline valuation, across preferences, governance and protective provisions, and negotiation is supported through to signing and funding." },
      ],
      needs: [
        "Historical financial statements and management accounts",
        "The current plan or forecast, and how much is being raised and for what",
        "Any existing deck, memo or investor materials",
        "The cap table and the terms of any outstanding notes, SAFEs or other instruments",
        "A record of investor conversations already held and any terms received",
        "The terms and outcomes management would and would not accept",
      ],
      faqs: [
        {
          q: "What is the difference between a priced round and a convertible instrument?",
          a: "A priced round sells shares at an agreed price today, so the valuation and each investor’s ownership are fixed at signing. A convertible note or SAFE takes the money now and turns it into shares at a later priced round, usually on better terms than the new investors receive. It defers the valuation question rather than removing it.",
        },
        {
          q: "Why compare term sheets on more than valuation?",
          a: "Because other terms can move more value than the headline price. Liquidation preferences decide who is paid first on an exit, anti-dilution provisions change ownership if a later round is priced lower, and board and protective rights decide who controls key decisions. A lower valuation on cleaner terms can be the better offer.",
        },
      ],
      related: ["valuation-modelling", "cap-table-equity-advisory", "strategic-introductions"],
    },
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
    more: {
      methodsTitle: "Growth routes, explained",
      methods: [
        {
          title: "Commercial partnership",
          text: "A contractual arrangement with another company, such as distribution, co-development or a joint go-to-market, in which each side keeps its own business and ownership.",
          useful: "When another company already has the customers, channels or capability you need, and the goal can be reached without combining the businesses.",
          watch: "Partnerships tend to fail on incentives rather than wording; if one side stops seeing value, the agreement alone will not keep it working.",
        },
        {
          title: "Licensing",
          text: "One party grants another the right to use its technology, brand or other intellectual property, in return for fees or royalties and on defined terms.",
          useful: "When the intellectual property can earn more in someone else’s hands or markets than the company could reach on its own, or when access to another’s IP is quicker than building it.",
          watch: "Field of use, territory, exclusivity, sublicensing and termination rights decide what is actually given away, and they are hard to win back later.",
        },
        {
          title: "Acquisition",
          text: "Buying another business, or part of it, to add products, customers, people or capability under the company’s own control.",
          useful: "When control matters, when the capability is core to the strategy, or when building it organically would take too long.",
          watch: "The price is only the start of the cost; diligence findings, integration and keeping the people who matter decide whether the value is realised.",
        },
      ],
      process: [
        { title: "Scope", text: "The engagement is led by a senior member of the team. Scope, responsibilities, deliverables and commercial terms are agreed in writing before work starts." },
        { title: "Strategy", text: "We agree with management and the board where partnerships and acquisitions can do what organic growth cannot, and set the priorities and the criteria for screening." },
        { title: "Origination and screening", text: "Partners and targets are mapped and screened against the agreed criteria, and approached through relationships where they exist and directly where they do not." },
        { title: "Evaluation", text: "Each opportunity that passes the screen is assessed for strategic fit, economics and risk on a consistent basis, so it can be compared with the alternatives." },
        { title: "Diligence", text: "Commercial, financial and legal workstreams are coordinated and their findings summarised and turned into terms." },
        { title: "Execution", text: "Structuring, negotiation and documentation are supported through to signing, with integration planned before the deal closes." },
      ],
      needs: [
        "The company’s strategy and the board’s priorities for growth",
        "Historical financial statements and the current plan",
        "An overview of products, intellectual property and existing commercial agreements",
        "Any approaches received from partners or acquirers, and what has been discussed",
        "The criteria for opportunities the company would and would not pursue",
        "Who in the company decides, and how approvals are given",
      ],
      faqs: [
        {
          q: "How is this different from an in-house corporate development team?",
          a: "An in-house team is a permanent function. Velero Capital works as an extension of the company’s corporate development function, or as that function where none exists, for as long as it is needed, from origination through diligence and execution.",
        },
        {
          q: "When does a partnership make more sense than an acquisition?",
          a: "A partnership suits goals that can be reached while each business stays independent, such as reaching new customers or combining products. An acquisition suits cases where control of the capability is essential. Partnerships commit less capital and are easier to unwind; acquisitions give more control but carry more cost and integration risk.",
        },
        {
          q: "Why plan integration before signing?",
          a: "Because the value of an acquisition is realised after it closes. Deciding how the businesses will combine, who will lead which parts and what has to happen first belongs in the deal process, where it can still shape the terms.",
        },
      ],
      related: ["m-and-a-advisory", "joint-ventures-partnerships", "legal-advisory-coordination"],
    },
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
    more: {
      methodsTitle: "Deal routes, explained",
      methods: [
        {
          title: "Broad process",
          text: "A sale run with a wider group of potential buyers, on one timetable and with the same information, usually in stages from indicative to final offers.",
          useful: "When the buyer universe is wide and uncertain, and the aim is to test the market fully and create competitive tension on price and terms.",
          watch: "The more parties involved, the harder confidentiality is to keep, and the greater the demand on management time during diligence.",
        },
        {
          title: "Targeted process",
          text: "A controlled approach to a short list of buyers chosen for their strategic fit and ability to complete.",
          useful: "When the likely buyers are known, confidentiality matters, or the business would suffer from a long and visible sale.",
          watch: "With fewer parties there is less competitive tension, so the list has to be right; leaving out a natural buyer can cost more than the process saves.",
        },
        {
          title: "Bilateral negotiation",
          text: "A transaction negotiated with a single counterparty, whether a buyer that has made an approach or a target approached directly on the buy side.",
          useful: "When there is a clear strategic fit with one party, when speed and discretion are priorities, or when a specific company is the objective.",
          watch: "Without alternatives there is no market check on price or terms, so the offer needs testing against what other routes could realistically produce.",
        },
      ],
      process: [
        { title: "Scope", text: "The engagement is led by a senior member of the team. Scope, responsibilities, deliverables and commercial terms are agreed in writing before work starts." },
        { title: "Preparation", text: "We look for the issues a counterparty will find, fix or explain them first, and prepare the information memorandum and management presentation from that." },
        { title: "Valuation", text: "A defensible range is built from comparable companies, precedent transactions and cash flows, with an account of what drives the differences." },
        { title: "Outreach", text: "On the sell side, a curated buyer list is approached in a controlled way, with information released once confidentiality terms are signed. On the buy side, targets and their shareholders are contacted discreetly." },
        { title: "Offers and structure", text: "Offers are compared across price, structure and certainty of close, weighing cash, shares, deferred consideration and earn-outs for value, tax and risk." },
        { title: "Execution", text: "Diligence, negotiation and transaction documents run on one timetable, with decisions escalated to you when they matter, through to signing and completion." },
      ],
      needs: [
        "Historical financial statements, management accounts and the current plan",
        "The cap table, shareholder agreements and any rights that affect a sale",
        "Material contracts, including any change-of-control provisions",
        "Debt terms, guarantees and other liabilities",
        "Any approaches received and correspondence with the counterparty",
        "Shareholders’ objectives on value, structure and their role after completion",
      ],
      faqs: [
        {
          q: "What is the difference between sell-side and buy-side advice?",
          a: "Sell-side advice acts for the owners of a business being sold: preparing it, finding and approaching buyers, and negotiating the best combination of price, structure and certainty. Buy-side advice acts for the acquirer: screening and approaching targets, valuing them and structuring the offer.",
        },
        {
          q: "What is an earn-out?",
          a: "Part of the price paid later, and only if the business meets agreed targets after completion, often revenue or earnings. It can bridge a gap between what the buyer and seller believe the business is worth. Its value depends on how the targets are defined and measured, and on how much influence the seller keeps over meeting them.",
        },
        {
          q: "We have received an unsolicited offer. What should happen next?",
          a: "Treat it as a starting point. An approach shows that a buyer sees value, but on its own it does not show whether the price and terms are fair. Testing it against the realistic alternatives, including other buyers or not selling, is how shareholders know.",
        },
      ],
      related: ["valuation-modelling", "legal-advisory-coordination", "cap-table-equity-advisory"],
    },
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
    more: {
      methodsTitle: "Incentive instruments, explained",
      methods: [
        {
          title: "Share options",
          text: "The right to buy shares at a fixed exercise price in the future, earned over a vesting schedule.",
          useful: "When the share value is still modest and the aim is to reward the growth in value from here.",
          watch: "An option is only worth something if the shares end up above the exercise price, and holders may have to fund the exercise and any tax on it; the tax treatment differs between jurisdictions, so tax advisers need to be involved.",
        },
        {
          title: "Restricted shares and RSUs",
          text: "Restricted shares are issued at the outset and subject to vesting; restricted stock units are a promise to deliver shares, or their value, once vesting conditions are met.",
          useful: "When the share value is already high, so an option would offer little upside, and the holder should receive value even if the price does not rise much further.",
          watch: "Tax can fall due on vesting or delivery, sometimes before there is any liquidity to pay it, so the settlement terms need as much attention as the grant.",
        },
        {
          title: "Phantom equity and share appreciation rights",
          text: "A cash award that tracks the value of the shares, or the increase in it, without any shares being issued.",
          useful: "When issuing shares is impractical, for example because of ownership rules, holders spread across several jurisdictions, or shareholders who want to keep the register closed.",
          watch: "It is a cash liability for the company and gives holders no shareholder rights, so the valuation method, the payment triggers and the funding of the payout must be set out precisely.",
        },
      ],
      process: [
        { title: "Scope", text: "Led by a senior member of the team, we agree the question the work has to answer, who will rely on it, the deliverables and the commercial terms, and set them out in writing before work starts." },
        { title: "Records", text: "We gather the cap table, the share register and the documents behind every share, option, warrant and convertible instrument, once confidentiality terms are agreed." },
        { title: "Reconcile", text: "The cap table is checked against the legal record, discrepancies are resolved with the company and its legal advisers, and a single fully diluted view is produced." },
        { title: "Model", text: "We show what the next round, the conversion of outstanding instruments and a refreshed pool do to each holder, and run the exit waterfall across a range of values." },
        { title: "Recommend", text: "Option pool sizing, refresh grants, incentive structures or a secondary transaction plan, with a summary written for the board." },
        { title: "Implement", text: "Where a secondary or a new programme follows, we support pricing, eligibility, company consent and transfer approvals, with the legal documents prepared by the company’s advisers." },
      ],
      needs: [
        "The current cap table and share register",
        "Articles, shareholders’ agreements and the terms of each class of shares",
        "The terms of convertible notes, SAFEs, warrants and any other outstanding instruments",
        "The option or incentive plan, grant records and vesting schedules",
        "The hiring plan and the roles the equity programme has to attract and retain",
        "Any proposed round, exit or secondary sale the work will support",
      ],
      faqs: [
        {
          q: "What does fully diluted mean?",
          a: "Fully diluted ownership counts every share as if all options, warrants and convertible instruments had been exercised or converted, and usually includes the unallocated option pool as well. Different documents can define it differently, which is why the definition used in any analysis should be stated.",
        },
        {
          q: "What is the difference between ownership and the waterfall?",
          a: "Ownership percentages say who owns what. The waterfall says who gets paid, and in what order, once liquidation preferences and other rights are applied at a given exit value. At lower exit values the two can look very different.",
        },
        {
          q: "What is a secondary transaction?",
          a: "A sale of existing shares by a founder, employee or early investor to a new or existing investor. The money goes to the seller rather than the company, and no new shares are issued. It usually needs company consent and transfer approvals under the company’s own documents.",
        },
      ],
      related: ["fundraising-advisory", "valuation-modelling", "m-and-a-advisory"],
    },
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
    more: {
      methods: [
        {
          title: "Discounted cash flow",
          text: "The value of the cash the business is expected to generate, brought back to today at a rate that reflects its risk.",
          useful: "When the business has a forecast that can be defended line by line, and when the question is what the company is worth on its own plan.",
          watch: "Most of the answer usually sits in the terminal value and the discount rate, so small changes there move the result a long way.",
        },
        {
          title: "Comparable companies",
          text: "How the market prices similar listed businesses today, expressed as multiples of revenue, earnings or another measure that matters in the sector.",
          useful: "As a check on what investors are paying now for growth, margin and scale like yours.",
          watch: "No two companies are truly alike, and public prices move with the market; the choice of peers and of the multiple needs to be explained, not assumed.",
        },
        {
          title: "Precedent transactions",
          text: "What buyers and investors have actually paid for similar businesses in completed deals.",
          useful: "In M&A and control situations, where the price includes what a buyer is willing to pay for control or synergies.",
          watch: "Deals are done at different points in the cycle and on different terms, and the full terms are not always disclosed.",
        },
      ],
      process: [
        { title: "Scope", text: "We agree the question the work has to answer, who will rely on it, the deliverables and the timetable, and set them out in writing before work starts." },
        { title: "Information", text: "We gather the financial history, the current plan and the operating data, and agree with management where each assumption will come from." },
        { title: "Build", text: "The operating model is built up from the drivers of the business and linked to the three financial statements; the valuation work is built on top of it." },
        { title: "Challenge", text: "We test the assumptions with management, run the scenarios and sensitivities, and reconcile the methods so the range can be explained." },
        { title: "Deliver", text: "You receive the model, the assumptions book and a summary written for the board, investors or counterparties who will read it." },
        { title: "Support", text: "Where the work feeds a financing or a transaction, the model is maintained through diligence and updated as terms change." },
      ],
      needs: [
        "Historical financial statements and management accounts",
        "The current budget, plan or forecast, and how it was built",
        "Operating data behind revenue and costs: customers, pricing, volumes, headcount",
        "The cap table and the terms of any outstanding instruments",
        "Material contracts, debt terms and any commitments that affect cash",
        "The decision or transaction the work will support, and who will rely on it",
      ],
      faqs: [
        {
          q: "What is the difference between an operating model and a valuation?",
          a: "An operating model forecasts how the business performs: revenue, costs, cash and the financial statements. A valuation turns that and the market evidence into a view of what the business is worth. The valuation is only as sound as the model beneath it, which is why we build both together.",
        },
        {
          q: "Which valuation method do you use?",
          a: "Usually several. Discounted cash flow, comparable companies and precedent transactions each have blind spots, so we use the ones relevant to the question and explain why their results differ. A range that can be explained is more credible than a single number.",
        },
        {
          q: "Who is the work for?",
          a: "Founders, management teams and boards preparing a financing, a transaction or a strategic decision, and shareholders who need an informed view of value before they negotiate.",
        },
      ],
      related: ["fundraising-advisory", "m-and-a-advisory", "cap-table-equity-advisory"],
    },
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
    more: {
      methodsTitle: "Partnership structures, explained",
      methods: [
        {
          title: "Incorporated joint venture",
          text: "A separate company owned by the partners, with its own board, assets, people and accounts, governed by a shareholders’ agreement.",
          useful: "When the venture needs its own licences, assets or staff, is meant to last, or may one day raise capital or be sold in its own right.",
          watch: "Governance, deadlock and exit have to be designed at the start; a jointly owned company is more involved to set up, and harder to unwind, than a contract.",
        },
        {
          title: "Contractual alliance",
          text: "A cooperation, distribution or development agreement between the partners, with no new entity and no shared ownership.",
          useful: "When the scope is defined, the relationship is still being tested, or the parties want to work together before committing to shared ownership.",
          watch: "Without a shared entity, ownership of what is created together, such as intellectual property, customers and data, has to be settled in the contract; it is also easier for either side to walk away.",
        },
        {
          title: "Minority stake with a commercial agreement",
          text: "One partner takes an equity stake in the other alongside a commercial agreement between them.",
          useful: "When one side wants a share in the other’s growth, and the relationship needs a longer commitment than a contract alone provides.",
          watch: "The rights attached to the stake, such as board seats, consent rights, information rights and exclusivity, can affect later financings or a sale, so the equity and commercial terms should be negotiated together.",
        },
      ],
      process: [
        { title: "Scope", text: "A first conversation is usually followed by a non-disclosure agreement; the scope, responsibilities, deliverables and commercial terms are then agreed in writing, with a senior member of the team leading the engagement." },
        { title: "Objectives", text: "We set out what the company wants from the venture, what it can contribute and what it will not give up, before any partner is approached." },
        { title: "Partner selection", text: "A long list of candidates is judged on capability, capital, reputation and fit, and narrowed to a recommended short list." },
        { title: "Alignment", text: "Expectations on both sides are surfaced and tested: contributions, decision speed, reporting and what success looks like if growth is slower or faster than planned." },
        { title: "Term sheet", text: "Economics, governance, deadlock mechanisms and exit terms are set out in a term sheet, supported by an economic and exit model." },
        { title: "Negotiation to signing", text: "From term sheet through shareholders’ agreement, with legal and tax advisers coordinated on both sides." },
      ],
      needs: [
        "The strategic objective and the market or sector the venture would address",
        "What the company would contribute: capital, assets, intellectual property, people, customers or licences",
        "Financial statements and the plan for the part of the business concerned",
        "Any proposals or discussions already under way with potential partners",
        "Existing agreements, exclusivities or known ownership restrictions that limit the options",
        "For an existing venture, the current shareholders’ agreement and how governance works in practice",
      ],
      faqs: [
        {
          q: "What is the difference between a joint venture and a partnership agreement?",
          a: "A joint venture usually means a separate entity the partners own together, with its own governance and accounts. A partnership or alliance agreement is a contract between the parties, with no shared ownership. The first suits long-term ventures that need their own assets and people; the second suits defined projects and relationships still being tested.",
        },
        {
          q: "What is a deadlock mechanism?",
          a: "An agreed way out when partners with equal say cannot agree on a decision. It typically runs from escalation to senior executives, through mediation, to provisions that let one side buy the other out or bring the venture to an end. It is agreed in advance, while the parties still agree, so that a disagreement does not stop the venture.",
        },
        {
          q: "Who is the work for?",
          a: "Companies entering a market or sector with a local partner, companies testing an alliance a partner has proposed, parties to an existing venture whose governance or economics need renegotiating, and investors and operators who need a vehicle with clear roles, rights and exits.",
        },
      ],
      related: ["corporate-development", "market-entry-trade-access", "legal-advisory-coordination"],
    },
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
    more: {
      methodsTitle: "Introductions by counterpart, explained",
      methods: [
        {
          title: "Investors and sponsors",
          text: "Funds, family offices and sponsors that provide capital to companies, projects or transactions, each with its own mandate on stage, sector and size.",
          useful: "When a raise or transaction needs capital, and the counterpart’s mandate fits what the company is offering.",
          watch: "An introduction does not replace a prepared process; meeting an investor before the materials and the story are ready can use up the one hearing that investor will give.",
        },
        {
          title: "Acquirers and strategic parties",
          text: "Corporates and industry players that judge an opportunity on strategic fit as well as financial return.",
          useful: "When a sale, partnership or transaction needs a strategic party at the table, or when strategic interest needs to be tested.",
          watch: "A strategic party may also be a competitor, so what is shared, and when, has to be controlled and agreed under confidentiality terms.",
        },
        {
          title: "Operators and institutions",
          text: "Operating partners, distributors, financial institutions and other organisations whose support a company needs to work in a market.",
          useful: "When entering a market where relationships decide who gets a hearing, or when a senior counterpart will only take a meeting from someone they know.",
          watch: "Institutions often have formal procedures and their own timetables; an introduction can open the conversation, but it does not shortcut approvals.",
        },
      ],
      process: [
        { title: "Scope", text: "A first conversation is usually followed by a non-disclosure agreement; who the company needs to reach, why, and the commercial terms are then agreed in writing, with a senior member of the team leading the work." },
        { title: "Mapping", text: "Who actually decides, who influences them, and which of them can properly be approached, set out in a stakeholder map." },
        { title: "Qualification", text: "Interest and fit are checked on both sides before anyone’s time is asked for, and introductions are made only where both sides have reason to meet." },
        { title: "Preparation", text: "A short, accurate brief for each side: who they are meeting, why it matters, and what a good outcome looks like." },
        { title: "The introduction", text: "Made personally, at the agreed level and with context, rather than as a forwarded email." },
        { title: "Follow-through", text: "Momentum is kept between conversations after the first meeting, until the relationship stands on its own." },
      ],
      needs: [
        "What the company wants from the introduction, and why now",
        "A short description of the company, its stage and its plans",
        "The counterparts or types of counterpart in mind, and any already approached",
        "Materials ready to share once confidentiality terms are agreed",
        "Who from the company will attend, and what they can decide",
        "Any sensitivities: competitors, conflicts or parties not to be approached",
      ],
      faqs: [
        {
          q: "What is the difference between an introduction and cold outreach?",
          a: "Cold outreach asks a stranger for attention. An introduction comes from someone the counterpart knows, with context on who the company is and why the meeting is worth their time. It does not guarantee interest, but it means the request is read and judged on its merits.",
        },
        {
          q: "Is every request turned into an introduction?",
          a: "No. Interest and fit are checked on both sides first, and an introduction is made only where both sides have reason to meet. Bringing a counterpart something that was never going to fit costs everyone, including the company asking.",
        },
        {
          q: "How does an introduction relate to a raise or a transaction?",
          a: "An introduction opens a conversation. A process, with prepared materials, a single timetable and the same information to every party, is what turns interest into terms. Where an introduction is part of a raise or a transaction, it should fit within that process rather than run alongside it.",
        },
      ],
      related: ["fundraising-advisory", "m-and-a-advisory", "cross-border-relationship-management"],
    },
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
    more: {
      methodsTitle: "Entry routes, explained",
      methods: [
        {
          title: "Distributor, agent or licensee",
          text: "A local business sells, represents or produces your product in the market, earning a margin, a commission or a royalty.",
          useful: "When you want to test demand or reach customers without building your own team or entity in the market.",
          watch: "You give up much of the control over pricing, positioning and the customer relationship, and exclusivity or termination terms agreed early can be hard to unwind.",
        },
        {
          title: "Joint venture",
          text: "A business owned with a local partner, who typically brings relationships, presence or capability while you bring the product, brand or know-how.",
          useful: "When the market rewards local standing, or when ownership rules or the scale of the opportunity make a partner necessary.",
          watch: "Governance, economics and exit terms decide whether the venture lasts, and they need to be agreed while both sides still agree.",
        },
        {
          title: "Direct presence",
          text: "Your own subsidiary, branch or office in the market, with your own people serving customers.",
          useful: "When the market matters for the long term and control of the customer, the brand and the operation matters most.",
          watch: "It is usually the most demanding route to set up, and licensing, hiring and the first customers have to be sequenced so that cost does not run ahead of revenue.",
        },
      ],
      process: [
        { title: "First conversation", text: "A senior member of the team discusses the market, the product and what entry has to achieve. A non-disclosure agreement usually follows before detailed information is shared." },
        { title: "Scope", text: "We agree the scope, responsibilities, deliverables and commercial terms, and set them out in writing before work starts." },
        { title: "Assessment", text: "Demand, competition, pricing and the practical route to customers in the target market are assessed against what the business can actually support." },
        { title: "Entry structure", text: "The routes open to the business are weighed for control, cost, speed and risk, and a recommended structure is set out with the reasons for it." },
        { title: "Partners", text: "Distributors, agents, local sponsors and operating partners are identified and qualified, and a short list is presented with the case for each." },
        { title: "Roadmap and introductions", text: "Licensing, set-up and approval steps are mapped with specialist advisers into a roadmap, and introductions are made to trade and logistics counterparties where the plan needs them." },
      ],
      needs: [
        "A description of the product, service or brand and how it is sold today",
        "The target market, the customers you want to reach and what entry has to achieve",
        "Pricing, margins and the terms you currently offer distributors, agents or licensees",
        "Any existing contacts, partners or approaches in the target market",
        "The budget, people and management time the business can commit to the market",
        "Existing agreements, intellectual property and registrations that may affect entry, such as exclusivity granted elsewhere",
      ],
      faqs: [
        {
          q: "What is the difference between a distributor and an agent?",
          a: "A distributor generally buys the product and resells it on its own account, taking the margin and much of the customer relationship. An agent generally finds customers and negotiates on your behalf for a commission, while you sell and invoice directly. The exact position depends on the contract and on local law, which is why the terms are settled with legal advisers.",
        },
        {
          q: "How do you choose between a partner and direct presence?",
          a: "It is a trade-off between control, cost, speed and risk. A partner usually brings faster access and local standing in exchange for control and margin; direct presence keeps control but takes more to build. Some companies start with one route and move to another as the market proves itself, which is easier if the first agreements allow for it.",
        },
        {
          q: "Who is the work for?",
          a: "Companies taking a product, service or brand between the Gulf, the United States and wider international markets, and businesses that need counterparties, financing or logistics partners for trade between the regions.",
        },
      ],
      related: ["joint-ventures-partnerships", "legal-advisory-coordination", "strategic-introductions"],
    },
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
    more: {
      methodsTitle: "Ways to organise advisers, explained",
      methods: [
        {
          title: "One firm across jurisdictions",
          text: "A single law firm, or a formal network of firms, advises in every jurisdiction the transaction touches under one engagement.",
          useful: "When one firm covers the relevant jurisdictions well and a single point of responsibility matters most.",
          watch: "Depth varies from office to office, and the strongest team in one jurisdiction may not be the strongest in another.",
        },
        {
          title: "Lead counsel with local counsel",
          text: "One firm leads the transaction and instructs firms in the other jurisdictions on specific points of their local law.",
          useful: "When most of the deal sits under one governing law and the other jurisdictions are needed for discrete questions, approvals or opinions.",
          watch: "Local counsel see only what they are sent, so instructions need to be precise and their findings carried back into the main documents.",
        },
        {
          title: "Specialists by workstream",
          text: "Separate advisers are chosen for each jurisdiction or discipline, whether legal, tax or regulatory, on the strength of their specialism.",
          useful: "When the deal turns on specialist questions in several places and the best adviser for each is not in the same firm.",
          watch: "Nobody is naturally responsible for the whole, so scopes, the timetable and the issues list need one coordinator or gaps and overlaps appear.",
        },
      ],
      process: [
        { title: "First conversation", text: "A senior member of the team leads from the first conversation, which is usually followed by a non-disclosure agreement. Confidential documents are shared once those terms are agreed, not through the website." },
        { title: "Scope", text: "Our scope, responsibilities, deliverables and commercial terms are agreed in writing before work starts." },
        { title: "Adviser selection", text: "Law firms, tax advisers and specialists are chosen for the jurisdiction, the deal type and the budget, and their scopes, fee arrangements and responsibilities are agreed before they begin." },
        { title: "Workplan", text: "One timetable is set across all workstreams, with dependencies made explicit and owners named." },
        { title: "Issue management", text: "Structuring, regulatory and documentation issues are logged, prioritised and closed, with trade-offs put to you clearly." },
        { title: "Closing", text: "Conditions precedent, approvals, signatures and funds flow are managed across time zones against a closing checklist, to a single closing." },
      ],
      needs: [
        "A description of the transaction, the parties and the jurisdictions involved",
        "The commercial terms agreed or under discussion, such as a term sheet or heads of terms",
        "The advisers already engaged, their scopes and their engagement terms",
        "The target timetable and any dates that cannot move",
        "Known legal, tax or regulatory questions, and any approvals the deal may need",
        "The budget for advisers and who on your side approves adviser costs",
      ],
      faqs: [
        {
          q: "What is the difference between coordinating advisers and giving advice?",
          a: "Legal and tax advice comes from the lawyers and tax advisers engaged to give it, and they remain responsible for it. Coordination is choosing those advisers, agreeing what each one does, running them to one timetable and making sure their work fits together. Our role is the second.",
        },
        {
          q: "What is local counsel?",
          a: "A law firm qualified in a particular jurisdiction, instructed to advise on that jurisdiction’s law within a transaction led from elsewhere. Local counsel typically cover questions such as local approvals, registrations and the enforceability of documents, and may be asked for formal legal opinions.",
        },
        {
          q: "Why agree adviser scopes before work starts?",
          a: "Each adviser is paid to perfect their own workstream, and most cost overruns come from work nobody asked for. Agreeing scopes, fee arrangements and responsibilities at the start is the simplest control there is, and the clearest way to see that nothing falls between workstreams.",
        },
      ],
      related: ["m-and-a-advisory", "joint-ventures-partnerships", "market-entry-trade-access"],
    },
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
    more: {
      methodsTitle: "Ways to run a cross-border mandate, explained",
      methods: [
        {
          title: "Principals deal directly",
          text: "Decision-makers on each side speak to each other and manage the relationship themselves, with advisers supporting their own side.",
          useful: "When the principals already know each other, share a working style and have time for regular contact.",
          watch: "Between visits, follow-up depends on whoever has time, and differences in expectation can go unnoticed until they reach the negotiating table.",
        },
        {
          title: "Advisers carry the relationship",
          text: "The lawyers and advisers on each side exchange documents and positions, and the principals step in for key decisions.",
          useful: "When the commercial terms are settled and what remains is mainly documentation.",
          watch: "Advisers optimise their own workstream, and a relationship carried only through documents can turn slow and adversarial, with principals hearing different accounts of events.",
        },
        {
          title: "A single point of contact",
          text: "One accountable person keeps the stakeholder map, the cadence and the reporting across both markets, and represents the client in meetings where it is not present.",
          useful: "When parties sit in different markets and time zones, decisions are made in one place and executed in another, or momentum is slipping.",
          watch: "It works only with clear authority and a direct line to the principals; a contact who cannot speak for the client becomes another layer rather than a link.",
        },
      ],
      process: [
        { title: "First conversation", text: "A senior member of the team discusses the mandate, the parties and where momentum is being lost. A non-disclosure agreement usually follows before detail is shared." },
        { title: "Scope", text: "The role, responsibilities, deliverables and commercial terms are agreed in writing before work starts, including what may be said and decided on the client’s behalf." },
        { title: "Stakeholder map", text: "Every party, their role, their interests and their decision-makers are mapped, and the map is kept current as the mandate evolves." },
        { title: "Cadence", text: "A rhythm of calls, updates and visits is agreed to fit the time zones and working weeks of both sides." },
        { title: "Alignment and presence", text: "Differences in expectation are surfaced early and resolved, and meetings are attended in the market where the client is not." },
        { title: "Reporting", text: "Short, regular written status reports let principals on both sides act without having been in every conversation." },
      ],
      needs: [
        "The mandate, its objective and the date it is working towards",
        "The parties involved, their roles and their decision-makers, as far as you know them",
        "The history so far: meetings held, positions taken and commitments made",
        "Who on your side has authority to decide, and what may be said on your behalf",
        "The advisers already involved on each side and what each is responsible for",
        "Who should receive updates, and in what form",
      ],
      faqs: [
        {
          q: "What does a single point of contact actually do?",
          a: "They keep the stakeholder map current, hold to an agreed cadence of calls, updates and visits, surface differences in expectation early, attend meetings in the market where you are not, and write short, regular status reports. The aim is that principals in both markets hear the same account of where things stand.",
        },
        {
          q: "How is this different from legal and advisory coordination?",
          a: "Legal and advisory coordination manages the advisers working on a transaction: their scopes, the workplan, the issues list and the closing. Relationship management looks after the counterparties and stakeholders themselves, keeping them informed, aligned and moving. On a cross-border transaction the two can run together.",
        },
        {
          q: "Why does momentum matter so much across borders?",
          a: "Parties in different markets and time zones meet rarely, and a decision taken in one place has to be carried out in another. In those gaps attention moves elsewhere, and a mandate tends to drift rather than fail. A regular cadence and written updates keep every party moving toward the same date.",
        },
      ],
      related: ["legal-advisory-coordination", "strategic-introductions", "market-entry-trade-access"],
    },
  }),
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/**
 * Services taken off the site for now (owner, 18 Nov 2026). Their content is kept above; remove a slug here to
 * publish the page again, and restore its links in src/data/menus.ts, src/data/site.ts (nav), the enquiry form's
 * service list and the redirects in vercel.json.
 */
export const PAUSED_SERVICES = ["market-entry-trade-access", "legal-advisory-coordination", "cross-border-relationship-management"];

/** The services shown on the site. */
export const services: Service[] = allServices.filter((s) => !PAUSED_SERVICES.includes(s.slug));
