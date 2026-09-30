import { SidebarPage, Section, Cols, Prose } from "@/components/Layout";
import Stats from "@/components/Stats";
import { differentiators } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "expertise", label: "Expertise" },
  { id: "vision", label: "Vision & mission" },
  { id: "values", label: "Core values" },
  { id: "apart", label: "What sets us apart" },
];

export default function About() {
  useTitle("About", "Velero Capital is a private investment syndicate headquartered in Dubai, UAE and San Francisco, CA, backing early-stage Web3 and Tech startups.");
  return (
    <SidebarPage title="About: empowering innovation through strategic capital" intro="Velero Capital is a private investment syndicate headquartered in Dubai, UAE and San Francisco, CA dedicated to backing early-stage Web3/blockchain and Tech startup ecosystems." anchors={anchors}>
      <Section>
        <Prose>
          <p>We’re a vibrant network of investors, industry experts, dealmakers, and operational leaders. Only approved projects and investors can participate.</p>
        </Prose>
      </Section>

      <Section id="expertise">
        <Cols cols={2} items={[
          { title: "Blockchain & Web3", text: "Since 2017, our experts have been deeply involved in the blockchain and cryptocurrency space, advising as venture capital, strategic partnerships, investments, and fundraising. Our expertise spans project evaluation, cryptocurrency markets, tokenomics, and blockchain-based solutions." },
          { title: "Tech", text: "We partner with high-potential tech across sectors such as AI, SaaS, robotics, fintech, health tech, and space tech. We support founders from seed stage to pre-IPO with capital, strategic guidance, and access to our global investor network." },
        ]} />
      </Section>

      <Section><Stats compact /></Section>

      <Section id="vision">
        <Cols cols={2} items={[
          { title: "Our Vision", text: "To accelerate the future of decentralised finance and innovation by empowering visionary founders and connecting global capital with the world’s most promising Web3 and tech." },
          { title: "Our Mission", text: "We bridge the gap between bold ideas and strategic capital. We provide tailored investment solutions, deep market expertise, and global investor networks to help startups scale, disrupt markets, and create lasting impact." },
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
    </SidebarPage>
  );
}
