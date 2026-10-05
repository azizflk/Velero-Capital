export type Sector = {
  slug: string;
  path: string;
  group: string;
  title: string;
  tagline: string;
  overview: string;
  role: string[];
  focusTitle: string;
  focusText: string;
  focus: string;
  capital: string;
  faqs: { q: string; a: string }[];
  /** the kinds of mandate we take on in this sector, shown as cards */
  types: { title: string; text: string }[];
  /** an illustrative mandate, written in general terms: not a completed transaction */
  mandate?: { title: string; situation: string; did: string; outcome: string; facts: { label: string; value: string }[] };
};

export type Group = { id: string; title: string; sectors: Sector[] };

type Raw = Omit<Sector, "path" | "group">;
const group = (id: string, title: string, sectors: Raw[]): Group => ({
  id,
  title,
  sectors: sectors.map((s) => ({ ...s, group: title, path: `/solutions/${s.slug}/` })),
});

export const groups: Group[] = [
  group("real-estate-infrastructure", "Real Estate & Infrastructure", [
    {
      slug: "commercial-real-estate",
      title: "Commercial Real Estate",
      tagline: "Development capital, joint-venture equity and transaction advice for developers, owners and investors.",
      overview: "Velero Capital advises developers, institutional investors and family offices across the whole real estate capital stack: project and development finance, senior and mezzanine debt, joint-venture and development equity, the monetisation of receivables and unsold inventory, and sell-side transactions. For investors, the same relationships open access to direct deals, joint ventures and fund positions alongside established operators.",
      role: ["Development and project capital for new schemes", "Joint-venture and development equity for land and build-out", "Senior, mezzanine and structured debt advice", "Sell-side, recapitalisation and M&A for stabilised assets", "Direct, joint-venture and fund access for investors"],
      focusTitle: "Capital that follows the asset’s life cycle",
      focusText: "A building needs different capital at each stage: equity to acquire the land, construction finance to build, and long-term capital once it is let. We structure each raise around where the asset sits in that cycle, and match it with investors who understand the stage.",
      focus: "Offices, logistics, residential-led and mixed-use",
      capital: "Joint-venture equity, development finance, recapitalisation",
      faqs: [
        { q: "Which real estate clients does Velero Capital serve?", a: "Developers, institutional investors, funds and family offices, from single-asset schemes to platforms running several developments at once." },
        { q: "What kinds of real estate transactions do you advise on?", a: "Project and development finance, senior and mezzanine debt, joint-venture equity, bulk inventory monetisation and sell-side mandates." },
      ],
      types: [
        { title: "Project capital", text: "Equity and debt raised together for a development." },
        { title: "Bulk inventory sale", text: "Unsold units across a portfolio placed in a single transaction." },
        { title: "Receivables financing", text: "Debt raised against sales receivables, secured through escrow." },
        { title: "Sell-side M&A", text: "The sale of a landmark asset, including distressed situations." },
      ],
      mandate: {
        title: "Project finance for a multi-phase development",
        situation: "A developer needs to fund construction across a multi-phase scheme. The financing has to release funds in step with construction milestones, on terms senior lenders will accept.",
        did: "We act as project-finance adviser: sizing the debt against the development’s cash flows, coordinating the lender group, and negotiating the milestone-linked drawdown and security terms.",
        outcome: "Committed finance aligned to the construction programme, so the developer can build out the scheme on funded, predictable terms.",
        facts: [{ label: "Role", value: "Project finance adviser" }, { label: "Sector", value: "Real estate" }, { label: "Capital", value: "Senior project debt" }, { label: "Structure", value: "Milestone-linked drawdowns" }],
      },
    },
    {
      slug: "infrastructure",
      title: "Infrastructure",
      tagline: "Project and structured capital for economic, social and digital infrastructure.",
      overview: "Velero Capital advises on project and structured finance for economic, social and digital infrastructure. We bring project-finance discipline to each mandate: structuring on the asset’s cash flows, drawdowns tied to construction milestones, and cover-ratio analysis that lenders can rely on.",
      role: ["Project and structured finance advice for infrastructure assets", "Equity and joint-venture capital for platforms", "Debt sized against contracted project cash flows", "Refinancing of operating assets", "Structuring informed by concession and offtake terms"],
      focusTitle: "Built around contracted cash flows",
      focusText: "What makes infrastructure financeable is the contract behind it: the concession, the offtake agreement, the availability payment. We start from those terms, build the capital structure they can support, and bring it to investors who hold for the long term.",
      focus: "Economic, social and digital infrastructure",
      capital: "Project equity, structured debt, refinancing",
      faqs: [
        { q: "What infrastructure does Velero Capital work on?", a: "Economic, social and digital infrastructure, from development and construction through to refinancing, using structures sized on the asset’s cash flows." },
        { q: "Do you advise on project finance?", a: "Yes. Project and structured finance is central to this work, including cover-ratio analysis, milestone-linked drawdowns and coordination between lenders." },
      ],
      types: [
        { title: "Project finance", text: "Debt sized on contracted cash flows." },
        { title: "Platform equity", text: "Equity and joint-venture capital for infrastructure platforms." },
        { title: "Refinancing", text: "Construction debt taken out once an asset is operating." },
        { title: "Concession structuring", text: "Capital structured around concession and offtake terms." },
      ],
    },
    {
      slug: "data-centers-digital-infrastructure",
      title: "Data Centers & Digital Infrastructure",
      tagline: "Equity, project capital and refinancing for hyperscale, edge and AI-infrastructure assets.",
      overview: "Data centres and digital infrastructure are among the most capital-hungry assets being built today. Velero Capital advises on project finance, equity and refinancing for hyperscale, edge and AI-infrastructure facilities, and gives investors access to platforms and single assets in the sector.",
      role: ["Construction and project capital for new capacity", "Equity and joint-venture capital for platforms and single assets", "Refinancing of stabilised facilities", "Capital for AI infrastructure and edge computing", "Structuring informed by power supply and customer contracts"],
      focusTitle: "Power, customers, then capital",
      focusText: "A data centre becomes financeable when two things are secured: power and a customer. We structure capital around the grid connection and the lease or offtake commitments, which is what lenders and equity investors underwrite first.",
      focus: "Hyperscale, colocation, edge and AI infrastructure",
      capital: "Project equity, construction finance, refinancing",
      faqs: [
        { q: "What data-centre assets do you work on?", a: "Hyperscale, edge and AI-infrastructure facilities, across construction, expansion, refinancing and the financing of stabilised assets." },
        { q: "Why does power matter so much?", a: "Secured power is the scarcest input in the sector and the first thing investors check. Without it, a site is land with a plan." },
      ],
      types: [
        { title: "Construction finance", text: "New capacity funded against secured power and customers." },
        { title: "Platform equity", text: "Equity for operators building several facilities." },
        { title: "Refinancing", text: "Long-term capital for stabilised facilities." },
        { title: "AI infrastructure", text: "Blended equity and debt for compute at scale." },
      ],
    },
  ]),
  group("financial-services", "Financial Services", [
    {
      slug: "financial-institutions",
      title: "Financial Institutions (FIG)",
      tagline: "Growth and structured capital for banks, fintech and financial platforms.",
      overview: "Velero Capital advises financial institutions and fintech businesses, including digital banks, payment and lending platforms and financial-infrastructure companies, on growth capital, venture debt and structured capital. We also connect qualified investors with leading private fintech platforms.",
      role: ["Growth equity for fintech and financial platforms", "Venture and structured debt advice", "Secondary access to leading private fintech companies", "Capital-structure advisory for regulated businesses", "Cross-border introductions to financial-sector investors"],
      focusTitle: "Capital that regulators and investors both accept",
      focusText: "In financial services, how a company is capitalised is part of the product. We help management choose between equity, debt and structured instruments with the regulatory treatment in view, then run the raise with investors who know the sector.",
      focus: "Banks, fintech, payments and lending platforms",
      capital: "Growth equity, structured capital, secondaries",
      faqs: [
        { q: "Which financial-institution clients do you serve?", a: "Digital banks, payment and lending platforms, and financial-infrastructure and fintech companies." },
        { q: "Can investors access private fintech platforms through Velero Capital?", a: "Approved investors can access secondary positions in leading private fintech and payments companies, subject to availability." },
      ],
      types: [
        { title: "Growth equity", text: "Equity for fintech and financial platforms." },
        { title: "Venture debt", text: "Runway extended without further dilution." },
        { title: "Structured capital", text: "Instruments designed with their regulatory treatment in view." },
        { title: "Secondary access", text: "Positions in leading private fintech companies, for approved investors." },
      ],
    },
    {
      slug: "financial-sponsors",
      title: "Financial Sponsors (FSG)",
      tagline: "Fund placement, GP-led solutions and co-investment for private equity, venture and credit funds.",
      overview: "Velero Capital works with private equity, venture, credit and real-asset managers. We introduce funds to institutional and private investors, and arrange co-investments and GP-led solutions for managers and their existing investors.",
      role: ["Primary fund placement for private equity, venture, credit and real-asset funds", "GP-led secondaries and fund restructurings", "Co-investment and direct-deal syndication", "Anchor and seed investor introductions", "Access to family offices and institutional allocators"],
      focusTitle: "Both sides of the fund relationship",
      focusText: "We work with managers who are raising, and with the investors who back them. That position lets us match a fund to allocators whose mandate it fits, and bring co-investments to investors who want exposure deal by deal.",
      focus: "Private equity, venture, credit and real-asset managers",
      capital: "Fund placement, GP-led secondaries, co-investment",
      faqs: [
        { q: "Which sponsors do you work with?", a: "Private equity, venture, credit, real-estate and impact managers, through primary placement, GP-led solutions and co-investment." },
        { q: "What is a GP-led secondary?", a: "A transaction in which the fund manager arranges liquidity for existing investors, often by moving assets into a new vehicle with fresh capital." },
      ],
      types: [
        { title: "Fund placement", text: "Funds introduced to institutional and private investors." },
        { title: "GP-led secondaries", text: "Liquidity for existing investors through a new vehicle." },
        { title: "Co-investment", text: "Direct deals syndicated alongside a lead sponsor." },
        { title: "Anchor investors", text: "Early commitments that set a fundraise in motion." },
      ],
    },
  ]),
  group("technology-media-telecom", "Technology, Media & Telecom", [
    {
      slug: "technology",
      title: "Technology",
      tagline: "Equity, structured capital and M&A for technology and enterprise-software businesses.",
      overview: "Velero Capital advises technology and enterprise-software businesses on equity, debt and AI-infrastructure capital. From growth rounds to large compute financings, we connect technology companies with strategic and financial investors, and give investors access to late-stage and pre-IPO positions.",
      role: ["Growth equity for technology and software companies", "Structured and venture debt advice for revenue-generating platforms", "Capital for AI infrastructure and compute", "Technology M&A and strategic transactions", "Late-stage and secondary access for investors"],
      focusTitle: "Late-stage, where the model is proven",
      focusText: "Our work in technology concentrates on companies that have found their market and need capital to scale, and on shareholders who need liquidity before a listing. That is where relationships decide who gets an allocation.",
      focus: "Enterprise software, AI and infrastructure",
      capital: "Growth equity, secondaries, M&A",
      faqs: [
        { q: "Which technology clients do you serve?", a: "Technology and enterprise-software businesses seeking equity, debt, AI-infrastructure capital or M&A, typically from growth stage through to pre-IPO." },
        { q: "Do you advise on AI-infrastructure financing?", a: "Yes. AI infrastructure usually needs equity to build the platform and debt to fund the compute, and we advise on both together." },
      ],
      types: [
        { title: "Growth rounds", text: "Equity for companies scaling a proven model." },
        { title: "AI-infrastructure capital", text: "Equity for the platform, debt for the compute." },
        { title: "Secondaries", text: "Liquidity for shareholders before a listing." },
        { title: "Technology M&A", text: "Acquisitions, sales and strategic combinations." },
      ],
    },
    {
      slug: "quantum-computing",
      title: "Quantum Computing",
      tagline: "Venture, growth and strategic capital for quantum hardware, software and services companies.",
      overview: "Velero Capital advises quantum-computing companies, across hardware, software, algorithms and quantum-as-a-service, on equity, venture and deep-tech infrastructure capital. Quantum computing has become a national priority in the Gulf and beyond, and it calls for patient capital released against technical milestones.",
      role: ["Venture and growth equity for hardware, software and algorithm companies", "Grant, sovereign and strategic-investor capital", "M&A, licensing and joint-venture structuring for quantum IP", "Cross-border access to deep-tech and corporate investors", "Investor materials that explain the technology plainly"],
      focusTitle: "Patient capital for long timelines",
      focusText: "Quantum companies are funded on milestones that take years to reach. The right investors understand the physics well enough to judge progress, and their capital can wait. We help companies find them and structure rounds around technical milestones.",
      focus: "Hardware, software, algorithms and enabling technologies",
      capital: "Venture and growth equity, strategic and sovereign capital",
      faqs: [
        { q: "How is a quantum-computing company financed?", a: "With a patient, milestone-linked blend: venture and growth equity, deep-tech grants, strategic and sovereign capital, and structured or venture debt for capital equipment." },
        { q: "Who invests in quantum computing?", a: "Sovereign wealth funds, national deep-tech and innovation programmes, specialist deep-technology venture funds, and strategic corporates in computing, defence, energy and telecoms." },
      ],
      types: [
        { title: "Milestone-linked equity", text: "Venture and growth rounds released against technical progress." },
        { title: "Strategic capital", text: "Corporate and sovereign investors as long-term partners." },
        { title: "Grants and programmes", text: "Non-dilutive funding from national deep-tech initiatives." },
        { title: "IP transactions", text: "Licensing, joint ventures and M&A around quantum IP." },
      ],
    },
    {
      slug: "blockchain",
      title: "Blockchain",
      tagline: "Capital and transaction advice for blockchain infrastructure and digital-asset businesses.",
      overview: "Blockchain has matured from experiment to infrastructure. Velero Capital advises custody, payments, tokenisation and infrastructure businesses on raising capital and on transactions, with the same diligence we apply to any private company.",
      role: ["Growth equity for blockchain infrastructure companies", "Capital for custody, payments and tokenisation platforms", "Secondary access to established private companies in the sector", "M&A and strategic-partnership advice", "Institutional-grade diligence on technology and governance"],
      focusTitle: "Infrastructure, not speculation",
      focusText: "Our interest is in the businesses that make digital assets usable by institutions: custody, settlement, compliance and the tokenisation of real assets. These are companies with revenue, customers and regulators, and we assess them on those terms.",
      focus: "Infrastructure, custody, payments and tokenisation",
      capital: "Growth equity, secondaries, M&A",
      faqs: [
        { q: "What kind of blockchain businesses do you work with?", a: "Companies building infrastructure: custody, payments, settlement, compliance and tokenisation platforms." },
        { q: "How do you assess blockchain companies?", a: "On revenue, customers, governance and regulatory standing, as with any private company, with technical diligence alongside." },
      ],
      types: [
        { title: "Growth equity", text: "Equity for infrastructure companies with revenue and customers." },
        { title: "Tokenisation platforms", text: "Capital for businesses bringing real assets on chain." },
        { title: "Secondaries", text: "Positions in established private companies in the sector." },
        { title: "Strategic partnerships", text: "M&A and partnerships with financial institutions." },
      ],
    },
    {
      slug: "media-telecom-entertainment",
      title: "Media, Telecom & Entertainment",
      tagline: "Growth capital, structured financing and M&A for media, telecom and digital-services businesses.",
      overview: "Velero Capital advises media, digital-services, telecom and entertainment businesses on debt and growth capital, and gives qualified investors secondary access to leading private platforms in the sector.",
      role: ["Growth capital for media and digital-services companies", "Structured and debt financing advice", "Secondary access to leading private platforms", "M&A and strategic-partner support", "Cross-border access to media and technology investors"],
      focusTitle: "Financing content, networks and audiences",
      focusText: "Whether the asset is a content library, a subscriber base or a network, its value rests on recurring revenue and rights. We structure capital around those, and advise on the partnerships and combinations that scale them.",
      focus: "Media, streaming, telecom and digital services",
      capital: "Growth capital, structured financing, M&A",
      faqs: [
        { q: "Which media and telecom clients do you serve?", a: "Operating businesses in media, digital services, telecom and entertainment seeking debt or growth capital, and investors seeking secondary access to leading private platforms." },
        { q: "Can investors access private media and technology platforms?", a: "Approved investors can access secondary positions in leading private platforms, subject to availability." },
      ],
      types: [
        { title: "Debt facilities", text: "Growth funded without diluting ownership." },
        { title: "Growth capital", text: "Equity for media and digital-services companies." },
        { title: "Secondary access", text: "Positions in leading private platforms." },
        { title: "Strategic partners", text: "M&A, licensing and distribution partnerships." },
      ],
    },
    {
      slug: "innovation-economy",
      title: "Innovation Economy",
      tagline: "Growth equity, venture debt and fund placement for high-growth companies and the investors behind them.",
      overview: "Velero Capital serves the innovation economy: high-growth companies and the funds that back them. We advise founders on growth capital and venture debt, introduce venture and growth funds to institutional investors, and connect the two sides of the ecosystem.",
      role: ["Growth equity for high-growth companies", "Venture debt advice for revenue-generating businesses", "Fund placement for venture and growth managers", "Pre-IPO secondary access for qualified investors", "Fundraise readiness and investor materials"],
      focusTitle: "From growth round to liquidity",
      focusText: "Companies stay private for longer than they used to. More value is created before a listing, and more liquidity is needed before one. We help companies raise late rounds, and help shareholders and investors transact in the years before an exit.",
      focus: "Growth-stage companies and venture managers",
      capital: "Growth equity, venture debt, secondaries",
      faqs: [
        { q: "Who do you serve in the innovation economy?", a: "High-growth companies seeking growth capital or venture debt, and venture and growth-equity funds seeking institutional investors." },
        { q: "What is pre-IPO secondary access?", a: "The purchase of existing shares from founders, employees or early investors in a company before it lists." },
      ],
      types: [
        { title: "Growth equity", text: "Late rounds for companies with revenue." },
        { title: "Venture debt", text: "Non-dilutive capital for revenue-generating businesses." },
        { title: "Fund placement", text: "Venture and growth funds introduced to institutions." },
        { title: "Pre-IPO secondaries", text: "Existing shares bought before a listing." },
      ],
    },
  ]),
  group("energy-power-resources", "Energy, Power & Resources", [
    {
      slug: "oil-gas",
      title: "Oil & Gas",
      tagline: "Capital and M&A for mid-market oil, gas and energy-services businesses.",
      overview: "Velero Capital advises mid-market oil, gas and energy-services businesses on capital and M&A. Our focus is the services, supply-chain and midstream layer, where companies need structured capital and transaction advice instead of balance-sheet lending from a major bank.",
      role: ["Growth and structured capital for energy-services companies", "Growth equity and strategic capital", "Buy-side and sell-side M&A across the value chain", "Capital for energy-transition and diversification plans", "Access to strategic and financial energy investors"],
      focusTitle: "Focused on the Gulf energy value chain",
      focusText: "The Gulf is the centre of global hydrocarbon production. Around the majors sits a deep ecosystem of services, supply-chain, midstream and equipment businesses that need capital and transaction advice. This mid-market layer is where a senior-led advisory firm adds more than a balance-sheet bank.",
      focus: "Services, supply chain and midstream",
      capital: "Growth capital, structured financing, M&A",
      faqs: [
        { q: "Which oil and gas clients do you serve?", a: "Mid-market services, supply-chain and midstream companies seeking capital or M&A, as opposed to the national and international majors." },
        { q: "Do you work on energy-transition mandates?", a: "Yes. We advise hydrocarbon-linked businesses on capital for diversification and the energy transition, alongside our renewable-energy coverage." },
      ],
      types: [
        { title: "Growth capital", text: "Structured capital for services and supply-chain companies." },
        { title: "M&A", text: "Buy-side and sell-side across the value chain." },
        { title: "Succession", text: "Ownership transitions for founder- and family-owned businesses." },
        { title: "Transition capital", text: "Funding for diversification as the energy mix changes." },
      ],
    },
    {
      slug: "power-utilities",
      title: "Power & Utilities",
      tagline: "Structured capital for power, water and utility assets and platforms.",
      overview: "Velero Capital advises power, water and utilities businesses on structured capital and financing strategy, with the contract and the counterparty at the centre of every structure.",
      role: ["Project and structured capital for power and water assets", "Equity and joint-venture capital for utility platforms", "Structuring informed by offtake and power-purchase agreements", "Refinancing of operating generation and water assets", "Access to strategic and financial utility investors"],
      focusTitle: "The offtake contract comes first",
      focusText: "Utility financing lives or dies on the offtake: the power-purchase or water-purchase agreement, the counterparty and the tariff. We work from those terms, build the capital structure they can carry, and place it with investors seeking stable, long-term returns.",
      focus: "Generation, transmission, water and district utilities",
      capital: "Project equity, structured debt, refinancing",
      faqs: [
        { q: "Which power and utilities assets do you cover?", a: "Generation, water, and transmission and distribution assets and platforms, financed through project debt, equity and refinancing." },
        { q: "What does offtake-informed structuring mean?", a: "The amount and type of capital a project can raise depends on its sale contract. We size the financing to that contract." },
      ],
      types: [
        { title: "Project capital", text: "Debt and equity for generation and water assets." },
        { title: "Platform equity", text: "Capital for utility platforms and joint ventures." },
        { title: "Refinancing", text: "Long-term capital for operating assets." },
        { title: "Offtake structuring", text: "Financing sized to the purchase agreement." },
      ],
    },
    {
      slug: "renewable-energy",
      title: "Renewable Energy",
      tagline: "Equity, debt and fund capital for clean energy, storage and climate technology.",
      overview: "Velero Capital advises renewable-energy, storage and climate-technology businesses on equity, debt and fund capital. From battery and storage ventures to clean-energy platforms and climate funds, we structure the capital that pays for the transition.",
      role: ["Growth equity for clean-energy and storage companies", "Project and corporate debt advice for renewable assets", "Fund placement for climate and clean-energy managers", "Blended equity-and-debt structures for capital-intensive technology", "Cross-border access to strategic and financial climate investors"],
      focusTitle: "Matching capital to technology risk",
      focusText: "A solar farm with a signed contract and a battery company with a new chemistry need very different investors. We separate what is infrastructure from what is venture, and structure each raise so the cost of capital reflects the real risk.",
      focus: "Solar, wind, storage and climate technology",
      capital: "Growth equity, project debt, fund placement",
      faqs: [
        { q: "Which renewable-energy clients do you serve?", a: "Clean-energy platforms, battery and storage ventures, and climate-technology businesses and funds." },
        { q: "Do you work with climate and clean-energy funds?", a: "Yes. We introduce clean-technology managers to institutional investors, alongside financings for individual companies." },
      ],
      types: [
        { title: "Growth equity", text: "Equity for clean-energy and storage companies." },
        { title: "Project debt", text: "Financing for contracted renewable assets." },
        { title: "Blended structures", text: "Equity and debt combined for capital-intensive technology." },
        { title: "Fund placement", text: "Climate and clean-energy funds introduced to institutions." },
      ],
    },
    {
      slug: "metals-mining",
      title: "Metals & Mining",
      tagline: "M&A, equity and structured capital for metals, mining and resource businesses.",
      overview: "Velero Capital advises mining operators, resource developers and their investors on M&A, equity and structured capital, across international markets and through the commodity cycle.",
      role: ["Buy-side and sell-side M&A for mining and metals assets", "Growth and project equity for resource development", "Structured and project capital for capital-intensive assets", "Access to strategic and financial resource investors", "Cross-border transaction structuring and execution"],
      focusTitle: "Funding the gap before production",
      focusText: "Between discovery and the first shipment, a mine consumes capital and produces none. We help companies bridge that gap with equity, structured capital and strategic partners, and advise on transactions when assets change hands.",
      focus: "Base and precious metals, critical minerals",
      capital: "Project equity, structured capital, M&A",
      faqs: [
        { q: "Which metals and mining clients do you serve?", a: "Mining operators, resource developers and their investors." },
        { q: "Do you handle cross-border mining transactions?", a: "Yes. We run cross-border mandates, connecting assets and operators with strategic and financial investors internationally." },
      ],
      types: [
        { title: "Asset M&A", text: "Buying and selling mines and resource assets." },
        { title: "Development equity", text: "Capital to take a project to production." },
        { title: "Structured capital", text: "Project debt and offtake-linked financing." },
        { title: "Strategic partners", text: "Introductions to industrial and financial investors." },
      ],
    },
    {
      slug: "chemicals",
      title: "Chemicals",
      tagline: "Capital and M&A for specialty chemicals, petrochemicals and materials businesses.",
      overview: "Velero Capital advises specialty-chemicals, petrochemicals and materials businesses on capital and M&A, with a focus on the mid-market companies downstream of the national champions.",
      role: ["Growth and structured capital for chemicals and materials businesses", "Growth equity and strategic capital", "Buy-side and sell-side M&A", "Capital for downstream and specialty diversification", "Access to strategic and financial sector investors"],
      focusTitle: "The mid-market of a global petrochemicals hub",
      focusText: "The Gulf is one of the world’s largest producers of petrochemicals. Downstream of the national champions sits a substantial mid-market of specialty, downstream and materials businesses. These companies need structured capital, expansion finance and transaction advice that the majors’ bankers are not focused on.",
      focus: "Specialty chemicals, downstream products and materials",
      capital: "Growth capital, strategic investment, M&A",
      faqs: [
        { q: "Which chemicals clients do you serve?", a: "Mid-market specialty-chemicals, downstream petrochemicals and advanced-materials businesses." },
        { q: "Why chemicals in the Gulf?", a: "The region is one of the world’s largest petrochemicals hubs, with a deep downstream and specialty ecosystem of mid-market companies." },
      ],
      types: [
        { title: "Expansion capital", text: "Funding for new capacity and technology." },
        { title: "Strategic investment", text: "Partners that bring markets as well as capital." },
        { title: "M&A", text: "Acquisitions and sales in specialty and downstream." },
        { title: "Diversification", text: "Capital for the move from commodity to specialty." },
      ],
    },
  ]),
  group("industrials-mobility", "Industrials & Mobility", [
    {
      slug: "industrials",
      title: "Industrials",
      tagline: "Debt, equity and M&A for industrial and manufacturing businesses.",
      overview: "Velero Capital advises industrial and manufacturing businesses on debt, equity and M&A. Many are established, profitable and privately owned, with capital needs tied to expansion, succession or consolidation.",
      role: ["Corporate and working-capital financing advice", "Growth and expansion equity", "Buy-side and sell-side M&A", "Refinancing and capital-structure advisory", "Cross-border transaction structuring"],
      focusTitle: "Expansion, succession, consolidation",
      focusText: "Most industrial mandates begin with one of three situations: a company needs capital to expand, an owner is planning succession, or a sector is consolidating. Each calls for a different mix of debt, equity and M&A, and we advise on all three.",
      focus: "Manufacturing, engineering and industrial services",
      capital: "Corporate financing, growth equity, M&A",
      faqs: [
        { q: "Which industrials clients do you serve?", a: "Industrial and manufacturing businesses, served with debt, equity and M&A advice through a senior-led process." },
        { q: "What kinds of transactions do you advise on?", a: "From working-capital and growth facilities to larger equity raises and M&A, sized to the business and the deal." },
      ],
      types: [
        { title: "Debt facilities", text: "Working-capital and growth facilities matched to cash flow." },
        { title: "Expansion equity", text: "Capital for new capacity and new markets." },
        { title: "M&A", text: "Acquisitions, sales and consolidation." },
        { title: "Refinancing", text: "Existing facilities reviewed and restructured." },
      ],
    },
    {
      slug: "business-services",
      title: "Business Services",
      tagline: "Growth capital, financing and M&A for B2B, professional and digital-services businesses.",
      overview: "Velero Capital advises B2B, outsourcing, professional and digital-services businesses on growth capital, debt and M&A.",
      role: ["Growth and working-capital financing advice", "Growth equity and buy-and-build capital", "Buy-side and sell-side M&A", "Financing against recurring revenue and contracts", "Access to strategic and financial services investors"],
      focusTitle: "Built for asset-light, recurring-revenue businesses",
      focusText: "Services businesses are asset-light and cash-generative, which makes them attractive but harder to finance against traditional security. We structure capital around the quality and durability of recurring revenue and contracts, which is what unlocks debt and growth capital for these companies.",
      focus: "B2B, outsourcing, professional and digital services",
      capital: "Growth equity, contract-backed financing, M&A",
      faqs: [
        { q: "Which business-services clients do you serve?", a: "B2B services, outsourcing, professional-services and digital-services businesses." },
        { q: "How are asset-light businesses financed?", a: "Through structures backed by recurring revenue and contracts instead of physical assets, presented to lenders and investors who understand that model." },
      ],
      types: [
        { title: "Growth equity", text: "Capital for organic growth and acquisitions." },
        { title: "Contract-backed financing", text: "Debt raised against recurring revenue." },
        { title: "Buy-and-build", text: "A programme of acquisitions backed by an investor." },
        { title: "Exits", text: "Sales to strategic and financial buyers." },
      ],
    },
    {
      slug: "transportation-logistics",
      title: "Transportation & Logistics",
      tagline: "Capital and M&A for transport, logistics and mobility businesses.",
      overview: "Velero Capital advises transport, logistics and mobility businesses on capital and M&A, from fleet operators to logistics-technology platforms.",
      role: ["Asset and fleet financing advice", "Growth equity for logistics and mobility platforms", "Buy-side and sell-side M&A", "Capital for logistics technology and last-mile businesses", "Access to strategic and financial sector investors"],
      focusTitle: "At the crossroads of global logistics",
      focusText: "The UAE sits at the centre of global trade, from its ports and airports to a fast-growing last-mile and logistics-technology sector. Around the large operators is a mid-market of transport, fleet and logistics businesses that need asset finance, growth capital and transaction advice.",
      focus: "Freight, fleet, last-mile and logistics technology",
      capital: "Asset finance, growth equity, M&A",
      faqs: [
        { q: "Which transport and logistics clients do you serve?", a: "Freight, fleet, last-mile, logistics and mobility businesses, including logistics-technology platforms." },
        { q: "Why transport and logistics in the Gulf?", a: "The UAE is one of the world’s main logistics and re-export hubs, with a deep mid-market of transport, fleet and logistics-technology companies." },
      ],
      types: [
        { title: "Fleet finance", text: "Financing secured against vehicles and equipment." },
        { title: "Growth equity", text: "Capital for logistics and mobility platforms." },
        { title: "M&A", text: "Acquisitions and sales across freight and logistics." },
        { title: "Logistics technology", text: "Capital for last-mile and technology-led businesses." },
      ],
    },
    {
      slug: "maritime-shipping",
      title: "Maritime & Shipping",
      tagline: "Asset finance, growth capital and M&A for shipping, ports and marine-services businesses.",
      overview: "Velero means sailing vessel, so this sector is close to home. We advise shipping, ports and marine-services businesses on ship finance, capital and M&A.",
      role: ["Vessel and asset financing advice", "Growth equity for shipping and ports platforms", "Buy-side and sell-side M&A", "Capital for marine services and port logistics", "Access to strategic and financial maritime investors"],
      focusTitle: "A leading global maritime hub",
      focusText: "The UAE is one of the world’s foremost maritime centres, from its container ports to a broad ecosystem of shipping, marine-services and port-logistics businesses. This mid-market needs ship finance, structured capital and transaction advice built around the sector’s assets and its cycle.",
      focus: "Shipping, ports and marine services",
      capital: "Asset finance, growth equity, M&A",
      faqs: [
        { q: "Which maritime clients do you serve?", a: "Shipowners and operators, ports and terminals, and marine-services and logistics companies." },
        { q: "Why maritime in the UAE?", a: "The UAE is a leading maritime and re-export hub, home to major ports and a deep mid-market of shipping, marine-services and logistics companies." },
      ],
      types: [
        { title: "Ship finance", text: "Financing secured against vessels." },
        { title: "Growth equity", text: "Capital for shipping and ports platforms." },
        { title: "M&A", text: "Acquisitions and sales of fleets and marine businesses." },
        { title: "Port logistics", text: "Capital for marine services and terminals." },
      ],
    },
  ]),
  group("consumer-healthcare-sports", "Consumer, Healthcare & Sports", [
    {
      slug: "consumer-retail",
      title: "Consumer & Retail",
      tagline: "Growth capital, cross-border M&A and joint ventures for consumer and retail businesses.",
      overview: "Velero Capital advises consumer brands and retailers on growth capital, cross-border M&A and joint ventures, including the partnerships that take a brand into a new market.",
      role: ["Growth equity for consumer and retail brands", "Working-capital and growth financing advice", "Cross-border M&A and joint ventures", "Market-entry and expansion capital", "Strategic-partner and franchise structuring"],
      focusTitle: "Taking brands across borders",
      focusText: "Entering a new market is as much about the partner as the capital. We help brands choose between a joint venture, a franchise and direct investment, find the right counterpart, and raise what the expansion needs.",
      focus: "Consumer brands, retail and e-commerce",
      capital: "Growth equity, joint ventures, M&A",
      faqs: [
        { q: "Which consumer and retail clients do you serve?", a: "Consumer brands and retailers seeking growth capital, cross-border M&A or joint-venture partners." },
        { q: "Do you help with market entry?", a: "Yes. Structuring a joint venture or franchise and finding the local partner are often the core of the mandate." },
      ],
      types: [
        { title: "Growth financing", text: "Capital for a roll-out, without ceding control." },
        { title: "Joint ventures", text: "Local partnerships for entering new markets." },
        { title: "Cross-border M&A", text: "Acquisitions and sales across jurisdictions." },
        { title: "Franchise structuring", text: "Franchise and distribution models for expansion." },
      ],
    },
    {
      slug: "food-beverage",
      title: "Food & Beverage",
      tagline: "Growth capital, cross-border M&A and joint ventures for food, beverage and agri-food businesses.",
      overview: "Velero Capital advises food, beverage and agri-food operators, brands and platforms on growth capital, cross-border M&A and joint ventures.",
      role: ["Growth equity for food and beverage brands", "Cross-border M&A and joint ventures", "Working-capital and growth financing advice", "Franchise, distribution and market-entry structuring", "Access to strategic and financial sector investors"],
      focusTitle: "Distribution decides the outcome",
      focusText: "A strong product still needs shelves, routes and local knowledge. We advise on the distribution agreements, franchises and joint ventures that carry a brand into new markets, and on the capital behind them.",
      focus: "Brands, producers, distributors and agri-food",
      capital: "Growth equity, joint ventures, M&A",
      faqs: [
        { q: "Which food and beverage clients do you serve?", a: "Food, beverage and agri-food operators, brands and platforms." },
        { q: "Do you handle cross-border transactions?", a: "Yes. Joint ventures and acquisitions in this sector often span several countries, and aligning partners across them is part of the work." },
      ],
      types: [
        { title: "Growth equity", text: "Capital for brands and producers." },
        { title: "Joint ventures", text: "Partnerships aligned across several countries." },
        { title: "Cross-border M&A", text: "Acquisitions spanning jurisdictions." },
        { title: "Distribution", text: "Franchise and distribution structuring for market entry." },
      ],
    },
    {
      slug: "health-care",
      title: "Health Care",
      tagline: "Equity, growth capital and fund placement for healthcare providers, platforms and investors.",
      overview: "Velero Capital advises healthcare providers, platforms and healthcare-focused funds on equity, growth capital and fund placement.",
      role: ["Growth and expansion equity for providers and platforms", "Fund placement for healthcare-focused managers", "Structured and growth financing for capital projects", "Buy-and-build and M&A support", "Cross-border access to healthcare investors"],
      focusTitle: "Scaling care, responsibly",
      focusText: "Hospitals, clinics and health platforms expand through new facilities and acquisitions, and both need capital and careful integration. We advise on funding that growth without compromising the quality the business depends on.",
      focus: "Providers, health platforms and medical technology",
      capital: "Growth equity, fund placement, M&A",
      faqs: [
        { q: "Which healthcare clients do you serve?", a: "Healthcare providers, platforms and healthcare-focused funds." },
        { q: "Do you place healthcare funds?", a: "Yes. We work with managers raising healthcare-focused funds." },
      ],
      types: [
        { title: "Growth equity", text: "Capital for providers and platforms to expand." },
        { title: "Fund placement", text: "Healthcare funds introduced to institutions." },
        { title: "Capital projects", text: "Structured financing for facilities and equipment." },
        { title: "Buy-and-build", text: "Acquisition programmes with integration planned in." },
      ],
    },
    {
      slug: "sports",
      title: "Sports",
      tagline: "Capital, M&A and structuring for clubs, rights-holders and sports businesses.",
      overview: "Velero Capital advises clubs, rights-holders and sports businesses, and the investors behind them, on capital, M&A and structuring, with an understanding of the media, sponsorship and rights economics beneath the surface.",
      role: ["Growth and structured equity for clubs and sports platforms", "Acquisition and structured financing for sports assets", "Buy-side and sell-side M&A and investment structuring", "Rights, media and sponsorship monetisation", "Access to strategic and financial sports investors"],
      focusTitle: "A strategic priority across the Gulf",
      focusText: "Sport has become a strategic investment theme across the Gulf, from club and league ownership to facilities, events, rights and sports technology. The economics are distinctive, blending capital with media, sponsorship and rights value, and they call for advisers who understand both sides.",
      focus: "Clubs, rights-holders, facilities and sports technology",
      capital: "Structured equity, acquisition finance, M&A",
      faqs: [
        { q: "Which sports clients do you serve?", a: "Clubs, rights-holders, facilities and sports-technology businesses, and the investors backing them." },
        { q: "Why sport as a sector in the Gulf?", a: "Sport is a strategic investment and diversification priority across the region, which creates demand for advisers who understand club, rights, media and sponsorship economics." },
      ],
      types: [
        { title: "Club investment", text: "Growth and structured equity for clubs and platforms." },
        { title: "Acquisition finance", text: "Financing for the purchase of sports assets." },
        { title: "Rights monetisation", text: "Media, sponsorship and rights structured as capital." },
        { title: "M&A", text: "Buy-side and sell-side advice, and investment structuring." },
      ],
    },
  ]),
  group("public-sector-government", "Public Sector & Government", [
    {
      slug: "public-sector",
      title: "Public Sector",
      tagline: "Financing and capital strategy for sovereign, state-linked and public-purpose entities.",
      overview: "Velero Capital advises on sovereign, state-linked and public-sector financing, and works with sovereign and state-linked investors on access to private markets.",
      role: ["Structured financing advice for state-linked platforms", "Engagement with sovereign wealth and state-linked investors", "Financing for public-purpose infrastructure and technology", "Capital-structure and financing strategy", "Private-market access for public investors"],
      focusTitle: "Public purpose, institutional standards",
      focusText: "Public-sector mandates carry obligations beyond return: transparency, policy alignment and long horizons. We structure and present each transaction to meet those standards as well as the commercial ones.",
      focus: "Sovereign, state-linked and public-purpose entities",
      capital: "Structured financing, sovereign capital, co-investment",
      faqs: [
        { q: "What public-sector transactions do you advise on?", a: "Sovereign-adjacent and state-linked financings, public-purpose infrastructure and technology platforms, and structured capital for state-linked entities." },
        { q: "What makes public-sector mandates different?", a: "Longer horizons, policy considerations and higher standards of transparency." },
      ],
      types: [
        { title: "Structured financing", text: "Senior debt for sovereign-adjacent platforms." },
        { title: "Sovereign capital", text: "Engagement with sovereign and state-linked investors." },
        { title: "Public-purpose projects", text: "Financing for infrastructure and technology." },
        { title: "Financing strategy", text: "Capital-structure advice for state-linked entities." },
      ],
    },
  ]),
];

