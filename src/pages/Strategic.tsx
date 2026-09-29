import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Button from "@/components/Button";
import { Section, Heading } from "@/components/Section";
import { FeatureCard, Icons } from "@/components/Cards";
import { useTitle } from "@/lib/useTitle";

const focus = ["DeFi", "GameFi", "RWA", "NFT & Metaverse", "Data & AI x Crypto"];
const support = ["Seed and Pre-Seed Funding", "Crypto Market Analysis", "Strategic Investment Guidance", "Tailored Exit Strategies", "Marketing Boost"];
const terms = [
  { title: "Stage", text: "Early entry from initial ticket to Series A, prioritizing value over valuation" },
  { title: "Investment Size", text: "$50k – $10,000,000" },
  { title: "Geographic Reach", text: "Global" },
];
const value = [
  { title: "Capital Access", text: "Plug into our trusted investor network for pre-seed to post-TGE rounds", icon: Icons.coins },
  { title: "Fundraising Support", text: "Pitch deck feedback, round structuring, and investor comms", icon: Icons.users },
  { title: "Token Strategy", text: "Advisory on tokenomics, unlock schedules, and incentives", icon: Icons.layers },
  { title: "Listings", text: "Tier 1, 2 Exchange connections, OTC partners.", icon: Icons.trend },
];

export default function Strategic() {
  useTitle("Strategic Investments", "Velero Capital bridges founders and investors in Web3, partnering with early-stage blockchain ventures from $50k to $10M.");
  return (
    <>
      <Hero title="Strategic Investments" text="Velero Capital bridges founders and investors in Web3." compact>
        <Button to="/contact-us/">Pitch Us</Button>
      </Hero>

      <Section className="!pt-0">
        <Heading title="Accelerating Early-Stage Blockchain Growth" text="Velero Capital partners with early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth. We work closely with a global syndicate of VCs, angels, and funds to facilitate early-stage deals we believe in and long-term partnerships. We act as your strategic growth partner — an operator who understands what investors want to see and how founders can get there. With boots on the ground in Dubai, San Francisco Bay Area, Singapore, and beyond." />
        <Stats />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-medium">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {focus.map((f) => <span key={f} className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm text-cyan">{f}</span>)}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-medium">End-to-End Support for Early-Stage Blockchain Startups</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {support.map((s) => (
                <li key={s} className="card flex items-center gap-3 px-4 py-3 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {terms.map((t) => (
            <div key={t.title} className="card p-7 text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-cyan">{t.title}</div>
              <div className="mt-3 text-lg">{t.text}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="Our Ticket" text="Velero Capital helps projects raise capital ranging from $50,000 to $10,000,000 through the following strategies:" />
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="OTC Acquisitions" text="Strategic off-market investments in high-liquidity digital assets, acquired at discounted rates" icon={Icons.coins} to="/otc-investment/" />
          <FeatureCard title="Venture Capital" text="Seed and Pre-Seed stage investments prior to TGE (Token Generation Event)" icon={Icons.rocket} />
        </div>
      </Section>

      <Section>
        <Heading title="How We Add Value" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {value.map((v) => <FeatureCard key={v.title} {...v} />)}
        </div>
      </Section>

      <CTA />
    </>
  );
}
