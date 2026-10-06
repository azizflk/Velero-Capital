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
    <SidebarPage title="Company: empowering innovation through strategic capital" intro="Velero Capital is a private investment firm headquartered in Dubai, with offices in San Francisco, Los Angeles and Berlin." anchors={anchors}>
      <Section id="name">
        <h2 className="display text-2xl">Velero means sailing vessel in Spanish.</h2>
        <Prose className="mt-3">
          <p>The name reflects our role in navigating private markets and connecting capital with select investment opportunities. Velero Capital works with family offices and institutional investors across late-stage companies, secondary transactions, and real estate.</p>
          <p>We’re a network of investors, industry experts, dealmakers, and operational leaders. Only approved investors can participate.</p>
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
          { title: "Our Vision", text: "To be the trusted route into private markets for family offices and institutions, connecting global capital with the companies and assets defining the future." },
          { title: "Our Mission", text: "We bridge the gap between bold ideas and strategic capital. We provide tailored investment access, deep market expertise, and a global investor network to help companies scale and investors deploy with conviction." },
        ]} />
      </Section>

      <Section id="values" title="Our core values">
        <Cols cols={3} items={[
          { title: "Innovation-First", text: "We back ideas that challenge the status quo and shape the future." },
          { title: "Integrity & Trust", text: "We build long-term partnerships based on transparency, alignment, and reliability." },
          { title: "Global Connectivity", text: "From Dubai to Silicon Valley, we unite founders and investors across borders." },
          { title: "Agility", text: "We move fast, act boldly, and adapt quickly to market shifts." },
          { title: "Founder-Focused", text: "We support entrepreneurs with more than just capital — offering strategic insight, operational guidance, and hands-on partnership." },
          { title: "Excellence", text: "We aim for top-tier execution in everything we do — from deal sourcing to value creation." },
        ]} />
      </Section>

      <Section id="apart" title="What sets us apart">
        <Cols cols={3} items={differentiators} />
      </Section>

      <Section id="connect" title="Connect with us">
        <Cols cols={3} items={[
          { title: "Account Verification", text: "Confirm that an email address is officially associated with Velero Capital.", to: "/verification/" },
          { title: "Contact", text: "Tell us about your mandate and we’ll come back to you.", to: "/contact-us/" },
        ]} />
      </Section>
    </SidebarPage>
  );
}
