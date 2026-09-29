import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { Section, Heading } from "@/components/Section";
import { LogoGrid, LogoMarquee } from "@/components/LogoGrid";
import { FeatureCard, Icons } from "@/components/Cards";
import { differentiators, faqs, partners, services, trustedExchanges } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

export default function Home() {
  useTitle("Home");
  return (
    <>
      <Hero title="Guiding Bold Ideas to Safe Harbors" text="We connect top-tier investors with high-growth Tech and Web3 innovators.">
        <Button to="/contact-us/">Join Us</Button>
        <Button to="/web3-services/" variant="ghost">Explore Web3</Button>
      </Hero>

      <Ticker />

      <Section className="!pt-12">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">Our Trusted Exchanges</p>
        <LogoMarquee logos={trustedExchanges} />
      </Section>

      <Section className="!pt-4"><Stats /></Section>

      <Section>
        <Heading title="Reliable Digital Asset Solutions" text="Our services are designed to boost your market performance." />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <FeatureCard key={s.title} title={s.title} text={s.text} to={s.to} icon={[Icons.coins, Icons.rocket, Icons.chart][i]} />
          ))}
        </div>
        <div className="mt-8 text-center"><Button to="/contact-us/">Get Started</Button></div>
      </Section>

      <Section>
        <Heading title="Our Partners Empower Your Growth" />
        <div className="space-y-12">
          {(Object.keys(partners) as (keyof typeof partners)[]).map((k) => (
            <div key={k}>
              <h3 className="mb-4 text-xl font-medium">{k}</h3>
              <LogoGrid logos={partners[k]} />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="What Sets Us Apart" />
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <FeatureCard key={d.title} title={d.title} text={d.text} icon={[Icons.eye, Icons.users, Icons.bolt][i]} />
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="Frequently asked questions" />
        <FAQ items={faqs} />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/web3-services/" className="card group relative overflow-hidden p-8 transition-all hover:border-cyan/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan/15 blur-3xl transition-opacity group-hover:opacity-100" />
            <h3 className="text-2xl font-medium">Web3 <span className="text-muted">·</span> Powering the decentralised future</h3>
            <p className="mt-3 text-muted">We back bold builders in crypto, DeFi, and blockchain infra — from token design to investor-ready launches.</p>
            <span className="mt-6 inline-block text-sm text-cyan">Explore Web3 →</span>
          </Link>
          <Link to="/tech-investments-part/" className="card group relative overflow-hidden p-8 transition-all hover:border-cyan/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo/25 blur-3xl" />
            <h3 className="text-2xl font-medium">Tech <span className="text-muted">·</span> Backing deep tech that shapes tomorrow</h3>
            <p className="mt-3 text-muted">AI, robotics, health tech, and beyond — we partner early, scale fast, and connect you with the capital that counts.</p>
            <span className="mt-6 inline-block text-sm text-cyan">Explore Tech →</span>
          </Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
