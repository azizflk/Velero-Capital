import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { Section, Cols } from "@/components/Layout";
import LogoWall from "@/components/LogoWall";
import VeleroStory from "@/components/VeleroStory";
import ScrollLine from "@/components/ScrollLine";
import MatchEngine from "@/components/MatchEngine";
import { coInvestors, realEstateInvestors } from "@/data/site";
import { investments } from "@/data/investments";
import { menus } from "@/data/menus";
import { Link } from "react-router-dom";
import { useTitle } from "@/lib/useTitle";
import ApplicationForm from "@/components/ApplicationForm";
import { PORTAL_ON, loginFor } from "@/lib/portal";

function Hero() {
  return (
    <section className="wrap">
      {/* Two rows on wide screens: the headline beside the drawing, then the firm figures closing the first screen. */}
      <div className="grid grid-cols-1 items-end gap-10 py-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-8 lg:pb-6">
        <div className="fade-in order-3 lg:order-2 lg:col-span-7 lg:col-start-6 lg:self-center">
          {/* The drawing takes the height the figures leave, so they stay above the fold on short screens too. */}
          <div className="mx-auto lg:mr-0" style={{ maxWidth: "max(22rem, calc((100vh - 23.5rem) * 1.096))" }}>
            <VeleroStory className="mx-auto w-full max-w-md text-ink lg:max-w-none" />
          </div>
        </div>
        <div className="fade-in order-1 lg:col-span-5 lg:col-start-1">
          <div className="eyebrow">Velero Capital</div>
          <h1 className="display mt-1 text-5xl sm:text-6xl lg:text-[72px]">Access is the edge.</h1>
          <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-ink/80">We connect family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate — and advise founders and companies on fundraising, M&amp;A and corporate finance.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button to="/investor-access/" variant="blue">Investor Access</Button><Button to="/capital/">Explore Our Strategies</Button><Button to="/submit-an-opportunity/">Submit an Opportunity</Button></div>
        </div>
        <div className="order-2 lg:order-3 lg:col-span-12" data-hero-stats><Stats hero /></div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <Section eyebrow="Why Us" title="Where Access Meets Execution">
      <div className="grid gap-x-8 gap-y-10 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="display text-2xl">Direct Access</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">Opportunities sourced through founder, sponsor and shareholder relationships across late-stage, secondary and real estate markets, not through listing platforms.</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="display text-2xl">Institutional Discipline</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">Every opportunity is reviewed before it is shared: the company or asset, the terms and the counterparties. Structure, costs and reporting are set out in writing for each transaction.</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="display text-2xl">A Qualified Investor Network</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">Family offices and institutional investors in Dubai, San Francisco and beyond, each with a defined mandate, so that what we share is relevant and handled with discretion.</p>
        </div>
      </div>
      <div className="mt-12"><LogoWall caption="Access to Rounds Led by Leading VCs" rows={coInvestors} /></div>
    </Section>
  );
}

function Approach() {
  return (
    <Section eyebrow="Our Approach" title="Access. Structure. Execution">
      <div className="grid items-start gap-10 grid-cols-1 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          {[
            { title: "Relationship-Sourced Access", text: "Select opportunities in late-stage and pre-IPO rounds, secondary transactions and institutional real estate, sourced through the people who lead and own them." },
            { title: "Clear Structures", text: "Participation is structured to suit the transaction: a direct holding, a co-investment alongside a lead sponsor, or a dedicated vehicle, with terms and costs agreed before any commitment." },
            { title: "A Mandate-Led Network", text: "Family offices and institutions tell us what they look for; opportunities are shared only with eligible investors whose mandate they fit." },
          ].map((it) => (
            <div key={it.title} className="border-t border-rule pt-5">
              <h3 className="display text-2xl">{it.title}</h3>
              <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink/80">{it.text}</p>
            </div>
          ))}
          <div className="pt-2"><Button to="/investor-access/" variant="blue">Investor Access</Button></div>
        </div>
        <div className="lg:col-span-5">
          <MatchEngine className="mx-auto max-w-md lg:-mt-12" />
        </div>
      </div>
    </Section>
  );
}

