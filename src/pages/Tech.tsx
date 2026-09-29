import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Button from "@/components/Button";
import { Section, Heading } from "@/components/Section";
import { FeatureCard, Icons } from "@/components/Cards";
import { useTitle } from "@/lib/useTitle";

const categories = [
  { title: "Artificial Intelligence (AI)", items: ["AI (General)", "AI Infrastructure", "Software Layer (AI applications)"] },
  { title: "Robotics", items: ["Autonomous Systems", "Industrial & Service Robotics"] },
  { title: "Biotechnology", items: ["Biotech", "Health Tech"] },
  { title: "Space Technology", items: ["Space Tech", "Aerospace Innovation"] },
  { title: "Financial Technology", items: ["Fintech", "Blockchain / DeFi"] },
  { title: "Healthcare Technology", items: ["Digital Health", "MedTech"] },
];
const offers = [
  { title: "Startup Scouting", text: "Discover pre-screened early-stage startups across AI, fintech, SaaS, Web3, and more.", icon: Icons.search },
  { title: "Cross-Border Access", text: "Tap into emerging ecosystems through our investor network in the US, UAE, and Singapore.", icon: Icons.globe },
  { title: "Capital Matching", text: "We align startups with angel investors, syndicates, and institutional capital ready to deploy.", icon: Icons.coins },
  { title: "Advisory Support", text: "Founders benefit from tailored mentorship, pitch refinement, and go-to-market strategies.", icon: Icons.users },
];

export default function Tech() {
  useTitle("Tech Investments", "We connect high-potential tech startups with a global network of forward-thinking investors, from Dubai to Silicon Valley.");
  return (
    <>
      <Hero title={<>Scale without limits — on your terms. <span className="gradient-text">You bring the vision, we bring the execution.</span></>} text="We connect high-potential tech startups with a global network of forward-thinking investors. From Dubai to Silicon Valley, our syndicate unlocks exclusive access to vetted early-stage ventures at the intersection of technology, scalability, and impact.">
        <Button to="/contact-us/">Get Started</Button>
      </Hero>

      <Section className="!pt-0">
        <p className="mx-auto max-w-3xl text-center text-muted">Whether you’re a founder raising capital or an investor seeking the next breakout opportunity, we bridge the gap with curated deal flow, due diligence support, and strategic advisory.</p>
      </Section>

      <Section>
        <Heading title="Tech Categories" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.title} className="card p-7">
              <h3 className="text-lg font-medium">{c.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {c.items.map((i) => <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="What We Offer" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => <FeatureCard key={o.title} {...o} />)}
        </div>
      </Section>

      <CTA />
    </>
  );
}