export const sectors: Sector[] = groups.flatMap((g) => g.sectors);

/** Questions that apply to every sector, shown after the sector's own. */
export const commonFaqs = [
  { q: "Which industries does Velero Capital serve?", a: "Twenty-four sectors in seven groups: real estate and infrastructure; financial services; technology, media and telecom; energy, power and resources; industrials and mobility; consumer, healthcare and sports; and the public sector." },
  { q: "How is this different from Capital and Services?", a: "Capital and Services describe what we do: equity, debt, M&A, secondaries and execution. Solutions describes who we serve. Most mandates combine both, a sector view and the right capital product." },
  { q: "How are fees structured?", a: "Terms are agreed in writing before any work begins, and reflect the size, scope and complexity of the mandate." },
  { q: "How long does a mandate take?", a: "It depends on how ready the business is for diligence and on the structure. We set out a timetable at the start and keep to it." },
  { q: "What is the process for a mandate?", a: "A short, confidential scoping conversation and a non-disclosure agreement. We then structure the requirement, prepare the materials, run the process with investors and lenders, and negotiate through to close, with a senior team member leading at every step." },
  { q: "Where does Velero Capital work?", a: "We are headquartered in Dubai, with offices in San Francisco, Los Angeles and Berlin, and we run mandates across borders." },
  { q: "How do I start a conversation?", a: "Use the contact form or email us. Every mandate is led by a senior team member from the first conversation." },
  { q: "Is my information kept confidential?", a: "Yes. Confidential information is handled under the engagement terms and any non-disclosure agreement in place." },
];
