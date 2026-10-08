import { Link } from "react-router-dom";
import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import FAQ from "@/components/FAQ";
import Button from "@/components/Button";
import { groups, sectors } from "@/data/solutions";
import { useTitle } from "@/lib/useTitle";

const anchors = groups.map((g) => ({ id: g.id, label: g.title }));

export default function Solutions() {
  useTitle("Solutions", `Sector-specialist capital and advisory across ${sectors.length} industries, from real estate and infrastructure to technology, energy, healthcare and the public sector.`);
  return (
    <SidebarPage title="Solutions: the sectors we serve" intro={`Capital and advice shaped to each industry. We cover ${sectors.length} sectors in seven groups, and bring to each an understanding of its capital, its cycle and its counterparties.`} anchors={anchors}>
      <Section title="Who we serve">
        <Prose>
          <p>Our Capital and Services pages describe what we do: equity, debt, M&A, secondaries and execution. These pages describe who we do it for. We bring an understanding of each sector’s capital, its cycle and its counterparties to every mandate.</p>
          <p>Most mandates combine both: a view of the sector, and the right form of capital for it. Explore each industry to see how we fund, transact and advise.</p>
        </Prose>
      </Section>

      {groups.map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {g.sectors.map((s) => (
              <Link key={s.slug} to={s.path} className="group flex items-start justify-between gap-4 border-t border-rule py-4">
                <span>
                  <span className="display block text-2xl group-hover:text-blue">{s.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink/75">{s.tagline}</span>
                </span>
                <span aria-hidden className="mt-1 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-blue">→</span>
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <Section id="across" title="Across every sector">
        <Prose className="mb-8"><p>Every sector draws on the same set of capabilities, matched to that industry’s capital and cycle.</p></Prose>
        <Cols cols={3} items={[
          { title: "Equity & growth capital", text: "Venture, growth and structured equity, and joint-venture capital, sized to each sector." },
          { title: "Debt & private credit", text: "Advice on senior, mezzanine, project and venture debt, across real assets and operating businesses." },
          { title: "M&A & transactions", text: "Buy-side, sell-side and cross-border M&A, and joint ventures." },
          { title: "Alternatives & secondaries", text: "Co-investment and pre-IPO secondary access across private companies and real estate." },
          { title: "Strategy & execution", text: "Modelling, investor documentation and fundraising support behind every raise." },
          { title: "Senior-led, everywhere", text: "Led from Dubai with an office in San Francisco, and a senior team member on every mandate." },
        ]} />
      </Section>

      <Section id="questions" title="Questions, answered">
        <FAQ items={[
          { q: "Which industries does Velero Capital serve?", a: `${sectors.length} sectors in seven groups: real estate and infrastructure; financial services; technology, media and telecom; energy, power and resources; industrials and mobility; consumer, healthcare and sports; and the public sector.` },
          { q: "How is this different from Capital and Services?", a: "Capital and Services describe what we do. Solutions describes who we serve. Most mandates combine the two: a sector view and the right capital product." },
          { q: "How does our work vary by sector?", a: "Each sector page sets out the clients we serve, our role on mandates, and what matters most when capital is raised in that industry." },
          { q: "What is the process for a mandate?", a: "A short, confidential scoping conversation and a non-disclosure agreement. We then structure the requirement, prepare the materials, run the process with investors and lenders, and negotiate through to close, with a senior team member leading at every step." },
        ]} />
      </Section>

      <Section title="Start a conversation">
        <Prose><p>Tell us about your sector and what you need. A senior member of the team will come back to you.</p></Prose>
        <div className="mt-6"><Button to="/contact-us/" variant="blue">Discuss a mandate</Button></div>
      </Section>
    </SidebarPage>
  );
}
