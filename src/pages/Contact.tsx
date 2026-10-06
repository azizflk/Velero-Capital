import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { S, gap, row } from "@/components/VeleroStory";
import { CONTACT_EMAIL, offices } from "@/data/site";
import { submitForm } from "@/lib/forms";
import { useTitle } from "@/lib/useTitle";

type Role = "investor" | "founder";
type Goal = "raise" | "services";

const investorTypes = ["Family office", "Institutional investor", "Fund or asset manager", "Venture or private equity firm", "Individual professional investor", "Other"];
const strategies = ["Late-Stage & Pre-IPO", "Secondaries", "Real Estate", "Co-Investments & Syndicates"];
const tickets = ["Under USD 1m", "USD 1m to 5m", "USD 5m to 20m", "USD 20m to 50m", "USD 50m+", "Varies by opportunity"];
const horizons = ["Ready to allocate now", "Within 3 months", "Within 6 to 12 months", "Exploring"];

const stages = ["Seed", "Series A", "Series B", "Series C or later", "Pre-IPO", "Real estate project", "Other"];
const raises = ["Under USD 5m", "USD 5m to 20m", "USD 20m to 50m", "USD 50m to 100m", "USD 100m+", "Not yet determined"];
const services = ["Fundraising Advisory", "Corporate Development", "M&A Advisory", "Cap Table & Equity Advisory", "Valuation & Modelling"];
const timings = ["Under 30 days", "30 to 90 days", "3 to 6 months", "6 to 12 months", "Planning stage"];
const materials = ["Financial model and data room", "Financial model and investor materials", "Historical financial statements", "Initial company or project summary", "Preparation required"];

const box = "w-full rounded-md border border-ink/20 bg-white/70 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/40 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue";

function Field({ label, optional, hint, children, wide }: { label: string; optional?: boolean; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[13px] font-semibold">{label}{optional && <span className="ml-1.5 font-normal text-ink/50">(optional)</span>}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[12px] leading-snug text-ink/55">{hint}</span>}
    </label>
  );
}

function Choice({ name, placeholder, options, defaultValue = "" }: { name: string; placeholder: string; options: string[]; defaultValue?: string }) {
  return (
    <select name={name} required defaultValue={defaultValue} className={box}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/** Large either/or buttons that decide which questions follow. */
function Pick<T extends string>({ legend, name, value, onChange, options }: { legend: string; name: string; value: T | null; onChange: (v: T) => void; options: { value: T; title: string; text: string }[] }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-[13px] font-semibold">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label key={o.value} className={`cursor-pointer rounded-md border px-4 py-3.5 transition-colors ${on ? "border-blue bg-blue text-white" : "border-ink/20 bg-white/70 hover:border-blue"}`}>
              <input type="radio" name={name} value={o.title} checked={on} onChange={() => onChange(o.value)} required className="sr-only" />
              <span className="display block text-xl">{o.title}</span>
              <span className={`mt-1 block text-[13px] leading-snug ${on ? "text-white/85" : "text-ink/65"}`}>{o.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Checks({ legend, name, options }: { legend: string; name: string; options: string[] }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-[13px] font-semibold">{legend}</legend>
      <div className="grid gap-2 text-[14px] sm:grid-cols-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-3 rounded-md border border-ink/20 bg-white/70 px-3.5 py-2.5"><input type="checkbox" name={name} value={o} className="h-4 w-4 accent-[#023ccf]" />{o}</label>
        ))}
      </div>
    </fieldset>
  );
}

// Berlin, in the same pen as the scenes on the homepage.
const tvTower = { w: 60, d: "L 26 0 L 28 190 C 6 190 6 226 30 226 L 30 312 L 30 226 C 54 226 54 190 32 190 L 34 0 L 60 0" };
const gate = { w: 180, d: "L 6 0 L 6 100 L 22 100 L 22 0 L 34 0 L 34 100 L 50 100 L 50 0 L 62 0 L 62 100 L 78 100 L 78 0 L 90 0 L 90 100 L 106 100 L 106 0 L 118 0 L 118 100 L 134 100 L 134 0 L 146 0 L 146 100 L 168 100 L 168 122 L 116 122 L 116 136 L 96 136 L 84 158 L 72 136 L 52 136 L 52 122 L 0 122 L 0 100 L 162 100 L 162 0 L 180 0" };

