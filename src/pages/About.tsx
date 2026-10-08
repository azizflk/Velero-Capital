import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Stats from "@/components/Stats";
import { differentiators } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "name", label: "The name" },
  { id: "expertise", label: "Expertise" },
  { id: "vision", label: "Vision & mission" },
  { id: "values", label: "Core values" },
  { id: "apart", label: "What sets us apart" },
  { id: "connect", label: "Connect with us" },
];

export default function About() {
  useTitle("Company", "Velero Capital connects family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate.");
  return (
    <SidebarPage title="Company: an independent private-markets firm" intro="Velero Capital is an independent private-markets investment-access and advisory firm headquartered in Dubai, with an office in San Francisco." anchors={anchors}>
      <Section id="name">
        <h2 className="display text-2xl">Velero means sailing vessel in Spanish.</h2>
        <Prose className="mt-3">
          <p>The name reflects our role in navigating private markets and connecting capital with select investment opportunities. Velero Capital works with family offices and institutional investors across late-stage companies, secondary transactions, and real estate.</p>
          <p>We are a small senior team working with a network of investors, industry specialists, dealmakers and operators. Velero Capital does not manage a fund or invest its own balance sheet: our role is to source, review and structure opportunities for eligible investors, and to advise companies on their own transactions. Opportunities are shared only with eligible investors whose mandate they fit.</p>
        </Prose>
      </Section>

      <Section id="expertise">
        <Cols cols={3} items={[
          { title: "Private Companies", text: "Primary allocations in late-stage and pre-IPO rounds, and secondary purchases of existing stakes from founders, employees, early investors and fund limited partners.", to: "/late-stage/" },
          { title: "Real Estate", text: "Direct deals, joint ventures and fund positions in institutional-quality real estate, alongside established operators and sponsors.", to: "/real-estate/" },
          { title: "Advisory", text: "A focused corporate finance practice covering fundraising, corporate development, M&A, cap table and equity advisory, and valuation.", to: "/services/" },
        ]} />
      </Section>

      <Section><Stats compact /></Section>

      <Section id="vision">
        <Cols cols={2} items={[
          { title: "Our Vision", text: "To be the firm that family offices and institutions trust for select, well-reviewed access to private markets, across the Gulf and the United States." },
          { title: "Our Mission", text: "To connect eligible investors with private-market opportunities that fit their mandate, on terms set out clearly in advance, and to advise companies with the same discipline on fundraising and transactions." },
        ]} />
      </Section>

      <Section id="values" title="Our core values">
        <Cols cols={3} items={[
          { title: "Selectivity", text: "We share only what has been reviewed and fits a mandate, and we decline most of what we see." },
          { title: "Integrity", text: "Terms, costs and conflicts are disclosed in writing before any commitment." },
          { title: "Discretion", text: "Investors’ mandates and participation, and companies’ information, are held in confidence." },
          { title: "Discipline", text: "The same review of the company or asset, the terms and the counterparties, on every opportunity, large or small." },
          { title: "Alignment", text: "Investors come in on terms no worse than the lead sponsor’s, with reporting that passes through to every participant." },
          { title: "Global Reach", text: "Dubai and San Francisco: relationships on both sides of the capital flow between the Gulf and the United States." },
        ]} />
      </Section>

      <Section id="apart" title="What sets us apart">
        <Cols cols={3} items={differentiators} />
      </Section>

      <Section id="connect" title="Connect with us">
        <Cols cols={3} items={[
          { title: "Investor Access", text: "How family offices and institutions work with us, from enquiry to transaction.", to: "/investor-access/" },
          { title: "Submit an Opportunity", text: "For companies, shareholders, sponsors and intermediaries.", to: "/submit-an-opportunity/" },
          { title: "Account Verification", text: "Confirm that an email address is officially associated with Velero Capital.", to: "/verification/" },
        ]} />
      </Section>
    </SidebarPage>
  );
}
