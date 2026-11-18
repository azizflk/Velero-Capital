export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "contact@velero.capital";

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
      { label: "Joint Ventures & Partnerships", to: "/services/joint-ventures-partnerships/" },
      { label: "Strategic Introductions", to: "/services/strategic-introductions/" },
    ],
  },
  {
    label: "Company",
    to: "/company/",
    children: [
      { label: "Inside Velero Capital", to: "/company/" },
      { label: "Investor Access", to: "/investor-access/" },
      { label: "Submit an Opportunity", to: "/submit-an-opportunity/" },
      { label: "Account Verification", to: "/verification/" },
      { label: "Contact", to: "/contact-us/" },
      { label: "FAQ", to: "/faq/" },
      { label: "Legal & Disclosures", to: "/legal/" },
    ],
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/107078065/" },
];

export const offices = [
  { region: "United Arab Emirates", address: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, UAE" },
  { region: "San Francisco", address: "San Francisco, CA, USA" },
];

/**
 * Firm figures: the single source of truth for every number shown on the site.
 * Confirm with the firm before each update.
 * The total aggregates three kinds of activity, so it is larger than the two advisory lines beneath it.
 */
export const STATS_ASOF = "29 September 2026";
export const stats = [
  { value: 350, prefix: "$", suffix: "M+", title: "Raised, placed and advised", note: "aggregate transaction value across all mandates since 2023" },
  { value: 65, prefix: "$", suffix: "M+", title: "Capital raised", note: "for companies and funds, as fundraising adviser" },
  { value: 50, prefix: "$", suffix: "M+", title: "M&A advised", note: "buy-side and sell-side mandates" },
  { value: 3000, prefix: "", suffix: "+", title: "Investor network", note: "family offices, institutions and LPs met on mandates" },
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

export const differentiators = [
  {
    title: "Transparent Terms",
    text: "Structure, costs and reporting are set out in writing before any commitment, and investors see the same information we have reviewed.",
  },
  {
    title: "Relationships, Not Platforms",
    text: "Opportunities come through the founders, sponsors and shareholders who lead and own them, and investors are known to us by mandate, not by sign-up.",
  },
  {
    title: "Selectivity",
    text: "We decline most of what we see. What is shared has been reviewed against the strategy, the counterparties, the information available and the terms.",
  },
];

/** Official email domains used by the Account Verification page. Keep this list current. */
export const officialAccounts = {
  emailDomains: ["velero.capital"],
};
function officialAccountsDomains() { return officialAccounts.emailDomains.join(" and "); }

/**
 * Frequently asked questions, grouped. Every answer restates something the site already says elsewhere
 * (About, Investor Access, Submit an Opportunity, Legal, Verification, the firm figures); add nothing new here
 * without the firm confirming it. Shown in full on /faq/, a selection on the Company page.
 */
export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

const fmt = (s: (typeof stats)[number]) => `${s.prefix}${s.value.toLocaleString("en-US")}${s.suffix}`;

export const faqGroups: FaqGroup[] = [
  {
    id: "how-it-works",
    title: "How Velero works",
    items: [
      {
        q: "So what does Velero Capital actually do?",
        a: "For investors, it sources and reviews private-market opportunities through founder, sponsor and shareholder relationships, and introduces them to family offices and institutions whose mandate they fit. For founders, companies and sponsors, it advises on their own transactions and introduces suitable opportunities to the investors they fit.",
      },
      {
        q: "Where does Velero Capital work? Do I need to be in Dubai or San Francisco?",
        a: `No. Velero Capital is headquartered in Dubai, at ${offices[0].address.replace(/, Dubai, UAE$/, "")}, with an office in San Francisco. It works with investors in Dubai, San Francisco and beyond, and on cross-border mandates between the Gulf, the United States and wider international markets.`,
      },
      {
        q: "How do investors take part in a transaction?",
        a: "Participation is structured to suit the transaction: a direct holding, a co-investment alongside a lead sponsor, or a dedicated deal-by-deal vehicle. The structure, costs and reporting are set out in writing before any commitment.",
      },
      {
        q: "Is there a platform or a public list of opportunities?",
        a: "No. Velero Capital does not operate a platform or a public listing. Each opportunity is shared individually, after review and under confidentiality terms, with the investors whose mandate it fits.",
      },
      {
        q: "How do secondary transactions work?",
        a: "Rather than buying new shares in a funding round, investors acquire existing stakes — from founders, employees and early investors, or fund interests from limited partners seeking liquidity. We source the position, run diligence, and manage transfer approvals through closing.",
      },
      {
        q: "What does it cost?",
        a: "There is no charge for applying. For companies, the scope, responsibilities, deliverables and commercial terms of any engagement are agreed in writing before work starts. For investors, the costs of each transaction are set out in writing before any commitment.",
      },
      {
        q: "What has Velero Capital done so far?",
        a: `${fmt(stats[0])} raised, placed and advised since 2023, in aggregate transaction value across all mandates; ${fmt(stats[1])} of capital raised for companies and funds as fundraising adviser; ${fmt(stats[2])} of M&A advised on buy-side and sell-side mandates; and an investor network of ${fmt(stats[3])} family offices, institutions and LPs met on mandates. Figures as at ${STATS_ASOF}.`,
      },
    ],
  },
  {
    id: "should-i-apply",
    title: "Should I apply?",
    items: [
      {
        q: "Who can access opportunities through Velero Capital?",
        a: "Family offices, institutional investors, fund managers and other professional or accredited investors who meet the eligibility rules of their jurisdiction. Opportunities are shared only with eligible investors whose mandate they fit, on a deal-by-deal basis.",
      },
      {
        q: "Can an individual investor apply?",
        a: "Yes, if you are an individual professional or accredited investor under the rules of your jurisdiction. Private-market investments are only suitable for professional, qualified or accredited investors.",
      },
      {
        q: "Is my company too early?",
        a: "Not necessarily. Velero Capital works with earlier-stage companies as well as late-stage and pre-IPO ones, both on raising capital and on advisory. Tell us your stage in the application and we will tell you whether there is a fit.",
      },
      {
        q: "Can companies that have already raised money apply?",
        a: "Yes. The application asks for your traction and existing investors, and the late-stage and pre-IPO rounds we work on are raised by companies that already have investors.",
      },
      {
        q: "Does it make sense to apply if we are not raising money?",
        a: "Yes. Alongside capital raising, Velero Capital advises on M&A, corporate development, cap table and equity, valuation and modelling, joint ventures and partnerships, and strategic introductions.",
      },
      {
        q: "Do you only work with certain sectors?",
        a: "No single sector. The industries we follow most closely are artificial intelligence, robotics, financial technology, healthcare and biotech, space technology and real estate, and our Solutions pages cover seven groups of sectors, from real estate and infrastructure to the public sector.",
      },
      {
        q: "Can an adviser or introducer apply on someone else’s behalf?",
        a: "Yes. Advisers, placement agents and introducers can submit an opportunity; the application asks for your role and your authority. We work with introducers acting with the written authority of a principal.",
      },
      {
        q: "Will I hear back, even if it is a no?",
        a: "Yes. We reply to every submission, whatever the outcome. Many opportunities are not the right fit for us, and when that is the case we will let you know promptly. It is never a judgement on your business, only on how closely it matches what we do.",
      },
    ],
  },
  {
    id: "applying",
    title: "Applying",
    items: [
      {
        q: "How do I apply?",
        a: "Use the application form on the home page or the contact page and choose whether you are an investor, a founder, or a sponsor or intermediary; you are asked only the questions that apply. You do not need an account.",
      },
      {
        q: "What should a submission include?",
        a: "A short summary is enough to start: what the opportunity is, the company or asset and where it is based, the size sought and the timing, the information available now, your role and authority, and any transfer restrictions, consents or confidentiality already in place.",
      },
      {
        q: "What do I need to provide as an investor?",
        a: "A short form is enough: who you are, the kind of investor you represent and what you are looking for. We do not ask for financial or identity documents at this stage; the verification that a transaction and the law require comes later, before specific opportunities are discussed.",
      },
      {
        q: "Can I send confidential documents?",
        a: "Please do not send confidential documents through the website. Once confidentiality terms are agreed, we tell you how to share them.",
      },
      {
        q: "What happens after I apply?",
        a: "A senior member of the team reviews the objective, your authority, the jurisdiction, the timing, the size and how ready the information is. If there is a fit, we arrange a first conversation, usually followed by a non-disclosure agreement; where work goes ahead, its scope and terms are agreed in writing.",
      },
      {
        q: "Is anything guaranteed once I apply?",
        a: "No. Not every mandate will have a matching opportunity at any given time, access to an opportunity or an allocation is never guaranteed, and Velero Capital does not promise a return, a price, a timing or a liquidity event. Nothing on the website, and no application through it, creates an engagement or an obligation on either side.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts and sign-in",
    items: [
      {
        q: "Do I need an account to apply?",
        a: "No. The form on the home page and the contact page works without one. With an account you can save a draft, come back to it, and follow your application’s progress.",
      },
      {
        q: "How do I sign in?",
        a: "With your email address and a one-time code sent to it, or with Google. There is no password; the same steps create an account the first time.",
      },
      {
        q: "I did not receive my sign-in code. What should I do?",
        a: "Check your spam folder, and make sure the address is typed correctly. The code works once and expires after an hour; you can ask for a new one from the same screen after a minute.",
      },
      {
        q: "Is my draft saved?",
        a: "Yes. In your account, answers are saved as you type, and nothing is sent to us until you submit.",
      },
      {
        q: "Can I edit an application after submitting it?",
        a: "No, a submitted application is fixed. To add or correct something, email us; the address is on the contact page.",
      },
      {
        q: "How do I follow my application?",
        a: "In your account, each application shows its stage: received, under review, call arranged or closed.",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust and safety",
    items: [
      {
        q: "How can I check that an email really comes from Velero Capital?",
        a: `Use the Account Verification page before acting on any message. Official email comes only from the ${officialAccountsDomains()} domain, and Velero Capital never asks for bank, card or identity-document details through its website.`,
      },
      {
        q: "Does the website give investment, legal or tax advice?",
        a: "No. Nothing on the website is a recommendation, an offer or a solicitation, and you should take your own professional advice before making any investment decision. Private-market investments carry significant risk, including the loss of capital.",
      },
      {
        q: "How is my personal data handled?",
        a: "The privacy policy explains what personal data and cookies the website uses, how they are used and your rights. Analytics and embedded media stay off until you accept them.",
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    items: [
      {
        q: "Why the name Velero?",
        a: "Velero means sailing vessel in Spanish. The name reflects the firm’s role in navigating private markets and connecting capital with select investment opportunities.",
      },
      {
        q: "What principles guide Velero Capital?",
        a: "Selectivity, integrity, discretion, discipline, alignment and global reach: we share only what has been reviewed and fits a mandate, disclose terms, costs and conflicts in writing, hold mandates and information in confidence, review every opportunity the same way, bring investors in on terms no worse than the lead sponsor’s, and work across the Gulf and the United States.",
      },
    ],
  },
];

/** Every question in one list, in page order (used for the AI text files). */
export const faqs: Faq[] = faqGroups.flatMap((g) => g.items);

/** The selection shown on the Company page, which links to the full list. */
export const faqHighlights: Faq[] = [
  "So what does Velero Capital actually do?",
  "Where does Velero Capital work? Do I need to be in Dubai or San Francisco?",
  "Who can access opportunities through Velero Capital?",
  "How do investors take part in a transaction?",
  "Is my company too early?",
  "Does it make sense to apply if we are not raising money?",
  "How do I apply?",
  "Is anything guaranteed once I apply?",
].map((q) => faqs.find((f) => f.q === q)!);

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

