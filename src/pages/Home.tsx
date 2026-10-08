import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { Section, Cols } from "@/components/Layout";
import LogoWall from "@/components/LogoWall";
import VeleroStory from "@/components/VeleroStory";
import ScrollLine from "@/components/ScrollLine";
import MatchEngine from "@/components/MatchEngine";
import { coInvestors, realEstateInvestors } from "@/data/site";
import { investments } from "@/data/investments";
import { useTitle } from "@/lib/useTitle";

function Hero() {
  return (
    <section className="wrap">
      <div className="grid grid-cols-1 items-end gap-10 py-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-12 lg:gap-8">
        <div className="fade-in order-2 lg:col-span-7 lg:col-start-6 lg:self-center">
          <VeleroStory className="mx-auto w-full max-w-md text-ink lg:max-w-none" />
        </div>
        <div className="fade-in order-1 lg:col-span-5 lg:col-start-1">
          <div className="eyebrow">Velero Capital</div>
          <h1 className="display mt-1 text-5xl sm:text-6xl lg:text-[72px]">Access is the edge.</h1>
          <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-ink/80">We connect family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate — and advise founders and companies on fundraising, M&amp;A and corporate finance.</p>
          <p className="mt-3 text-[13px] font-semibold">Private-market opportunities. Institutional discipline.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button to="/investor-access/" variant="blue">Investor Access</Button><Button to="/capital/">Explore Our Strategies</Button><Button to="/submit-an-opportunity/">Submit an Opportunity</Button></div>
        </div>
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
      <div className="mt-12"><Stats /></div>
      <div className="mt-10"><LogoWall caption="Access to Rounds Led by Leading VCs" rows={coInvestors} /></div>
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
  useTitle("Home");
  return (
    <div className="relative">
      <Hero />
      <div className="wrap [&>section:first-child]:border-t [&>section:first-child]:pt-10" data-scroll-sections>
        <WhyUs />
        <Approach />
        <Sectors />
        <RealEstate />
        <Portfolio />
        <CTA />
      </div>
      <ScrollLine />
    </div>
  );
}