const cities = [
  { label: "San Francisco", scenes: [S.bridge, gap(20), S.pyramid] },
  { label: "Dubai", scenes: [S.dubai, S.palm] },
  { label: "Berlin", scenes: [tvTower, gap(20), gate] },
];

/** Three cities on one unbroken line. */
function Skyline() {
  const W = 1400, H = 350, base = 335, between = 60;
  const scenes = [S.wave, ...cities.flatMap((c, i) => (i ? [gap(between), ...c.scenes] : c.scenes)), S.wave];
  const start = (W - scenes.reduce((n, s) => n + s.w, 0)) / 2;
  let x = start + S.wave.w;
  const labels = cities.map((c) => {
    const w = c.scenes.reduce((n, s) => n + s.w, 0);
    const mid = x + w / 2;
    x += w + between;
    return { label: c.label, left: (mid / W) * 100 };
  });
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-white" role="img" aria-label="One-line drawing of San Francisco, Dubai and Berlin">
        <path d={`M 0 ${base} L ${start} ${base} ${row(scenes, start, base, 1).d} L ${W} ${base}`} pathLength={1} className="one-line" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative mt-3 h-4">
        {labels.map((l) => (
          <span key={l.label} className="absolute -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[10px]" style={{ left: `${l.left}%` }}>{l.label}</span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { title: "We review the enquiry", text: "The team looks at the objective, your authority, the jurisdiction, the timing, the size and how ready the information is." },
  { title: "We arrange a call", text: "A first conversation covers the commercial objective, the timetable and the information needed for a proper review." },
  { title: "Scope is documented", text: "Where the work goes ahead, the scope, responsibilities, deliverables and commercial terms are agreed in writing." },
];

export default function Contact() {
  useTitle("Contact", "Start a confidential conversation with Velero Capital about raising capital, a transaction, liquidity, or access to private markets.");
  const [params] = useSearchParams();
  const preset = useMemo(() => {
    const want = (params.get("service") || "").toLowerCase();
    return services.find((i) => i.toLowerCase() === want) ?? "";
  }, [params]);
  const [role, setRole] = useState<Role | null>(preset ? "founder" : null);
  const [goal, setGoal] = useState<Goal | null>(preset ? "services" : null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // filled only by bots
    data.delete("website");
    setState("sending");
    const fields: Record<string, string> = {};
    for (const k of new Set(data.keys())) fields[k] = data.getAll(k).map(String).join(", ");
    const about = role === "investor" ? "Investor" : goal === "raise" ? "Founder raising capital" : "Founder, advisory services";
    const r = await submitForm(`Website enquiry: ${about}`, fields);
    setState(r.ok ? "sent" : "error");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,.16),transparent_55%)]" />
        <div className="wrap relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <Link to="/" className="hover:text-white">Home</Link> <span aria-hidden>›</span> <span className="text-white">Contact</span>
          </nav>
          <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Let’s talk</div>
              <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">We’d like to hear from you</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">Whether you are raising capital, buying or selling a business, seeking liquidity or looking for access to private markets, it starts with a confidential conversation with a senior member of our team.</p>
            </div>
            <div className="lg:col-span-5"><Skyline /></div>
          </div>
        </div>
      </section>

      {/* Form and contact card */}
      <section className="wrap grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">Start a conversation</div>
          <div className="mt-3 h-px w-10 bg-blue" />
          <h2 className="display mt-5 text-4xl sm:text-5xl">Tell us who you are</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/80">Choose the option that describes you and we will ask only what is relevant. We review each enquiry for fit before arranging a first conversation. Please do not send confidential documents through this form.</p>

          {state === "sent" ? (
            <div className="mt-8 rounded-md border border-rule bg-white/70 p-6 text-[15px]">
              <strong>Thank you.</strong> We have your enquiry and will come back to you once we have reviewed it.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Pick legend="I am" name="i_am" value={role} onChange={setRole} options={[
                { value: "investor", title: "An investor", text: "I want to join the Velero investor network and see opportunities." },
                { value: "founder", title: "A founder", text: "I want to raise capital or use Velero’s advisory services." },
              ]} />

              {role === "founder" && (
                <Pick legend="I’m looking to" name="looking_to" value={goal} onChange={setGoal} options={[
                  { value: "raise", title: "Raise capital", text: "A funding round, a secondary sale or project financing." },
                  { value: "services", title: "Use our services", text: "Advisory on fundraising, M&A, cap table or valuation." },
                ]} />
              )}

              {role === "investor" && (
                <>
                  <Field label="Name"><input name="name" required className={box} autoComplete="name" /></Field>
                  <Field label="Firm / family office"><input name="organisation" required className={box} autoComplete="organization" /></Field>
                  <Field label="Email"><input name="email" type="email" required className={box} autoComplete="email" /></Field>
                  <Field label="Phone" optional><input name="phone" type="tel" className={box} autoComplete="tel" /></Field>
                  <Field label="Investor type"><Choice name="investor_type" placeholder="Select a type…" options={investorTypes} /></Field>
                  <Field label="Based in"><input name="jurisdiction" required className={box} placeholder="Country or region" /></Field>
                  <Checks legend="Opportunities I want to see" name="strategies" options={strategies} />
                  <Field label="Typical ticket size"><Choice name="ticket" placeholder="Select a size…" options={tickets} /></Field>
                  <Field label="Allocation timing"><Choice name="timing" placeholder="Select timing…" options={horizons} /></Field>
                  <Field label="Sectors, regions or companies of interest" optional wide><textarea name="interests" rows={4} className={`${box} resize-y`} placeholder="Tell us what you are looking for, and anything you already hold or want to avoid" /></Field>
                </>
              )}

              {role === "founder" && goal && (
                <>
                  <Field label="Name"><input name="name" required className={box} autoComplete="name" /></Field>
                  <Field label="Company"><input name="organisation" required className={box} autoComplete="organization" /></Field>
                  <Field label="Email"><input name="email" type="email" required className={box} autoComplete="email" /></Field>
                  <Field label="Phone" optional><input name="phone" type="tel" className={box} autoComplete="tel" /></Field>
                  <Field label="Your role"><input name="role" required className={box} placeholder="Founder, CEO, CFO…" /></Field>
                  <Field label="Company based in"><input name="jurisdiction" required className={box} placeholder="Country or region" /></Field>
                  <Field label="Sector"><input name="sector" required className={box} placeholder="AI, fintech, real estate…" /></Field>
                  <Field label="Website" optional><input name="company_website" className={box} placeholder="company.com" /></Field>
                  {goal === "raise" ? (
                    <>
                      <Field label="Stage"><Choice name="stage" placeholder="Select a stage…" options={stages} /></Field>
                      <Field label="Amount you are raising"><Choice name="raise" placeholder="Select an amount…" options={raises} /></Field>
                      <Field label="Target timing"><Choice name="timing" placeholder="Select timing…" options={timings} /></Field>
                      <Field label="Materials available"><Choice name="materials" placeholder="Select readiness…" options={materials} /></Field>
                      <Field label="Traction and existing investors" optional wide><input name="facts" className={box} placeholder="Revenue, growth, last round, lead investors or another relevant measure" /></Field>
                      <Field label="The raise and use of funds" wide><textarea name="objective" required rows={5} className={`${box} resize-y`} placeholder="Describe the round, what the capital is for and the kind of investor you want" /></Field>
                    </>
                  ) : (
                    <>
                      <Field label="Service"><Choice name="service" placeholder="Select a service…" options={services} defaultValue={preset} /></Field>
                      <Field label="Target timing"><Choice name="timing" placeholder="Select timing…" options={timings} /></Field>
                      <Field label="Relevant financial facts" optional wide><input name="facts" className={box} placeholder="Revenue, EBITDA, last valuation or another relevant measure" /></Field>
                      <Field label="What you need help with" wide><textarea name="objective" required rows={5} className={`${box} resize-y`} placeholder="Describe the situation, the decision you face and the outcome you want" /></Field>
                    </>
                  )}
                </>
              )}

              {(role === "investor" || (role === "founder" && goal)) && (<>
              <div className="space-y-3 text-[13px] sm:col-span-2">
                {role === "investor" && <label className="flex items-start gap-3"><input type="checkbox" name="confirm_professional" value="yes" required className="mt-0.5 h-4 w-4 accent-[#023ccf]" /><span>I confirm that I am, or represent, a professional or accredited investor in my jurisdiction.</span></label>}
                <label className="flex items-start gap-3"><input type="checkbox" name="confirm_authority" value="yes" required className="mt-0.5 h-4 w-4 accent-[#023ccf]" /><span>I confirm that I have authority to make this enquiry, or am acting for an authorised decision-maker.</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" name="confirm_terms" value="yes" required className="mt-0.5 h-4 w-4 accent-[#023ccf]" /><span>I understand that any engagement is subject to due diligence and to a written scope, responsibilities and commercial terms.</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" name="confirm_privacy" value="yes" required className="mt-0.5 h-4 w-4 accent-[#023ccf]" /><span>I agree to the <Link to="/privacy/" className="textlink">privacy policy</Link>.</span></label>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" disabled={state === "sending"} className="pill pill-blue">{state === "sending" ? "Sending…" : "Request a conversation"}</button>
                {state === "error" && <span className="text-[13px] text-red-700">That didn’t send. Please email {CONTACT_EMAIL}.</span>}
              </div>
              </>)}
            </form>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl bg-blue p-8 text-white lg:sticky lg:top-28">
            <h2 className="display text-3xl">Get in touch</h2>
            <dl className="mt-6">
              <div className="border-b border-white/20 pb-5">
                <dt className="text-[14px] font-semibold">Email</dt>
                <dd className="mt-1"><a href={`mailto:${CONTACT_EMAIL}`} className="text-[15px] text-white/90 underline-offset-4 hover:underline">{CONTACT_EMAIL}</a></dd>
              </div>
              <div className="pt-5">
                <dt className="text-[14px] font-semibold">Offices</dt>
                <dd className="mt-2 space-y-3 text-[14px] leading-relaxed text-white/85">
                  {offices.map((o) => (
                    <div key={o.region}><span className="block font-medium text-white">{o.region === "United Arab Emirates" ? "Dubai" : o.region}</span>{o.address}</div>
                  ))}
                </dd>
              </div>
            </dl>
            <a href={`mailto:${CONTACT_EMAIL}`} className="pill mt-7 w-full justify-center border-white bg-white text-blue hover:bg-white/90 hover:text-blue">Email us</a>
            <p className="mt-5 text-[12px] leading-relaxed text-white/70">Send confidential materials only through the contact details above. See our <Link to="/privacy/" className="underline underline-offset-2 hover:text-white">privacy policy</Link>.</p>
          </div>
        </aside>
      </section>

      {/* What happens next */}
      <section className="border-t border-rule bg-white">
        <div className="wrap py-16 sm:py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">What happens next</div>
            <div className="mx-auto mt-3 h-px w-10 bg-blue" />
            <h2 className="display mt-5 text-4xl sm:text-5xl">A short, staged first step</h2>
            <p className="serif mt-4 text-[17px] italic text-ink/65">The form gives us the commercial facts we need for a first review of fit.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg border border-rule bg-paper p-6">
                <div className="display text-3xl text-blue">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="display mt-4 text-2xl">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/80">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/services/" className="pill">Review how we work</Link>
            <Link to="/verification/" className="pill">Verify official contacts</Link>
            <Link to="/privacy/" className="pill">Privacy policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
