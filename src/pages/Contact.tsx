import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { SidebarPage, Section } from "@/components/Layout";
import Button from "@/components/Button";
import { Input, Label, Select, Textarea } from "@/components/Field";
import { CONTACT_EMAIL, offices } from "@/data/site";
import { submitForm } from "@/lib/forms";
import { useTitle } from "@/lib/useTitle";

const types = ["Late-Stage & Pre-IPO", "Secondaries", "Real Estate", "Co-Investments & Syndicates", "Advisory Services", "Partnerships"];

export default function Contact() {
  useTitle("Contact", "Get in touch with Velero Capital. Our portfolio managers are hands-on, offering daily support.");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setState("sending");
    const fields = Object.fromEntries([...new FormData(e.currentTarget).entries()].map(([k, v]) => [k, String(v)]));
    const r = await submitForm(`Website enquiry: ${fields.type || "General"}`, fields);
    setState(r.ok ? "sent" : "error");
  };
  return (
    <SidebarPage title="Contact" intro="Tell us about your mandate — whether you are an investor seeking access or a company seeking advice — and the right member of our team will come back to you.">
      <Section>
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {state === "sent" ? (
              <p className="border-t border-rule py-4 text-[14px]">Thanks for reaching out. We’ll get back to you shortly.</p>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-7 sm:grid-cols-2">
                <div><Label htmlFor="name">Full name</Label><Input id="name" name="name" required /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
                <div><Label htmlFor="listing">Organisation</Label><Input id="listing" name="organisation" placeholder="Family office, fund or company" /></div>
                <div>
                  <Label htmlFor="type">Enquiry type</Label>
                  <Select id="type" name="type" required defaultValue="">
                    <option value="" disabled>Select</option>
                    {types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </div>
                <div className="sm:col-span-2"><Label htmlFor="message">Your message</Label><Textarea id="message" name="message" required /></div>
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <Button type="submit" variant="blue" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit"}</Button>
                  {state === "error" && <span className="text-[13px] text-red-700">Couldn’t send. Please email {CONTACT_EMAIL}.</span>}
                  <span className="text-[12px] text-ink/60">To attach a deck, email it to {CONTACT_EMAIL}.</span>
                </div>
              </form>
            )}
          </div>
          <div className="space-y-6 text-[13px] lg:col-span-4">
            <div className="border-t border-rule pt-3"><div className="eyebrow">Email</div><a href={`mailto:${CONTACT_EMAIL}`} className="textlink">{CONTACT_EMAIL}</a></div>
            {offices.map((o) => <div key={o.region} className="border-t border-rule pt-3"><div className="eyebrow">{o.region}</div><p>{o.address}</p></div>)}
            <div className="border-t border-rule pt-3 text-ink/70">Unsure if someone claiming to be from Velero Capital is genuine? <Link to="/verification/" className="textlink text-ink">Verify their account</Link> before you reply.</div>
          </div>
        </div>
      </Section>
    </SidebarPage>
  );
}
