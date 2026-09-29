import { useState, type FormEvent } from "react";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { Section } from "@/components/Section";
import { Input, Label } from "@/components/Field";
import { officialAccounts } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

type Result = { ok: boolean; kind: "telegram" | "email"; value: string } | null;

function check(raw: string): Result {
  const v = raw.trim().replace(/^@/, "");
  if (!v) return null;
  if (v.includes("@")) {
    const domain = v.split("@").pop()!.toLowerCase();
    return { ok: officialAccounts.emailDomains.includes(domain), kind: "email", value: v.toLowerCase() };
  }
  const handle = v.replace(/^(https?:\/\/)?(t\.me\/)/i, "");
  return { ok: officialAccounts.telegram.some((h) => h.toLowerCase() === handle.toLowerCase()), kind: "telegram", value: handle };
}

export default function Verification() {
  useTitle("Account Verification", "Confirm whether an email or Telegram account is officially associated with Velero Capital.");
  const [result, setResult] = useState<Result>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(check(String(new FormData(e.currentTarget).get("account"))));
  };
  return (
    <>
      <Hero title="Beware of Scammers" text="We’ve seen increasing attempts of impersonation. To protect yourself, please use this verification tool to confirm if an email or Telegram account is officially associated with Velero Capital." compact />
      <Section className="!pt-0">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-5">
          <div className="card glow p-8 lg:col-span-3">
            <h2 className="text-2xl font-medium">Account Verification</h2>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="account">Telegram Handle / Email</Label>
                <Input id="account" name="account" required placeholder="velerocapital or name@velero.capital" autoComplete="off" />
              </div>
              <Button type="submit">Verify</Button>
            </form>
            {result && (
              <div className={`mt-6 rounded-xl border p-5 text-sm ${result.ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : "border-rose-500/40 bg-rose-500/10 text-rose-200"}`} role="status">
                {result.ok ? (
                  <><strong>Verified.</strong> <span className="font-mono">{result.value}</span> is an official Velero Capital {result.kind === "email" ? "email address" : "Telegram account"}.</>
                ) : (
                  <><strong>Not recognised.</strong> <span className="font-mono">{result.value}</span> is <u>not</u> an official Velero Capital {result.kind === "email" ? "email address" : "Telegram account"}. Do not share funds or personal data with this account.</>
                )}
              </div>
            )}
          </div>
          <div className="space-y-4 text-sm text-muted lg:col-span-2">
            <div className="card p-6">
              <p>When entering a Telegram handle, please do not include the “@” symbol. Simply type the username (e.g., <span className="text-white">velerocapital</span>, not @velerocapital) to avoid input errors.</p>
              <p className="mt-3">When entering an email address, make sure there are no extra spaces before or after the email — even a small typo can cause errors.</p>
            </div>
            <div className="card border-amber-500/30 bg-amber-500/5 p-6 text-amber-200/90">
              <p className="font-medium text-amber-100">We do not reach out through unofficial channels.</p>
              <p className="mt-2">If someone contacts you claiming to represent Velero Capital, always verify their identity here first. We are not responsible for any communication or offers made outside of our verified accounts.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
