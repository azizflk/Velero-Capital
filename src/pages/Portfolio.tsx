import { useState } from "react";
import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Filters from "@/components/Filters";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { LogoRow } from "@/components/Logos";
import { coInvestors, realEstateInvestors } from "@/data/site";
import { investments } from "@/data/investments";
import { useTitle } from "@/lib/useTitle";

const TYPES = ["All", "Venture firms", "Real estate investors"] as const;
type T = (typeof TYPES)[number];

const sectors = ["Artificial Intelligence", "Robotics", "Financial Technology", "Healthcare & Biotechnology", "Space Technology", "Real Estate"];

export default function Portfolio() {
  useTitle("Portfolio", "$350M+ raised, placed and advised across every mandate since 2023, across late-stage companies, secondaries and real estate.");
  const [type, setType] = useState<T>("All");
  const show = (t: T) => type === "All" || type === t;
  return (
    <SidebarPage
      title="Portfolio"
      intro="Late-stage companies, secondary positions and real estate, accessed through relationships. Every opportunity is curated, vetted, and shared only within our closed investor circle."
      aside={<Filters label="Network" options={TYPES} value={type} onChange={setType} />}
    >
      <Section><Stats compact /></Section>

      <Section title="Where we invest">
        <Cols cols={4} items={investments.map((i) => ({ title: i.label, text: i.intro, to: i.path }))} />
      </Section>

      <Section title="Sectors">
        <ul className="grid max-w-3xl gap-x-8 sm:grid-cols-2">
          {sectors.map((s) => <li key={s} className="border-t border-rule py-2.5 text-[14px]">{s}</li>)}
        </ul>
      </Section>

      <Section id="network" title="Who we invest alongside">
        <Prose className="mb-8"><p>Our investors participate alongside the sponsors that lead the rounds and own the assets.</p></Prose>
        <div className="space-y-10">
          {show("Venture firms") && <LogoRow title="Venture firms" logos={[...coInvestors[0], ...coInvestors[1]]} />}
          {show("Real estate investors") && <LogoRow title="Real estate investors" logos={[...realEstateInvestors[0], ...realEstateInvestors[1]]} />}
        </div>
      </Section>

      <Section title="Request the full portfolio">
        <Prose><p>Position-level detail is shared with approved family offices and institutional investors on request.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/contact-us/" variant="blue">Get in Touch</Button><Button to="/capital/">How we invest</Button></div>
      </Section>
    </SidebarPage>
  );
}
