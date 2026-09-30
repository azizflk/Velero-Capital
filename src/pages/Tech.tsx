import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "categories", label: "Tech categories" },
  { id: "offer", label: "What we offer" },
];
const categories = [
  { title: "Artificial Intelligence", items: ["AI (General)", "AI Infrastructure", "Software Layer (AI applications)"] },
  { title: "Robotics", items: ["Autonomous Systems", "Industrial & Service Robotics"] },
  { title: "Biotechnology", items: ["Biotech", "Health Tech"] },
  { title: "Space Technology", items: ["Space Tech", "Aerospace Innovation"] },
  { title: "Financial Technology", items: ["Fintech", "Blockchain / DeFi"] },
  { title: "Healthcare Technology", items: ["Digital Health", "MedTech"] },
];

export default function Tech() {
  useTitle("Tech", "We connect high-potential tech startups with a global network of forward-thinking investors, from Dubai to Silicon Valley.");
  return (
    <SidebarPage title="Tech: scale without limits, on your terms" intro="You bring the vision, we bring the execution. We connect high-potential tech startups with a global network of forward-thinking investors." anchors={anchors}>
      <Section>
        <Prose>
          <p>From Dubai to Silicon Valley, our syndicate unlocks exclusive access to vetted early-stage ventures at the intersection of technology, scalability, and impact.</p>
          <p>Whether you’re a founder raising capital or an investor seeking the next breakout opportunity, we bridge the gap with curated deal flow, due diligence support, and strategic advisory.</p>
        </Prose>
      </Section>

      <Section id="categories" title="Tech categories">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.title}>
              <h3 className="display text-2xl">{c.title}</h3>
              <ul className="mt-3">
                {c.items.map((i) => <li key={i} className="border-t border-rule py-2 text-[13px] last:border-b">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="offer" title="What we offer">
        <Cols cols={4} items={[
          { title: "Startup Scouting", text: "Discover pre-screened early-stage startups across AI, fintech, SaaS, Web3, and more." },
          { title: "Cross-Border Access", text: "Tap into emerging ecosystems through our investor network in the US, UAE, and Singapore." },
          { title: "Capital Matching", text: "We align startups with angel investors, syndicates, and institutional capital ready to deploy." },
          { title: "Advisory Support", text: "Founders benefit from tailored mentorship, pitch refinement, and go-to-market strategies." },
        ]} />
        <div className="mt-8"><Button to="/contact-us/" variant="blue">Get started</Button></div>
      </Section>
    </SidebarPage>
  );
}