function Sectors() {
  return (
    <Section eyebrow="Investment Strategies" title="Late-Stage. Secondaries. Real Estate.">
      <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-ink/80">Three strategies, and the structures through which investors participate in them. Each opportunity is reviewed on its own terms and shared only where it fits an investor’s mandate.</p>
      <Cols cols={2} items={investments.map((i) => ({ title: i.label, text: i.summary, to: i.path }))} />
      <div className="mt-10"><Button to="/capital/">Explore Our Strategies</Button></div>
    </Section>
  );
}

function RealEstate() {
  return (
    <Section eyebrow="Real Estate" title="The Institutional Real Estate Market">
      <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-ink/80">Institutional real estate sits beside late-stage companies and secondaries in what we offer investors. We follow the platforms that define the asset class across logistics, residential, office and retail, and look for transactions with sponsors of that standard.</p>
      <LogoWall caption="Access to Deals with Leading Real Estate Investors" rows={realEstateInvestors} />
    </Section>
  );
}

function Portfolio() {
  const sectors = [
    { title: "Artificial Intelligence", text: "Foundation models, AI infrastructure and the application layer built on top of them." },
    { title: "Robotics", text: "Autonomous systems, industrial automation and service robotics." },
    { title: "Financial Technology", text: "Payments, infrastructure and the platforms reshaping financial services." },
    { title: "Healthcare & Biotech", text: "Digital health, medical technology and biotechnology." },
    { title: "Space Technology", text: "Launch, satellites and aerospace innovation." },
    { title: "Real Estate", text: "Logistics, residential, hospitality and mixed-use assets with established operators." },
  ];
  return (
    <Section eyebrow="Sector Focus" title="The Industries We Follow">
      <p className="mb-10 max-w-2xl text-[14px] leading-relaxed text-ink/80">The private companies and assets our investors ask for most, and where our sourcing is focused.</p>
      <Cols cols={3} items={sectors} />
      <div className="mt-10"><Button to="/portfolio/">Industries and investor landscape</Button></div>
    </Section>
  );
}

