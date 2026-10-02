import { useState } from "react";
import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Filters from "@/components/Filters";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { LogoRow } from "@/components/Logos";
import { partners, trustedExchanges } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const TYPES = ["All", "Trusted exchanges", "CEX", "DEX", "Chains"] as const;
type T = (typeof TYPES)[number];

const web3Focus = ["DeFi", "GameFi", "RWA", "NFT & Metaverse", "Data & AI x Crypto"];
const techFocus = ["Artificial Intelligence", "Robotics", "Biotechnology", "Space Technology", "Financial Technology", "Healthcare Technology"];

export default function Portfolio() {
  useTitle("Portfolio", "125+ raises supported and 8 unicorns in portfolio across Web3 and deep tech, with a network spanning the leading exchanges, DEXs and chains.");
  const [type, setType] = useState<T>("All");
  const show = (t: T) => type === "All" || type === t;
  return (
    <SidebarPage
      title="Portfolio"
      intro="We back bold builders in crypto, DeFi, blockchain infrastructure and deep tech. Every opportunity is curated, vetted, and shared only within our closed investor circle."
      aside={<Filters label="Network" options={TYPES} value={type} onChange={setType} />}
    >
      <Section><Stats compact /></Section>

      <Section title="Where we invest">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="display text-2xl">Web3</h3>
            <ul className="mt-3">{web3Focus.map((f) => <li key={f} className="border-t border-rule py-2 text-[13px] last:border-b">{f}</li>)}</ul>
          </div>
          <div>
            <h3 className="display text-2xl">Tech</h3>
            <ul className="mt-3">{techFocus.map((f) => <li key={f} className="border-t border-rule py-2 text-[13px] last:border-b">{f}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section>
        <Cols items={[
          { title: "Stage", text: "Early entry from initial ticket to Series A, prioritizing value over valuation." },
          { title: "Investment Size", text: "$50k – $10,000,000" },
          { title: "Geographic Reach", text: "Global, with boots on the ground in Dubai, San Francisco Bay Area and Singapore." },
        ]} />
      </Section>

      <Section id="network" title="Our network">
        <Prose className="mb-8"><p>Our portfolio companies list, trade and build with top-tier companies in the industry.</p></Prose>
        <div className="space-y-10">
          {show("Trusted exchanges") && <LogoRow title="Trusted exchanges" logos={trustedExchanges} />}
          {show("CEX") && <LogoRow title="CEX" logos={partners.CEX} />}
          {show("DEX") && <LogoRow title="DEX" logos={partners.DEX} />}
          {show("Chains") && <LogoRow title="Chains" logos={partners.Chains} />}
        </div>
      </Section>

      <Section title="Join the portfolio">
        <Prose><p>Only approved projects and investors can participate. Tell us what you’re building and we’ll come back with a proposal.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/contact-us/" variant="blue">Pitch us</Button><Button to="/capital/">How we invest</Button></div>
      </Section>
    </SidebarPage>
  );
}
