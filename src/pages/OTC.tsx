import { useState, type FormEvent } from "react";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import { Section, Heading } from "@/components/Section";
import { FeatureCard, Check, Icons } from "@/components/Cards";
import { Input, Label } from "@/components/Field";
import { submitForm } from "@/lib/forms";
import { useTitle } from "@/lib/useTitle";

const leads = [
  { title: "Steady Capital Flow", text: "With Velero Capital’s OTC services, raise essential funds while maintaining token value and market stability — ensuring a reliable stream of capital.", icon: Icons.trend },
  { title: "Transparency at Every Step", text: "Our process is built on clarity. We share detailed insights throughout, so you stay informed and confident during the entire capital raise.", icon: Icons.eye },
  { title: "Minimal Market Disruption", text: "Our advanced trading algorithms execute with precision, helping you raise capital while preserving asset value and reducing price volatility.", icon: Icons.chart },
  { title: "OTC Solutions", text: "We prioritise fair outcomes for everyone. Our sustainable OTC deals deliver steady cash flow to projects while protecting retail markets from price shocks.", icon: Icons.coins },
  { title: "Privacy and Confidentiality", text: "Velero Capital ensures full privacy and secure handling of all your transactions.", icon: Icons.lock },
  { title: "Proven Trust & Reliability", text: "We’re proud to maintain a 100% client satisfaction rate for our OTC services — with zero complaints since inception.", icon: Icons.star },
];

function ProposalForm({ id }: { id: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const r = await submitForm("OTC proposal request", { email: String(f.get("email")), telegram: String(f.get("telegram")), listing: String(f.get("listing")) });
    setState(r.ok ? "sent" : "error");
  };
  if (state === "sent") return <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">Thanks — we’ll be in touch shortly.</p>;
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3">
      <div><Label htmlFor={`${id}-email`}>Email</Label><Input id={`${id}-email`} name="email" type="email" required placeholder="you@project.xyz" /></div>
      <div><Label htmlFor={`${id}-tg`}>Telegram ID</Label><Input id={`${id}-tg`} name="telegram" placeholder="@yourhandle" /></div>
      <div><Label htmlFor={`${id}-cmc`}>CMC / CoinGecko Link</Label><Input id={`${id}-cmc`} name="listing" type="url" placeholder="https://" /></div>
      <div className="sm:col-span-3 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Get a Proposal"}</Button>
        {state === "error" && <span className="text-sm text-rose-400">Couldn’t send. Please email us directly.</span>}
        <span className="text-xs text-muted">No obligations. No upfront costs. 100% transparent.</span>
      </div>
    </form>
  );
}

export default function OTC() {
  useTitle("OTC Investment", "High-trust OTC solutions for the digital asset elite. Daily OTC deals in utility tokens create steady cash flow and sustainable value.");
  return (
    <>
      <Hero title="OTC Investment" text="High-trust OTC solutions for the digital asset elite." compact />

      <Section className="!pt-0">
        <div className="card glow p-8 sm:p-10">
          <h2 className="text-2xl font-medium">Discover how we can build a win-win together</h2>
          <p className="mt-2 mb-6 text-sm text-muted">Get in touch with your pitch.</p>
          <ProposalForm id="top" />
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Heading center={false} eyebrow="Daily OTC Allocations into High-Utility Tokens" title="Daily Over-The-Counter deals, built to last" text="Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved." />
            <div className="flex flex-wrap gap-5"><Check>Reliable Deals</Check><Check>Consistent Returns</Check><Check>A Win-Win Approach</Check></div>
          </div>
          <div className="grid gap-4">
            <FeatureCard title="Reliable Capital Inflow with Velero Capital" text="Our OTC services with partners enable daily token-for-USDT/USD deals at discounted rates, ensuring steady capital inflow." icon={Icons.coins} />
            <FeatureCard title="Open & Aligned" text="Velero builds trust through transparency and teamwork. With regular check-ins, market insights, and token-based payments, we create strong, growth-focused partnerships." icon={Icons.users} />
          </div>
        </div>
      </Section>

      <Section>
        <Heading title="How We Lead the Way" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((l) => <FeatureCard key={l.title} {...l} />)}
        </div>
      </Section>

      <Section>
        <div className="card p-8 sm:p-10">
          <h2 className="text-2xl font-medium">Discover how we can build a win-win together</h2>
          <p className="mt-2 mb-6 text-sm text-muted">Get in touch with your pitch.</p>
          <ProposalForm id="bottom" />
        </div>
      </Section>

      <CTA />
    </>
  );
}
