import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "focus", label: "Focus areas" },
  { id: "support", label: "End-to-end support" },
  { id: "terms", label: "Stage, size, reach" },
  { id: "ticket", label: "Our ticket" },
  { id: "value", label: "How we add value" },
];

export default function Strategic() {
  useTitle("Strategic Investments", "Velero Capital bridges founders and investors in Web3, partnering with early-stage blockchain ventures from $50k to $10M.");
  return (
    <SidebarPage title="Strategic Investments: bridging founders and investors in Web3" intro="Velero Capital partners with early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth." anchors={anchors}>
      <Section title="Accelerating early-stage blockchain growth">
        <Prose>
          <p>We work closely with a global syndicate of VCs, angels, and funds to facilitate early-stage deals we believe in and long-term partnerships. We act as your strategic growth partner — an operator who understands what investors want to see and how founders can get there.</p>
          <p>With boots on the ground in Dubai, San Francisco Bay Area, Singapore, and beyond.</p>
        </Prose>
      </Section>

      <Section><Stats compact /></Section>

      <Section id="focus" title="Focus areas">
        <div className="flex flex-wrap gap-2">
          {["DeFi", "GameFi", "RWA", "NFT & Metaverse", "Data & AI x Crypto"].map((f) => <span key={f} className="pill cursor-default hover:bg-transparent hover:text-ink">{f}</span>)}
        </div>
      </Section>

      <Section id="support" title="End-to-end support for early-stage blockchain startups">
        <List items={["Seed and Pre-Seed Funding", "Crypto Market Analysis", "Strategic Investment Guidance", "Tailored Exit Strategies", "Marketing Boost"]} />
      </Section>

      <Section id="terms">
        <Cols items={[
          { title: "Stage", text: "Early entry from initial ticket to Series A, prioritizing value over valuation." },
          { title: "Investment Size", text: "$50k – $10,000,000" },
          { title: "Geographic Reach", text: "Global" },
        ]} />
      </Section>

      <Section id="ticket" title="Our ticket">
        <Prose><p>Velero Capital helps projects raise capital ranging from $50,000 to $10,000,000 through the following strategies:</p></Prose>
        <div className="mt-6">
          <Cols cols={2} items={[
            { title: "OTC Acquisitions", text: "Strategic off-market investments in high-liquidity digital assets, acquired at discounted rates.", to: "/otc-investment/" },
            { title: "Venture Capital", text: "Seed and Pre-Seed stage investments prior to TGE (Token Generation Event)." },
          ]} />
        </div>
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
