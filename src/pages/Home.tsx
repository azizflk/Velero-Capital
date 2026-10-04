import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { Section, Cols } from "@/components/Layout";
import LogoBelt from "@/components/LogoBelt";
import VeleroStory from "@/components/VeleroStory";
import ScrollLine from "@/components/ScrollLine";
import TeamSlideshow from "@/components/TeamSlideshow";
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
          <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-ink/80">We connect family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate.</p>
          <div className="mt-6 flex gap-3"><Button to="/contact-us/">Get in Touch</Button><Button to="/capital/">How we invest</Button></div>
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
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">Sourcing proprietary opportunities through founder, sponsor and shareholder relationships across late-stage, secondary and real estate markets.</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="display text-2xl">Institutional Execution</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">We operate with speed, discretion, and certainty of capital — enabling participation in competitive transactions where timing and execution determine allocation.</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="display text-2xl">For Global Investors</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">We work with family offices and institutional investors from Dubai to Silicon Valley and Berlin, prioritizing long-term relationships and meaningful capital deployment.</p>
        </div>
      </div>
      <div className="mt-12"><Stats /></div>
      <div className="mt-10">
        <div className="eyebrow mb-3">Co-invest alongside leading venture firms</div>
        <div className="border-y border-rule">
          <LogoBelt items={coInvestors[0]} direction="left" />
          <div className="rule" />
          <LogoBelt items={coInvestors[1]} direction="right" />
        </div>
      </div>
    </Section>
  );
}

function Approach() {
  return (
    <Section eyebrow="Our Approach" title="Access. Structure. Execution">
      <div className="grid items-start gap-10 grid-cols-1 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          {[
            { title: "Proprietary Access", text: "Select access to late-stage venture rounds, growth equity, secondary transactions and institutional real estate." },
            { title: "Direct & Efficient Structures", text: "Flexible investment vehicles — from direct holdings to deal-by-deal syndicates — designed to minimize friction and align incentives." },
            { title: "Global Investor Network", text: "Connecting family offices, institutions and qualified investors to vetted opportunities shared only within our closed investor circle." },
          ].map((it) => (
            <div key={it.title} className="border-t border-rule pt-5">
              <h3 className="display text-2xl">{it.title}</h3>
              <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink/80">{it.text}</p>
            </div>
          ))}
          <div className="pt-2"><Button to="/contact-us/">Get in Touch</Button></div>
        </div>
        <div className="lg:col-span-5">
          <TeamSlideshow />
        </div>
      </div>
    </Section>
  );
}

function Sectors() {
  return (
    <Section eyebrow="Where We Invest" title="Sectors Of Conviction">
      <Cols cols={2} items={investments.map((i) => ({ title: i.label, text: i.summary, to: i.path }))} />
    </Section>
  );
}

function RealEstate() {
  return (
    <Section eyebrow="Real Estate" title="Alongside The Leading Real Estate Investors">
      <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-ink/80">Institutional real estate sits beside our private company positions. We track and co-invest alongside the platforms that define the asset class across logistics, residential, office and retail.</p>
      <div className="border-y border-rule">
        <LogoBelt items={realEstateInvestors[0]} direction="left" />
        <div className="rule" />
        <LogoBelt items={realEstateInvestors[1]} direction="right" />
      </div>
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
    <Section eyebrow="Our Portfolio" title="Companies Shaping The Future">
      <p className="mb-10 max-w-2xl text-[14px] leading-relaxed text-ink/80">Curated access to late-stage, pre-IPO and secondary opportunities — connecting global investors with the companies and assets shaping the future.</p>
      <Cols cols={3} items={sectors} />
      <div className="mt-10"><Button to="/portfolio/">Request Full Portfolio</Button></div>
    </Section>
  );
}

function CTA() {
  return (
    <section className="rule py-16 text-center sm:py-24">
      <h2 className="display mx-auto max-w-3xl text-4xl sm:text-5xl">Direct Access to the Private Companies and Assets Shaping the Future</h2>
      <p className="mx-auto mt-4 max-w-md text-[13px] text-ink/70">Late-stage, pre-IPO, secondary and real estate opportunities, shared with approved investors.</p>
      <div className="mt-8"><Button to="/contact-us/">Get in Touch</Button></div>
    </section>
  );
}

export default function Home() {
  useTitle("Home");
  return (
    <div className="relative">
      <Hero />
      <div className="wrap" data-scroll-sections>
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
