import { useState, type FormEvent } from "react";
import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { Input, Label } from "@/components/Field";
import { submitForm } from "@/lib/forms";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "overview", label: "Overview" },
  { id: "how", label: "How we lead the way" },
  { id: "proposal", label: "Get a proposal" },
];

function ProposalForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setState("sending");
    const f = new FormData(e.currentTarget);
    const r = await submitForm("OTC proposal request", { email: String(f.get("email")), telegram: String(f.get("telegram")), listing: String(f.get("listing")) });
    setState(r.ok ? "sent" : "error");
  };
  if (state === "sent") return <p className="border-t border-rule py-4 text-[14px]">Thanks — we’ll be in touch shortly.</p>;
  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-6 sm:grid-cols-3">
      <div><Label htmlFor="p-email">Email</Label><Input id="p-email" name="email" type="email" required placeholder="you@project.xyz" /></div>
      <div><Label htmlFor="p-tg">Telegram ID</Label><Input id="p-tg" name="telegram" placeholder="yourhandle" /></div>
      <div><Label htmlFor="p-cmc">CMC / CoinGecko link</Label><Input id="p-cmc" name="listing" type="url" placeholder="https://" /></div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
        <Button type="submit" variant="blue" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Get a Proposal"}</Button>
        {state === "error" && <span className="text-[13px] text-red-700">Couldn’t send. Please email us directly.</span>}
        <span className="text-[12px] text-ink/60">No obligations. No upfront costs. 100% transparent.</span>
      </div>
    </form>
  );
}

export default function OTC() {
  useTitle("OTC Investment", "High-trust OTC solutions for the digital asset elite. Daily OTC deals in utility tokens create steady cash flow and sustainable value.");
  return (
    <SidebarPage title="OTC Investment: high-trust OTC solutions for the digital asset elite" intro="Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value — for everyone involved." anchors={anchors}>
      <Section id="overview">
        <Cols items={[
          { title: "Reliable Deals", text: "Our OTC services with partners enable daily token-for-USDT/USD deals at discounted rates, ensuring steady capital inflow." },
          { title: "Consistent Returns", text: "Raise essential funds while maintaining token value and market stability — ensuring a reliable stream of capital." },
          { title: "A Win-Win Approach", text: "Velero builds trust through transparency and teamwork. Regular check-ins, market insights, and token-based payments create strong, growth-focused partnerships." },
        ]} />
      </Section>

      <Section id="how" title="How we lead the way">
        <Cols cols={2} items={[
          { title: "Steady Capital Flow", text: "With Velero Capital’s OTC services, raise essential funds while maintaining token value and market stability — ensuring a reliable stream of capital." },
          { title: "Transparency at Every Step", text: "Our process is built on clarity. We share detailed insights throughout, so you stay informed and confident during the entire capital raise." },
          { title: "Minimal Market Disruption", text: "Our advanced trading algorithms execute with precision, helping you raise capital while preserving asset value and reducing price volatility." },
          { title: "OTC Solutions", text: "We prioritise fair outcomes for everyone. Our sustainable OTC deals deliver steady cash flow to projects while protecting retail markets from price shocks." },
          { title: "Privacy and Confidentiality", text: "Velero Capital ensures full privacy and secure handling of all your transactions." },
          { title: "Proven Trust & Reliability", text: "We’re proud to maintain a 100% client satisfaction rate for our OTC services — with zero complaints since inception." },
        ]} />
      </Section>

      <Section title="Daily OTC allocations into high-utility tokens">
        <List items={["No obligations", "No upfront costs", "100% transparent", "Discounted rates on token-for-USDT/USD deals", "Daily allocations, steady capital inflow"]} />
      </Section>

      <Section id="proposal" title="Discover how we can build a win-win together">
        <Prose className="mb-8"><p>Get in touch with your pitch.</p></Prose>
        <ProposalForm />
      </Section>
    </SidebarPage>
  );
}
