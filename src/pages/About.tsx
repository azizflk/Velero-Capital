import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import { Section, Heading } from "@/components/Section";
import { FeatureCard, Icons } from "@/components/Cards";
import { differentiators } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const values = [
  { title: "Innovation-First", text: "We back ideas that challenge the status quo and shape the future.", icon: Icons.bolt },
  { title: "Integrity & Trust", text: "We build long-term partnerships based on transparency, alignment, and reliability.", icon: Icons.shield },
  { title: "Global Connectivity", text: "From Dubai to Silicon Valley, we unite founders and investors across borders.", icon: Icons.globe },
  { title: "Agility", text: "We move fast, act boldly, and adapt quickly to market shifts.", icon: Icons.rocket },
  { title: "Founder-Focused", text: "We support entrepreneurs with more than just capital—offering strategic insight, operational guidance, and hands-on partnership.", icon: Icons.users },
  { title: "Excellence", text: "We aim for top-tier execution in everything we do—from deal sourcing to value creation.", icon: Icons.star },
];

export default function About() {
  useTitle("About us", "Velero Capital is a private investment syndicate headquartered in Dubai, UAE and San Francisco, CA, backing early-stage Web3 and Tech startups.");
  return (
    <>
      <Hero title="Empowering Innovation Through Strategic Capital" text="Velero Capital is a private investment syndicate headquartered in Dubai, UAE and San Francisco, CA dedicated to backing early-stage Web3/blockchain and Tech startup ecosystems. We’re a vibrant network of investors, industry experts, dealmakers, and operational leaders. Only approved projects and investors can participate." compact />

      <Section className="!pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Blockchain & Web3" icon={Icons.layers} text="Since 2017, our experts have been deeply involved in the blockchain and cryptocurrency space, advising as venture capital, strategic partnerships, investments, and fundraising. Our expertise spans project evaluation, cryptocurrency markets, tokenomics, and blockchain-based solutions." />
          <FeatureCard title="Tech" icon={Icons.rocket} text="We partner with high-potential tech across sectors such as AI, SaaS, robotics, fintech, health tech, and space tech. We support founders from seed stage to pre-IPO with capital, strategic guidance, and access to our global investor network. Our team actively helps shape go-to-market strategies, product roadmaps, and investor narratives to position startups for long-term success." />
        </div>
      </Section>

      <Section className="!pt-0"><Stats /></Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card relative overflow-hidden p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />
            <h3 className="text-xl font-medium">Our Vision</h3>
            <p className="mt-3 text-muted">To accelerate the future of decentralised finance and innovation by empowering visionary founders and connecting global capital with the world’s most promising Web3 and tech.</p>
          </div>
          <div className="card relative overflow-hidden p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo/25 blur-3xl" />
            <h3 className="text-xl font-medium">Our Mission</h3>
            <p className="mt-3 text-muted">We bridge the gap between bold ideas and strategic capital. We provide tailored investment solutions, deep market expertise, and global investor networks to help startups scale, disrupt markets, and create lasting impact.</p>
          </div>
        </div>
      </Section>

      <Section>
        <Heading title="Our Core Values" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => <FeatureCard key={v.title} {...v} />)}
        </div>
      </Section>

      <Section>
        <Heading title="What Sets Us Apart" />
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((d, i) => <FeatureCard key={d.title} title={d.title} text={d.text} icon={[Icons.eye, Icons.users, Icons.bolt][i]} />)}
        </div>
      </Section>

      <CTA />
    </>
  );
}