function ServicesHome() {
  const groups = menus.Services.groups;
  const pick = (titles: string[]) => groups.filter((g) => titles.includes(g.title)).flatMap((g) => g.items);
  const columns = [
    { title: "Corporate finance", intro: "For companies and shareholders preparing a raise, a transaction or a decision that depends on the numbers.", items: pick(["Capital raising", "Transactions", "Equity", "Analysis"]) },
    { title: "Cross-border", intro: "For businesses and investors working between the Gulf, the United States and wider international markets.", items: pick(["Partnerships", "Cross-border"]) },
  ];
  return (
    <Section eyebrow="Advisory Services" title="Corporate Finance And Cross-Border Advisory">
      <p className="mb-10 max-w-2xl text-[14px] leading-relaxed text-ink/80">Alongside investor access, we advise founders, companies and sponsors on their own transactions. Every engagement is senior-led, scoped in writing and run with the discipline of an institutional process.</p>
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {columns.map((c) => (
          <div key={c.title}>
            <div className="eyebrow">{c.title}</div>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/70">{c.intro}</p>
            <ul className="mt-5">
              {c.items.map((it) => (
                <li key={it.to} className="border-t border-rule">
                  <Link to={it.to} className="group flex items-baseline justify-between gap-6 py-3.5">
                    <span>
                      <span className="display block text-xl group-hover:text-blue">{it.label}</span>
                      {it.desc && <span className="mt-0.5 block text-[13px] text-ink/70">{it.desc}</span>}
                    </span>
                    <span aria-hidden className="shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-blue">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3"><Button to="/services/">Explore our services</Button><Button to="/contact-us/?role=founder&goal=services">Discuss an engagement</Button></div>
    </Section>
  );
}

/** Who applies, and what happens after. Every statement here restates the Investor Access, Submit an Opportunity and Contact pages. */
const applicants = [
  { title: "Investors", text: "Family offices, institutions, fund managers and other professional or accredited investors who want to see opportunities that fit their mandate." },
  { title: "Founders", text: "Companies raising a late-stage or pre-IPO round, arranging liquidity for existing holders, or looking for advice on fundraising, M&A, cap table or valuation." },
  { title: "Sponsors and intermediaries", text: "Shareholders, real estate sponsors, fund managers and advisers introducing a company, a position or a transaction, with the authority to do so." },
];
const next = [
  { title: "We review your application", text: "A senior member of the team looks at the objective, your authority, the jurisdiction, the timing, the size and how ready the information is." },
  { title: "A first conversation", text: "If there is a fit, we arrange a call on the commercial objective, the timetable and the information needed for a proper review." },
  { title: "Terms in writing", text: "Confidentiality is agreed before specific opportunities or documents are shared, and any engagement is set out in writing before work starts or a commitment is made." },
];

function Apply() {
  return (
    <section id="apply" className="scroll-mt-24 border-t border-rule py-10">
      <div className="eyebrow mb-1">Apply</div>
      <h2 className="display text-4xl sm:text-5xl">Apply to Velero Capital</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-lg text-[15px] leading-relaxed text-ink/80">Velero Capital accepts applications from investors, founders and sponsors. Applications are reviewed as they arrive, each one by a senior member of the team, and opportunities are shared only with eligible investors whose mandate they fit.</p>

          <h3 className="display mt-10 text-2xl">Who should apply</h3>
          <ul className="mt-3">
            {applicants.map((a) => (
              <li key={a.title} className="border-t border-rule py-3.5">
                <div className="text-[14px] font-semibold">{a.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/75">{a.text}</p>
              </li>
            ))}
          </ul>

          <h3 className="display mt-10 text-2xl">What happens after you apply</h3>
          <ol className="mt-3">
            {next.map((s, i) => (
              <li key={s.title} className="flex gap-4 border-t border-rule py-3.5">
                <span className="display w-7 shrink-0 text-xl text-blue">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[14px] font-semibold">{s.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink/75">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-[13px] leading-relaxed text-ink/70">We decline most of what we see, and we say so promptly. A decline is not a judgement on the business, only on fit with what we do. Nothing here is an offer, and access or an allocation is never guaranteed; see <Link to="/legal/" className="textlink">legal and disclosures</Link>.</p>
          <p className="mt-4 text-[13px] leading-relaxed text-ink/70">
            Not ready to apply? Read how <Link to="/investor-access/" className="textlink">investor access</Link> works, or how to <Link to="/submit-an-opportunity/" className="textlink">submit an opportunity</Link>.
            {PORTAL_ON && <> To save a draft and follow your application’s progress, <Link to={loginFor("/account/")} className="textlink">apply with an account</Link>.</>}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-lg border border-rule bg-white/60 p-5 sm:p-8">
            <p className="mb-6 text-[13px] leading-relaxed text-ink/70">Choose the option that describes you and we will ask only what is relevant. Please do not send confidential documents through this form.</p>
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="rule pb-44 pt-16 text-center sm:pb-52 sm:pt-24">
      <h2 className="display mx-auto max-w-3xl text-4xl sm:text-5xl">Private-Market Opportunities. Institutional Discipline.</h2>
      <p className="mx-auto mt-4 max-w-md text-[13px] text-ink/70">Late-stage, pre-IPO, secondary and real estate opportunities, shared with eligible investors after review.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/investor-access/" variant="blue">Investor Access</Button><Button to="/submit-an-opportunity/">Submit an Opportunity</Button></div>
    </section>
  );
}

export default function Home() {
  useTitle("Home", "Velero Capital gives family offices and institutions access to late-stage companies, secondaries and real estate, and advises on fundraising and M&A.");
  return (
    <div className="relative">
      <Hero />
      <div className="wrap [&>section:first-child]:border-t [&>section:first-child]:pt-10" data-scroll-sections>
        <WhyUs />
        <Approach />
        <Sectors />
        <RealEstate />
        <Portfolio />
        <ServicesHome />
        <Apply />
        <CTA />
      </div>
      <ScrollLine />
    </div>
  );
}
