import { SidebarPage, Section, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

const services = [
  {
    id: "fundraising",
    title: "Fundraising Advisory",
    text: "End-to-end support across equity and structured raises. We shape the positioning and narrative, build the investor list and materials, then run the process and the negotiation — keeping the operating business protected and your options open through close.",
    items: ["Positioning, narrative and investor materials", "Investor targeting and outreach strategy", "Process management and negotiation support"],
  },
  {
    id: "corporate-development",
    title: "Corporate Development",
    text: "Embedded support for partnerships, licensing, commercial agreements and acquisition-led growth. We work as a flexible extension of your corporate development function, from origination through diligence and execution.",
    items: ["Partnership and licensing strategy", "Commercial agreement structuring", "Target origination, diligence and execution"],
  },
  {
    id: "m-and-a",
    title: "M&A Advisory",
    text: "Sell-side and buy-side advice covering preparation, valuation, structuring and execution. We are strongest in technically complex situations, where real sector fluency changes the outcome.",
    items: ["Sell-side preparation and buyer outreach", "Buy-side screening and approach", "Valuation, structuring and execution"],
  },
  {
    id: "cap-table",
    title: "Cap Table & Equity Advisory",
    text: "Cap table architecture, secondary transactions, anti-dilution analysis and equity programme design — including option pool sizing, refresh strategy and incentive structures aligned with long-term value creation.",
    items: ["Cap table architecture and clean-up", "Secondary transactions and liquidity", "Option pools, refreshes and incentive design"],
  },
  {
    id: "valuation",
    title: "Valuation & Modelling",
    text: "Operating and valuation models built to stand up to scrutiny, for board reviews, financings, transactions and strategic decisions.",
    items: ["Operating and financial models", "Valuation analysis for rounds and transactions", "Board and strategic decision support"],
  },
];

const anchors = services.map((s) => ({ id: s.id, label: s.title }));

export default function Services() {
  useTitle("Services", "A focused corporate finance practice: fundraising advisory, corporate development, M&A, cap table and equity advisory, and valuation and modelling.");
  return (
    <SidebarPage title="Services: a focused corporate finance practice" intro="We advise across the financing and transaction lifecycle. Every engagement is senior-led, tightly scoped and run with the discipline of an institutional process, informed by investor-side judgment and operating experience." anchors={anchors}>
      <Section>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="group block border-t border-rule pt-4">
              <div className="text-[12px] tabular-nums text-ink/50">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-1 text-2xl group-hover:text-blue">{s.title}</h3>
            </a>
          ))}
        </div>
      </Section>

      {services.map((s) => (
        <Section key={s.id} id={s.id} title={s.title}>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
            <Prose className="lg:col-span-7"><p>{s.text}</p></Prose>
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
