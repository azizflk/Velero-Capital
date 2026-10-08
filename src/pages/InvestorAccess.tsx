import { Link } from "react-router-dom";
import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { investments } from "@/data/investments";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "who", label: "Who we work with" },
  { id: "process", label: "How access works" },
  { id: "expect", label: "What to expect" },
  { id: "strategies", label: "Strategies" },
  { id: "start", label: "Start" },
];

/** The investor journey, from first enquiry to a possible transaction. Nothing here promises access or allocation. */
const steps = [
  { title: "Initial enquiry", text: "You tell us who you are, the kind of investor you represent and what you are looking for. A short form is enough; we do not ask for financial or identity documents at this stage." },
  { title: "Investor profile and eligibility", text: "We review the enquiry against the eligibility rules of your jurisdiction and the kinds of opportunity we work on. Private-market investments are only suitable for professional, qualified or accredited investors." },
  { title: "Mandate alignment", text: "A conversation with a senior member of the team on strategy, ticket size, sectors, geography, structure and timing, so that anything we share later is relevant." },
  { title: "Confidentiality and verification", text: "Before specific opportunities are discussed we agree confidentiality terms and complete the verification the transaction and the law require." },
  { title: "Review of opportunities", text: "Where an opportunity fits your mandate, we share the information available on it: the company or asset, the terms, the counterparties and our own review. Not every mandate will have a matching opportunity at any given time." },
  { title: "Transaction engagement", text: "If you decide to proceed, participation is documented for that transaction, with the structure, costs and reporting set out in writing before any commitment." },
];

export default function InvestorAccess() {
  useTitle("Investor Access", "How family offices and institutional investors work with Velero Capital: enquiry, eligibility, mandate alignment, confidentiality, review of opportunities and transaction engagement.");
  return (
    <SidebarPage title="Investor access: a staged, confidential process" intro="Opportunities are shared only with eligible investors whose mandate they fit, after a review on both sides. This page sets out how that works." anchors={anchors}>
      <Section id="who" title="Who we work with">
        <Prose>
          <p>Velero Capital works with family offices, institutional investors, fund managers and other professional or accredited investors. We do not operate a platform or a public listing of opportunities; each one is shared individually, with the investors it suits.</p>
        </Prose>
        <div className="mt-6">
          <Cols cols={3} items={[
            { title: "Family offices", text: "Single and multi-family offices allocating directly to private companies and real estate, deal by deal." },
            { title: "Institutions", text: "Pension, insurance, endowment and sovereign capital, and the managers that invest for them." },
            { title: "Professional investors", text: "Funds, venture and private equity firms, and individual professional investors who meet their jurisdiction’s eligibility rules." },
          ]} />
        </div>
      </Section>

      <Section id="process" title="How access works">
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-rule pt-4">
              <div className="text-[12px] tabular-nums text-ink/50">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="expect" title="What to expect">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="display text-2xl">What we do</h3>
            <List items={[
              "Source opportunities through founder, sponsor and shareholder relationships",
              "Review the company or asset, the terms and the counterparties before sharing",
              "Set out structure, costs and reporting in writing for each transaction",
              "Keep your mandate and your participation confidential",
            ]} />
          </div>
          <div className="lg:col-span-6">
            <h3 className="display text-2xl">What we do not do</h3>
            <List items={[
              "Guarantee access to any opportunity, or an allocation in any transaction",
              "Promise a return, a price, a timing or a liquidity event",
              "Give investment, legal or tax advice; you should take your own",
              "Ask for bank, card or identity-document details through this website",
            ]} />
          </div>
        </div>
        <Prose className="mt-8 text-[13px]">
          <p>Submitting an enquiry does not make you a client of Velero Capital and does not create any obligation on either side. Please read our <Link to="/legal/" className="textlink">legal and disclosures</Link> page before contacting us.</p>
        </Prose>
      </Section>

      <Section id="strategies" title="Strategies">
        <Cols cols={2} items={investments.map((i) => ({ title: i.label, text: i.summary, to: i.path }))} />
      </Section>

      <Section id="start" title="Start">
        <Prose><p>Tell us about yourself and your mandate. A senior member of the team reviews every investor enquiry and comes back to you to arrange a first conversation.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/contact-us/?role=investor" variant="blue">Investor enquiry</Button><Button to="/capital/">Explore our strategies</Button></div>
      </Section>
    </SidebarPage>
  );
}
