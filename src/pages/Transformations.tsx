import { SidebarPage, Section, Cols, Prose, Quote, List } from "@/components/Layout";
import Button from "@/components/Button";
import { team } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "advisory", label: "Advisory" },
  { id: "marketing", label: "Web3 & Crypto Marketing" },
  { id: "support", label: "End-to-end support" },
  { id: "value", label: "How we add value" },
];

export default function Transformations() {
  useTitle("Transformations", "From token design to investor-ready launches: Velero Capital's hands-on advisory and Web3 marketing.");
  const strategy = team.find((m) => m.role === "Head of Strategy") ?? team[0];
  return (
    <SidebarPage title="Transformations: from token design to investor-ready launches" intro="We’re more than helping you with investment purposes — we become part of your team. Our hands-on model takes early projects and turns them into companies investors want to back." anchors={anchors}>
      <Section>
        <Cols cols={2} items={[
          { title: "Advisory", text: "Growth with expert support in tokenomics, regulatory compliance, TGE on Tier 1 & 2 CEXs, market strategy, and capital raising.", to: "#advisory" },
          { title: "Marketing", text: "We help you get noticed — plain and simple. Building hype, growing real communities, and making sure the right people are talking about your project.", to: "#marketing" },
        ]} />
      </Section>

      <Section id="advisory" title="Advisory">
        <Prose className="mb-6">
          <p>Velero Capital provides expertise in tokenomics strategy, regulatory compliance, market positioning, fundraising support, and listings to ensure long-term growth and success for blockchain projects.</p>
        </Prose>
        <List items={["Tokenomics strategy, unlock schedules and incentives", "Regulatory compliance", "Market positioning and strategy", "Fundraising support and capital raising", "TGE and listings on Tier 1 & 2 exchanges"]} />
      </Section>

      <Section id="marketing" title="Web3 & Crypto Marketing">
        <Prose>
          <p>We help you get noticed — plain and simple. Our team’s all about building hype, growing real communities, and making sure the right people are talking about your project.</p>
          <p>From marketing to community-building, our incubation and growth team works alongside your project to connect you with the resources and network you need to succeed.</p>
        </Prose>
        <div className="mt-6"><Button to="/contact-us/">Talk to us</Button></div>
      </Section>

      <Section>
        <Quote text="Our hands-on advisory model connects founders with strategic funding, seasoned operators, and a powerful Web3 network to drive sustainable growth." name={strategy.name} role={`${strategy.role}, Velero Capital`} photo={strategy.photo} />
      </Section>

      <Section id="support" title="End-to-end support for early-stage startups">
        <List items={["Seed and Pre-Seed Funding", "Crypto Market Analysis", "Strategic Investment Guidance", "Tailored Exit Strategies", "Marketing Boost"]} />
      </Section>

      <Section id="value" title="How we add value">
        <Cols cols={4} items={[
          { title: "Capital Access", text: "Plug into our trusted investor network for pre-seed to post-TGE rounds." },
          { title: "Fundraising Support", text: "Pitch deck feedback, round structuring, and investor comms." },
          { title: "Token Strategy", text: "Advisory on tokenomics, unlock schedules, and incentives." },
          { title: "Listings", text: "Tier 1, 2 exchange connections, OTC partners." },
        ]} />
        <div className="mt-8"><Button to="/contact-us/" variant="blue">Pitch us</Button></div>
      </Section>
    </SidebarPage>
  );
}
