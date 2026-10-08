import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { services, type Service } from "@/data/services";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "overview", label: "Overview" },
  { id: "when", label: "When to engage us" },
  { id: "work", label: "What we do" },
  { id: "deliverables", label: "What you receive" },
  { id: "insights", label: "Insights" },
  { id: "engage", label: "How we engage" },
];

export default function ServiceDetail({ service }: { service: Service }) {
  useTitle(service.title, service.text);
  const others = services.filter((s) => s.slug !== service.slug);
  return (
    <SidebarPage title={service.title} intro={service.intro} anchors={anchors}>
      <Section id="overview">
        <Prose><p>{service.text}</p></Prose>
      </Section>

      <Section id="when" title="When to engage us">
        <List items={service.when} />
      </Section>

      <Section id="work" title="What we do">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {service.work.map((w) => (
            <div key={w.title} className="border-t border-rule pt-4">
              <h3 className="display text-2xl">{w.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="deliverables" title="What you receive">
        <List items={service.deliverables} />
      </Section>

      <Section id="insights" title="Insights">
        <Cols cols={3} items={service.insights} />
      </Section>

      <Section id="engage" title="How we engage">
        <Prose>
          <p>Each engagement is led by a senior member of the team, scoped up front and typically run on a retainer, so our advice stays independent of any single outcome. Tell us where you are and we’ll propose a scope.</p>
        </Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/contact-us/?role=founder&goal=services" variant="blue">Discuss an engagement</Button><Button to="/services/">All services</Button></div>
      </Section>

      <Section title="Other services">
        <Cols cols={4} items={others.map((o) => ({ title: o.title, text: o.items[0], to: o.path }))} />
      </Section>
    </SidebarPage>
  );
}
