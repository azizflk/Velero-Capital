import { Link } from "react-router-dom";
import { SidebarPage, Section, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { services } from "@/data/services";
import { ORIGIN, useTitle } from "@/lib/useTitle";

const anchors = services.map((s) => ({ id: s.id, label: s.title }));

export default function Services() {
  useTitle("Services", "Corporate finance and cross-border advisory: fundraising, M&A, corporate development, cap table, valuation, joint ventures, market entry and strategic introductions.", {
    full: "Corporate Finance & Cross-Border Advisory Services | Velero Capital",
    pageType: "CollectionPage",
    jsonLd: [{ "@type": "ItemList", name: "Velero Capital advisory services", itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: ORIGIN + s.path })) }],
  });
  return (
    <SidebarPage title="Services: corporate finance and cross-border advisory" intro="We advise across the financing and transaction lifecycle. Every engagement is senior-led, tightly scoped and run with the discipline of an institutional process, informed by investor-side judgment and operating experience." anchors={anchors}>
      <Section>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.id} to={s.path} className="group flex items-start justify-between gap-4 border-t border-rule pt-4">
              <h3 className="display text-2xl group-hover:text-blue">{s.title}</h3>
              <span aria-hidden className="mt-1 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-blue">→</span>
            </Link>
          ))}
        </div>
      </Section>

      {services.map((s) => (
        <Section key={s.id} id={s.id} title={<Link to={s.path} className="hover:text-blue">{s.title}</Link>}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Prose><p>{s.text}</p></Prose>
              <div className="mt-6"><Button to={s.path}>Explore {s.title}</Button></div>
            </div>
            <div className="lg:col-span-5"><List items={s.items} /></div>
          </div>
        </Section>
      ))}

      <Section title="How we engage">
        <Prose>
          <p>Engagements are scoped up front and typically run on a retainer, so our advice stays independent of any single outcome. Tell us where you are in the financing or transaction lifecycle and we’ll propose a scope.</p>
        </Prose>
        <div className="mt-6"><Button to="/contact-us/?role=founder&goal=services" variant="blue">Discuss an engagement</Button></div>
      </Section>
    </SidebarPage>
  );
}
