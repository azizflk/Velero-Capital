import { Link } from "react-router-dom";
import { SidebarPage, Section, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { services } from "@/data/services";
import { useTitle } from "@/lib/useTitle";

const anchors = services.map((s) => ({ id: s.id, label: s.title }));

export default function Services() {
  useTitle("Services", "A focused corporate finance practice: fundraising advisory, corporate development, M&A, cap table and equity advisory, and valuation and modelling.");
  return (
    <SidebarPage title="Services: a focused corporate finance practice" intro="We advise across the financing and transaction lifecycle. Every engagement is senior-led, tightly scoped and run with the discipline of an institutional process, informed by investor-side judgment and operating experience." anchors={anchors}>
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
        <div className="mt-6"><Button to="/contact-us/" variant="blue">Initiate contact</Button></div>
      </Section>
    </SidebarPage>
  );
}
