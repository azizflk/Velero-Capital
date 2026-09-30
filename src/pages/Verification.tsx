import { useState, type FormEvent } from "react";
import { SidebarPage, Section, Prose } from "@/components/Layout";
import Button from "@/components/Button";
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setResult(check(String(new FormData(e.currentTarget).get("account")))); };
  return (
    <SidebarPage title="Account verification: beware of scammers" intro="We’ve seen increasing attempts of impersonation. Use this tool to confirm whether an email or Telegram account is officially associated with Velero Capital.">
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="max-w-md space-y-6">
              <div>
                <Label htmlFor="account">Telegram handle / email</Label>
                <Input id="account" name="account" required placeholder="velerocapital or name@velero.capital" autoComplete="off" />
              </div>
              <Button type="submit" variant="blue">Verify</Button>
            </form>
            {result && (
              <div className={`mt-8 max-w-md border-l-2 pl-4 text-[14px] ${result.ok ? "border-emerald-700" : "border-red-700"}`} role="status">
                {result.ok ? (
                  <><strong>Verified.</strong> <span className="font-mono">{result.value}</span> is an official Velero Capital {result.kind === "email" ? "email address" : "Telegram account"}.</>
                ) : (
                  <><strong>Not recognised.</strong> <span className="font-mono">{result.value}</span> is <u>not</u> an official Velero Capital {result.kind === "email" ? "email address" : "Telegram account"}. Do not share funds or personal data with this account.</>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <Prose className="text-[13px]">
              <p>When entering a Telegram handle, please do not include the “@” symbol. Simply type the username (e.g., <strong>velerocapital</strong>, not @velerocapital) to avoid input errors.</p>
              <p>When entering an email address, make sure there are no extra spaces before or after the email — even a small typo can cause errors.</p>
              <p className="border-t border-rule pt-4 font-medium text-ink">We do not reach out through unofficial channels.</p>
              <p>If someone contacts you claiming to represent Velero Capital, always verify their identity here first. We are not responsible for any communication or offers made outside of our verified accounts.</p>
            </Prose>
          </div>
        </div>
      </Section>
    </SidebarPage>
  );
}
