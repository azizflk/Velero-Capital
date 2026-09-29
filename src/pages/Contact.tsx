import { useState, type FormEvent } from "react";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { Section } from "@/components/Section";
import { Input, Label, Select, Textarea } from "@/components/Field";
import { CONTACT_EMAIL, offices } from "@/data/site";
import { submitForm } from "@/lib/forms";
import { useTitle } from "@/lib/useTitle";

const types = ["Web3 - OTC Investment", "Web3 - Fundraising", "Web3 - Crypto Marketing", "Tech Startup Investments", "Partnerships"];

export default function Contact() {
  useTitle("Contact us", "Get in touch with Velero Capital. Our portfolio managers are hands-on, offering daily support.");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const fields = Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v)]));
    const r = await submitForm(`Website enquiry: ${fields.type || "General"}`, fields);
    setState(r.ok ? "sent" : "error");
  };
  return (
    <>
      <Hero title="Contact Us" text="Our portfolio managers are hands-on, offering daily support. From marketing to community-building, our incubation and growth team works alongside your project to connect you with the resources and network you need to succeed." compact />
      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="card p-8 lg:col-span-3">
            {state === "sent" ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-emerald-300">Thanks for reaching out. We’ll get back to you shortly.</div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="name">Full name</Label><Input id="name" name="name" required /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
                <div><Label htmlFor="listing">Project CMC/CG Link</Label><Input id="listing" name="listing" type="url" placeholder="https://" /></div>
                <div>
                  <Label htmlFor="type">Enquiry type</Label>
                  <Select id="type" name="type" required defaultValue="">
                    <option value="" disabled>Enquiry type</option>
                    {types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </div>
                <div className="sm:col-span-2"><Label htmlFor="message">Your message</Label><Textarea id="message" name="message" required /></div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                  <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit"}</Button>
                  {state === "error" && <span className="text-sm text-rose-400">Couldn’t send. Please email {CONTACT_EMAIL}.</span>}
                  <span className="text-xs text-muted">To attach a deck, email it to {CONTACT_EMAIL}.</span>
                </div>
              </form>
            )}
          </div>
          <div className="space-y-4 lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-sm font-medium text-muted">Email</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block text-lg hover:text-cyan">{CONTACT_EMAIL}</a>
            </div>
            {offices.map((o) => (
              <div key={o.region} className="card p-6">
                <h3 className="text-sm font-medium text-muted">{o.region}</h3>
                <p className="mt-1">{o.address}</p>
              </div>
            ))}
            <div className="card border-amber-500/30 bg-amber-500/5 p-6 text-sm text-amber-200/90">
              Unsure if someone claiming to be from Velero Capital is genuine? <a href="/verification/" className="underline hover:text-amber-100">Verify their account</a> before you reply.
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
