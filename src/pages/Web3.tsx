import { SidebarPage, Section, Cols, Prose, Quote } from "@/components/Layout";
import { LogoRow } from "@/components/Logos";
import Stats from "@/components/Stats";
import Button from "@/components/Button";
import { partners, team } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "otc", label: "OTC Investment" },
  { id: "strategic", label: "Strategic Investments" },
  { id: "marketing", label: "Web3 & Crypto Marketing" },
  { id: "ticket", label: "Our Ticket" },
  { id: "partners", label: "Partners" },
];

export default function Web3() {
  useTitle("Web3", "Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 projects.");
  return (
    <SidebarPage title={<>Web3: we don’t just talk Web3. We build it.</>} intro="Velero Capital is a private investment syndicate connecting a trusted network of global investors with high-growth Web3 projects. Every opportunity we bring is curated, vetted, and shared only within our closed investor circle. Only approved projects and investors can participate." anchors={anchors}>
      <Section>
        <Cols items={[
          { title: "OTC Investment", text: "Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved.", to: "#otc" },
          { title: "Strategic Investments", text: "Early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth.", to: "#strategic" },
          { title: "Marketing", text: "We help you get noticed — plain and simple. Building hype, growing real communities, and making sure the right people are talking about your project.", to: "#marketing" },
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

      <Section id="strategic" title="Strategic Investments">
        <Prose>
          <p>Velero Capital partners with early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth. We work closely with a global syndicate of VCs, angels, and funds to facilitate early-stage deals we believe in and long-term partnerships.</p>
          <p>We act as your strategic growth partner — an operator who understands what investors want to see and how founders can get there. With boots on the ground in Dubai, San Francisco Bay Area, Singapore, and beyond.</p>
        </Prose>
        <div className="mt-6"><Button to="/strategic-investments/">Explore Strategic Investments</Button></div>
      </Section>

      <Section id="marketing" title="Web3 & Crypto Marketing">
        <Prose>
          <p>We help you get noticed — plain and simple. Our team’s all about building hype, growing real communities, and making sure the right people are talking about your project.</p>
        </Prose>
        <div className="mt-6"><Button to="/contact-us/">Talk to us</Button></div>
      </Section>

      <Section>
        <Quote text="We’re more than helping you with investment purposes — we become part of your team. Our hands-on advisory model connects founders with strategic funding, seasoned operators, and a powerful Web3 network." name={team[3].name} role={`${team[3].role}, Velero Capital`} photo={team[3].photo} />
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

      <Section id="partners" title="Partnering with top-tier companies">
        <div className="space-y-8">
          <LogoRow title="CEX" logos={partners.CEX} />
          <LogoRow title="DEX" logos={partners.DEX} />
          <LogoRow title="Chains" logos={partners.Chains} />
        </div>
      </Section>
    </SidebarPage>
  );
}
