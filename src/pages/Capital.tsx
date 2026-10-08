import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { investments, process } from "@/data/investments";
import { useTitle } from "@/lib/useTitle";

const anchors = [...investments.map((i) => ({ id: i.slug, label: i.label })), { id: "process", label: "How it works" }];

export default function Capital() {
  useTitle("Investment Strategies", "Velero Capital connects family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate.");
  return (
    <SidebarPage title="Investment strategies: late-stage, secondaries and real estate" intro="We connect family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate. Every opportunity is sourced through relationships, vetted, and shared only with approved investors." anchors={anchors}>
      <Section>
        <Cols cols={4} items={investments.map((i) => ({ title: i.label, text: i.intro, to: `#${i.slug}` }))} />
      </Section>

      <Section><Stats compact /></Section>

      {investments.map((i) => (
        <Section key={i.slug} id={i.slug} title={i.label}>
          <Prose><p>{i.summary}</p></Prose>
          <ul className="mt-6 grid max-w-3xl gap-x-8 sm:grid-cols-3">
            {i.points.map((p) => <li key={p.title} className="border-t border-rule py-2.5 text-[13px] font-medium">{p.title}</li>)}
          </ul>
          <div className="mt-6"><Button to={i.path}>Explore {i.label}</Button></div>
        </Section>
      ))}

      <Section id="process" title="How it works">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, n) => (
            <div key={p.title} className="border-t border-rule pt-4">
              <div className="text-[12px] tabular-nums text-ink/50">{String(n + 1).padStart(2, "0")}</div>
              <h3 className="display mt-1 text-2xl">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><Button to="/contact-us/" variant="blue">Get in Touch</Button></div>
      </Section>
    </SidebarPage>
  );
}
