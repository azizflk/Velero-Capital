import { SidebarPage, Section, Cols, Prose, Quote } from "@/components/Layout";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { team } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "otc", label: "OTC Investment" },
  { id: "strategic", label: "Strategic Investments" },
  { id: "tech", label: "Tech" },
  { id: "ticket", label: "Our Ticket" },
];

export default function Capital() {
  useTitle("Capital", "Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 and tech projects.");
  const otcHead = team.find((m) => m.role === "Head of OTC") ?? team[0];
  return (
    <SidebarPage title="Capital: guiding bold ideas to safe harbors" intro="Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 and tech projects. Every opportunity we bring is curated, vetted, and shared only within our closed investor circle." anchors={anchors}>
      <Section>
        <Cols items={[
          { title: "OTC", text: "Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved.", to: "#otc" },
          { title: "Strategic", text: "Early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth.", to: "#strategic" },
          { title: "Tech", text: "AI, robotics, health tech, and beyond — we partner early, scale fast, and connect you with the capital that counts.", to: "#tech" },
        ]} />
      </Section>

      <Section><Stats compact /></Section>

      <Section id="otc" title="OTC Investment">
        <Prose>
          <p>Our OTC services with partners enable daily token-for-USDT/USD deals at discounted rates, ensuring steady capital inflow. Raise essential funds while maintaining token value and market stability.</p>
          <p>We prioritise fair outcomes for everyone. Our sustainable OTC deals deliver steady cash flow to projects while protecting retail markets from price shocks.</p>
        </Prose>
        <div className="mt-6"><Button to="/otc-investment/">Explore OTC Investment</Button></div>
      </Section>

      <Section>
        <Quote text="We’re proud to maintain a 100% client satisfaction rate for our OTC services — with zero complaints since inception." name={otcHead.name} role={`${otcHead.role}, Velero Capital`} photo={otcHead.photo} />
      </Section>

      <Section id="strategic" title="Strategic Investments">
        <Prose>
          <p>Velero Capital partners with early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth. We work closely with a global syndicate of VCs, angels, and funds to facilitate early-stage deals we believe in and long-term partnerships.</p>
          <p>We act as your strategic growth partner — an operator who understands what investors want to see and how founders can get there. With boots on the ground in Dubai, San Francisco Bay Area, Singapore, and beyond.</p>
        </Prose>
        <div className="mt-6"><Button to="/strategic-investments/">Explore Strategic Investments</Button></div>
      </Section>

      <Section id="tech" title="Tech">
        <Prose>
          <p>We connect high-potential tech startups with a global network of forward-thinking investors. From Dubai to Silicon Valley, our syndicate unlocks exclusive access to vetted early-stage ventures at the intersection of technology, scalability, and impact.</p>
          <p>Whether you’re a founder raising capital or an investor seeking the next breakout opportunity, we bridge the gap with curated deal flow, due diligence support, and strategic advisory.</p>
        </Prose>
        <div className="mt-6"><Button to="/tech-investments-part/">Explore Tech</Button></div>
      </Section>

      <Section id="ticket" title="Our Ticket">
        <Prose><p>Velero Capital helps projects raise capital ranging from $50,000 to $10,000,000 through the following strategies:</p></Prose>
        <div className="mt-6">
          <Cols cols={2} items={[
            { title: "OTC Acquisitions", text: "Strategic off-market investments in high-liquidity digital assets, acquired at discounted rates.", to: "/otc-investment/" },
            { title: "Venture Capital", text: "Seed and Pre-Seed stage investments prior to TGE (Token Generation Event).", to: "/strategic-investments/" },
          ]} />
        </div>
      </Section>
    </SidebarPage>
  );
}
