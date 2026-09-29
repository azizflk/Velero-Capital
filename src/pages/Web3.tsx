import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Button from "@/components/Button";
import { Section, Heading } from "@/components/Section";
import { LogoMarquee } from "@/components/LogoGrid";
import { FeatureCard, Icons } from "@/components/Cards";
import { partners } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const services = [
  { title: "OTC Investment", text: "Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved.", to: "/otc-investment/", icon: Icons.coins },
  { title: "Investment Focus", text: "Early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth.", to: "/strategic-investments/", icon: Icons.rocket },
  { title: "Web3 & Crypto Marketing", text: "We help you get noticed — plain and simple. Our team’s all about building hype, growing real communities, and making sure the right people are talking about your project.", to: "/contact-us/", icon: Icons.trend },
];

export default function Web3() {
  useTitle("Web3 Services", "Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 projects.");
  return (
    <>
      <Hero title={<>We Don’t Just Talk Web3. <span className="gradient-text">WE BUILD IT.</span></>} text="Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 projects. Every opportunity we bring is curated, vetted, and shared only within our closed investor circle. Only approved projects and investors can participate.">
        <Button to="/contact-us/">Apply Now</Button>
      </Hero>

      <Section className="!pt-0"><Stats /></Section>

      <Section>
        <Heading title="Partnering with top-tier companies in the industry" />
        <div className="space-y-2">
          <LogoMarquee logos={partners.CEX} />
          <LogoMarquee logos={partners.DEX} />
          <LogoMarquee logos={partners.Chains} />
        </div>
      </Section>

      <Section>
        <Heading title="Reliable Digital Asset Solutions" text="Our services are designed to boost your market performance." />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s) => <FeatureCard key={s.title} {...s} />)}
        </div>
      </Section>

      <Section>
        <Heading title="Our Ticket" text="Velero Capital helps projects raise capital ranging from $50,000 to $10,000,000 through the following strategies:" />
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="OTC Acquisitions" text="Strategic off-market investments in high-liquidity digital assets, acquired at discounted rates" icon={Icons.coins} to="/otc-investment/" />
          <FeatureCard title="Venture Capital" text="Seed and Pre-Seed stage investments prior to TGE (Token Generation Event)" icon={Icons.rocket} to="/strategic-investments/" />
        </div>
      </Section>

      <CTA />
    </>
  );
}
