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
  useTitle("Portfolio", "Where Velero Capital works: late-stage companies, secondaries and real estate, the industries we focus on, and the investor landscape we operate in.");
  const [type, setType] = useState<T>("All");
  const show = (t: T) => type === "All" || type === t;
  return (
    <SidebarPage
      title="Portfolio"
      intro="Late-stage companies, secondary positions and real estate, accessed through relationships. Every opportunity is reviewed and shared only with eligible investors whose mandate it fits."
      aside={<Filters label="Network" options={TYPES} value={type} onChange={setType} />}
    >
      <Section><Stats compact /></Section>

      <Section title="Where we invest">
        <Cols cols={4} items={investments.map((i) => ({ title: i.label, text: i.intro, to: i.path }))} />
      </Section>

      <Section title="Industries">
        <ul className="grid max-w-3xl gap-x-8 sm:grid-cols-2">
          {sectors.map((s) => <li key={s} className="border-t border-rule py-2.5 text-[14px]">{s}</li>)}
        </ul>
      </Section>

      <Section id="network" title="The investor landscape">
        <Prose className="mb-8"><p>The lead investors whose rounds and assets define the markets we work in. Our investors look for transactions sponsored at this standard.</p></Prose>
        <div className="space-y-10">
          {show("Venture firms") && <LogoRow title="Venture firms" logos={[...coInvestors[0], ...coInvestors[1]]} />}
          {show("Real estate investors") && <LogoRow title="Real estate investors" logos={[...realEstateInvestors[0], ...realEstateInvestors[1]]} />}
        </div>
      </Section>

      <Section title="Investor access">
        <Prose><p>Specific opportunities are discussed only with eligible family offices and institutional investors whose mandate they fit, after review and under confidentiality terms.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/investor-access/" variant="blue">Investor Access</Button><Button to="/capital/">Explore Our Strategies</Button></div>
      </Section>
    </SidebarPage>
  );
}
