import { useState, type FormEvent } from "react";
import { SidebarPage, Section, Prose } from "@/components/Layout";
import Button from "@/components/Button";
import { Input, Label } from "@/components/Field";
import { officialAccounts } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

type Result = { ok: boolean; valid: boolean; value: string } | null;

function check(raw: string): Result {
  const v = raw.trim().toLowerCase();
  if (!v) return null;
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const domain = v.split("@").pop() ?? "";
  return { ok: valid && officialAccounts.emailDomains.includes(domain), valid, value: v };
}

export default function Verification() {
  useTitle("Account Verification", "Confirm whether an email address is officially associated with Velero Capital.");
  const [result, setResult] = useState<Result>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setResult(check(String(new FormData(e.currentTarget).get("account")))); };
  return (
    <SidebarPage title="Account verification: beware of scammers" intro="We’ve seen increasing attempts of impersonation. Use this tool to confirm whether an email address is officially associated with Velero Capital.">
      <Section>
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="max-w-md space-y-6">
              <div>
                <Label htmlFor="account">Email address</Label>
                <Input id="account" name="account" type="email" required placeholder="name@velero.capital" autoComplete="off" />
              </div>
              <Button type="submit" variant="blue">Verify</Button>
            </form>
            {result && (
              <div className={`mt-8 max-w-md border-l-2 pl-4 text-[14px] ${result.ok ? "border-emerald-700" : "border-red-700"}`} role="status">
                {result.ok ? (
                  <><strong>Verified.</strong> <span className="font-mono">{result.value}</span> is an official Velero Capital email address.</>
                ) : !result.valid ? (
                  <><strong>That doesn’t look like an email address.</strong> Please enter the full address, for example name@velero.capital.</>
                ) : (
                  <><strong>Not recognised.</strong> <span className="font-mono">{result.value}</span> is <u>not</u> an official Velero Capital email address. Do not share funds or personal data with this sender.</>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <Prose className="text-[13px]">
              <p>Enter the full email address exactly as it appears in the message you received. Make sure there are no extra spaces before or after it — even a small typo can cause errors.</p>
              <p className="border-t border-rule pt-4 font-medium text-ink">We do not reach out through unofficial channels.</p>
              <p>If someone contacts you claiming to represent Velero Capital, always verify their identity here first. We are not responsible for any communication or offers made outside of our verified accounts.</p>
            </Prose>
          </div>
        </div>
      </Section>
    </SidebarPage>
  );
}
