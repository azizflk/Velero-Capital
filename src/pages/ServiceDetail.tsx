import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { services, type Service } from "@/data/services";
import { faqPage, serviceNode, useTitle } from "@/lib/useTitle";
import FAQ from "@/components/FAQ";
import { applyForService } from "@/lib/portal";

/** The sections in page order; the optional ones appear only when the service has them. */
const anchorsFor = (s: Service) => [
  { id: "overview", label: "Overview" },
  { id: "when", label: "When to engage us" },
  { id: "work", label: "What we do" },
  ...(s.more?.methods ? [{ id: "methods", label: s.more.methodsTitle ?? "Methods explained" }] : []),
  ...(s.more?.process ? [{ id: "process", label: "How the work runs" }] : []),
  { id: "deliverables", label: "What you receive" },
  ...(s.more?.needs ? [{ id: "needs", label: "What we need from you" }] : []),
  ...(s.more?.faqs ? [{ id: "questions", label: "Questions" }] : []),
  { id: "engage", label: "How we engage" },
];

export default function ServiceDetail({ service }: { service: Service }) {
  useTitle(service.title, service.text, {
    crumbs: [{ name: "Services", path: "/services/" }],
    jsonLd: [
      serviceNode({ path: service.path, name: service.title, description: service.text, serviceType: service.title, audience: "Founders, companies, shareholders and sponsors", offers: service.work.map((w) => w.title) }),
      ...(service.more?.faqs ? [faqPage(service.path, service.more.faqs)] : []),
    ],
  });
  const more = service.more ?? {};
  const related = (more.related ?? []).map((slug) => services.find((s) => s.slug === slug)).filter((s): s is Service => !!s);
  // The services most often combined with this one, or else all the others.
  const others = related.length ? related : services.filter((s) => s.slug !== service.slug);
  const anchors = anchorsFor(service);
  // Opens the application with this service already chosen.
  const apply = applyForService(service.title);
  return (
    <SidebarPage title={service.title} intro={service.intro} anchors={anchors}>
      <Section id="overview">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Prose><p>{service.text}</p></Prose>
          <Button to={apply} variant="blue" className="shrink-0 self-start lg:self-center">Apply <span aria-hidden>→</span></Button>
        </div>
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

      {more.methods && (
        <Section id="methods" title={more.methodsTitle ?? "Methods explained"}>
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {more.methods.map((m) => (
              <div key={m.title} className="border-t border-rule pt-4">
                <h3 className="display text-2xl">{m.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{m.text}</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-blue">Most useful</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/80">{m.useful}</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/60">Watch for</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/80">{m.watch}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {more.process && (
        <Section id="process" title="How the work runs">
          <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {more.process.map((p, i) => (
              <li key={p.title} className="border-t border-rule pt-4">
                <div className="text-[12px] tabular-nums text-ink/50">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="display mt-1 text-2xl">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{p.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section id="deliverables" title="What you receive">
        <List items={service.deliverables} />
      </Section>

      {more.needs && (
        <Section id="needs" title="What we need from you">
          <Prose className="mb-5"><p>As the work goes on, we usually ask for:</p></Prose>
          <List items={more.needs} />
          <Prose className="mt-5 text-[13px]"><p>Please do not send confidential documents through the website; once confidentiality terms are agreed, we will tell you how to share them.</p></Prose>
        </Section>
      )}


      {more.faqs && (
        <Section id="questions" title="Questions">
          <FAQ items={more.faqs} />
        </Section>
      )}

      <Section id="engage" title="How we engage">
        <Prose>
          <p>Each engagement is led by a senior member of the team, scoped up front and typically run on a retainer, so our advice stays independent of any single outcome. Tell us where you are and we’ll propose a scope.</p>
        </Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to={apply} variant="blue">Apply to discuss an engagement</Button><Button to="/services/">All services</Button></div>
      </Section>

      <Section title={related.length ? "Often combined with" : "Other services"}>
        <Cols cols={related.length ? 3 : 4} items={others.map((o) => ({ title: o.title, text: related.length ? o.text : o.items[0], to: o.path }))} />
      </Section>
    </SidebarPage>
  );
}
