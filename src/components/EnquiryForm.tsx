import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * The enquiry questions, written once. The public contact form, the account area and the admin panel
 * all read them from here, so a question, its wording and its field name can never drift apart.
 */

export type Role = "investor" | "founder" | "sponsor";
export const ROLES: Role[] = ["investor", "founder", "sponsor"];
export type Goal = "raise" | "services";
export const GOALS: Goal[] = ["raise", "services"];
export type Answers = Record<string, string>;

const sponsorRoles = ["Company / issuer", "Existing shareholder", "Real estate sponsor, developer or owner", "Fund manager (GP)", "Adviser, placement agent or introducer", "Other"];
const opportunityTypes = ["Primary round", "Secondary block of shares", "Real estate transaction", "Fund interest (LP stake)", "Other"];
const authorities = ["Owner or principal", "Authorised representative of the principal", "Introducer with a written mandate", "Introducer without a mandate yet"];
const investorTypes = ["Family office", "Institutional investor", "Fund or asset manager", "Venture or private equity firm", "Individual professional investor", "Other"];
const strategies = ["Late-Stage & Pre-IPO", "Secondaries", "Real Estate", "Co-Investments & Syndicates"];
const tickets = ["Under USD 1m", "USD 1m to 5m", "USD 5m to 20m", "USD 20m to 50m", "USD 50m+", "Varies by opportunity"];
const horizons = ["Ready to allocate now", "Within 3 months", "Within 6 to 12 months", "Exploring"];
const stages = ["Seed", "Series A", "Series B", "Series C or later", "Pre-IPO", "Real estate project", "Other"];
const raises = ["Under USD 5m", "USD 5m to 20m", "USD 20m to 50m", "USD 50m to 100m", "USD 100m+", "Not yet determined"];
export const services = ["Fundraising Advisory", "Corporate Development", "M&A Advisory", "Cap Table & Equity Advisory", "Valuation & Modelling", "Joint Ventures & Partnerships", "Strategic Introductions", "Market Entry & Trade Access", "Legal & Advisory Coordination", "Cross-Border Relationship Management"];
const timings = ["Under 30 days", "30 to 90 days", "3 to 6 months", "6 to 12 months", "Planning stage"];
const materials = ["Financial model and data room", "Financial model and investor materials", "Historical financial statements", "Initial company or project summary", "Preparation required"];

export const roleOptions: { value: Role; title: string; text: string }[] = [
  { value: "investor", title: "An investor", text: "I want to see opportunities that fit my mandate." },
  { value: "founder", title: "A founder", text: "I want to raise capital or use Velero’s advisory services." },
  { value: "sponsor", title: "A sponsor or intermediary", text: "I’m introducing a company, a shareholder position or a real estate transaction." },
];
export const goalOptions: { value: Goal; title: string; text: string }[] = [
  { value: "raise", title: "Raise capital", text: "A funding round, a secondary sale or project financing." },
  { value: "services", title: "Use our services", text: "Advisory on fundraising, M&A, cap table or valuation." },
];

type Def = {
  name: string;
  label: string;
  kind?: "text" | "email" | "tel" | "select" | "textarea" | "checks";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  wide?: boolean;
  rows?: number;
  autoComplete?: string;
};

const person = (organisation: string): Def[] => [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "organisation", label: organisation, autoComplete: "organization" },
  { name: "email", label: "Email", kind: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", kind: "tel", optional: true, autoComplete: "tel" },
];

const investor: Def[] = [
  ...person("Firm / family office"),
  { name: "investor_type", label: "Investor type", kind: "select", placeholder: "Select a type…", options: investorTypes },
  { name: "jurisdiction", label: "Based in", placeholder: "Country or region" },
  { name: "strategies", label: "Opportunities I want to see", kind: "checks", options: strategies },
  { name: "ticket", label: "Typical ticket size", kind: "select", placeholder: "Select a size…", options: tickets },
  { name: "timing", label: "Allocation timing", kind: "select", placeholder: "Select timing…", options: horizons },
  { name: "interests", label: "Sectors, regions or companies of interest", kind: "textarea", optional: true, wide: true, rows: 4, placeholder: "Tell us what you are looking for, and anything you already hold or want to avoid" },
];

const founder: Def[] = [
  ...person("Company"),
  { name: "role", label: "Your role", placeholder: "Founder, CEO, CFO…" },
  { name: "jurisdiction", label: "Company based in", placeholder: "Country or region" },
  { name: "sector", label: "Sector", placeholder: "AI, fintech, real estate…" },
  { name: "company_website", label: "Website", optional: true, placeholder: "company.com" },
];
const founderRaise: Def[] = [
  { name: "stage", label: "Stage", kind: "select", placeholder: "Select a stage…", options: stages },
  { name: "raise", label: "Amount you are raising", kind: "select", placeholder: "Select an amount…", options: raises },
  { name: "timing", label: "Target timing", kind: "select", placeholder: "Select timing…", options: timings },
  { name: "materials", label: "Materials available", kind: "select", placeholder: "Select readiness…", options: materials },
  { name: "facts", label: "Traction and existing investors", optional: true, wide: true, placeholder: "Revenue, growth, last round, lead investors or another relevant measure" },
  { name: "objective", label: "The raise and use of funds", kind: "textarea", wide: true, rows: 5, placeholder: "Describe the round, what the capital is for and the kind of investor you want" },
];
const founderServices: Def[] = [
  { name: "service", label: "Service", kind: "select", placeholder: "Select a service…", options: services },
  { name: "timing", label: "Target timing", kind: "select", placeholder: "Select timing…", options: timings },
  { name: "facts", label: "Relevant financial facts", optional: true, wide: true, placeholder: "Revenue, EBITDA, last valuation or another relevant measure" },
  { name: "objective", label: "What you need help with", kind: "textarea", wide: true, rows: 5, placeholder: "Describe the situation, the decision you face and the outcome you want" },
];

const sponsor: Def[] = [
  ...person("Firm"),
  { name: "sponsor_role", label: "Your role", kind: "select", placeholder: "Select your role…", options: sponsorRoles },
  { name: "authority", label: "Your authority", kind: "select", placeholder: "Select…", options: authorities },
  { name: "opportunity_type", label: "Opportunity type", kind: "select", placeholder: "Select a type…", options: opportunityTypes },
  { name: "raise", label: "Size sought", kind: "select", placeholder: "Select an amount…", options: raises },
  { name: "jurisdiction", label: "Company or asset based in", placeholder: "Country or region" },
  { name: "timing", label: "Target timing", kind: "select", placeholder: "Select timing…", options: timings },
  { name: "materials", label: "Materials available", kind: "select", wide: true, placeholder: "Select readiness…", options: materials },
  { name: "objective", label: "The opportunity", kind: "textarea", wide: true, rows: 5, placeholder: "The company or asset, its stage or status, the size sought, who is involved and any transfer restrictions or consents. Please do not include confidential documents." },
];

/** The questions for a profile, in the order they are asked. Empty until a founder has said what they want. */
export function questions(role: Role | null, goal: Goal | null): Def[] {
  if (role === "investor") return investor;
  if (role === "sponsor") return sponsor;
  if (role === "founder" && goal) return [...founder, ...(goal === "raise" ? founderRaise : founderServices)];
  return [];
}

/** True once enough has been chosen for the questions to show. */
export const chosen = (role: Role | null, goal: Goal | null) => role === "investor" || role === "sponsor" || (role === "founder" && !!goal);

/** How an enquiry is described in an email subject or a list. */
export const about = (role: Role | null, goal: Goal | null) =>
  role === "investor" ? "Investor" : role === "sponsor" ? "Opportunity submission" : goal === "raise" ? "Founder raising capital" : "Founder, advisory services";

/** The statements an applicant confirms, by field name. */
export const confirmations: { name: string; text: string; only?: Role }[] = [
  { name: "confirm_professional", text: "I confirm that I am, or represent, a professional or accredited investor in my jurisdiction.", only: "investor" },
  { name: "confirm_authority", text: "I confirm that I have authority to make this enquiry, or am acting for an authorised decision-maker." },
  { name: "confirm_terms", text: "I understand that any engagement is subject to due diligence and to a written scope, responsibilities and commercial terms." },
  { name: "confirm_privacy", text: "I agree to the privacy policy and have read the legal and disclosures page." },
];

/** Everything in a form as plain text, several ticks of one question joined with commas. The bot trap is left out. */
export function collect(form: HTMLFormElement): Answers {
  const data = new FormData(form);
  data.delete("website");
  const out: Answers = {};
  for (const k of new Set(data.keys())) out[k] = data.getAll(k).map(String).join(", ");
  return out;
}

export const box = "w-full rounded-md border border-ink/20 bg-white/70 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/40 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue";

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
    <select name={name} required defaultValue={options.includes(defaultValue) ? defaultValue : ""} className={box}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/** Large either/or buttons that decide which questions follow. */
export function Pick<T extends string>({ legend, name, value, onChange, options }: { legend: string; name: string; value: T | null; onChange: (v: T) => void; options: { value: T; title: string; text: string }[] }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-[13px] font-semibold">{legend}</legend>
      <div className={`grid gap-3 ${options.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
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

function Checks({ legend, name, options, ticked }: { legend: string; name: string; options: string[]; ticked: string[] }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-[13px] font-semibold">{legend}</legend>
      <div className="grid gap-2 text-[14px] sm:grid-cols-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-3 rounded-md border border-ink/20 bg-white/70 px-3.5 py-2.5"><input type="checkbox" name={name} value={o} defaultChecked={ticked.includes(o)} className="h-4 w-4 accent-[#023ccf]" />{o}</label>
        ))}
      </div>
    </fieldset>
  );
}

/** “I am”: the first choice. */
export function RolePick({ value, onChange }: { value: Role | null; onChange: (v: Role) => void }) {
  return <Pick legend="I am" name="i_am" value={value} onChange={onChange} options={roleOptions} />;
}

/** “I’m looking to”: asked of founders only. */
export function GoalPick({ value, onChange }: { value: Goal | null; onChange: (v: Goal) => void }) {
  return <Pick legend="I’m looking to" name="looking_to" value={value} onChange={onChange} options={goalOptions} />;
}

/** The questions for the chosen profile. `values` fills them in when an earlier draft is reopened. */
export function Questions({ role, goal, values = {} }: { role: Role | null; goal: Goal | null; values?: Answers }) {
  return (
    <>
      {questions(role, goal).map((q, i) => {
        const was = values[q.name] ?? "";
        // A question belongs to its profile: changing profile starts it afresh, so a list never keeps
        // an answer from another profile's options. A founder's own details survive a change of goal.
        const key = `${role}:${role === "founder" && i >= founder.length ? goal : ""}:${q.name}`;
        if (q.kind === "checks") return <Checks key={key} legend={q.label} name={q.name} options={q.options!} ticked={was ? was.split(", ") : []} />;
        return (
          <Field key={key} label={q.label} optional={q.optional} wide={q.wide}>
            {q.kind === "select" ? (
              <Choice name={q.name} placeholder={q.placeholder!} options={q.options!} defaultValue={was} />
            ) : q.kind === "textarea" ? (
              <textarea name={q.name} required={!q.optional} rows={q.rows} defaultValue={was} className={`${box} resize-y`} placeholder={q.placeholder} />
            ) : (
              <input name={q.name} type={q.kind === "email" || q.kind === "tel" ? q.kind : undefined} required={!q.optional} defaultValue={was} className={box} autoComplete={q.autoComplete} placeholder={q.placeholder} />
            )}
          </Field>
        );
      })}
    </>
  );
}

/** The statements ticked before sending. */
export function Confirmations({ role, values = {} }: { role: Role | null; values?: Answers }) {
  const tick = (name: string, children: ReactNode) => (
    <label key={name} className="flex items-start gap-3"><input type="checkbox" name={name} value="yes" required defaultChecked={values[name] === "yes"} className="mt-0.5 h-4 w-4 accent-[#023ccf]" /><span>{children}</span></label>
  );
  return (
    <div className="space-y-3 text-[13px] sm:col-span-2">
      {confirmations.filter((c) => !c.only || c.only === role).map((c) =>
        tick(c.name, c.name === "confirm_privacy" ? <>I agree to the <Link to="/privacy/" className="textlink">privacy policy</Link> and have read the <Link to="/legal/" className="textlink">legal and disclosures</Link> page.</> : c.text),
      )}
    </div>
  );
}

/** Saved answers as label and value pairs, for reading back an application. Unanswered questions are left out. */
export function summary(role: Role | null, goal: Goal | null, values: Answers): { label: string; value: string; wide?: boolean }[] {
  return questions(role, goal)
    .map((q) => ({ label: q.label, value: (values[q.name] ?? "").trim(), wide: q.wide || q.kind === "checks" }))
    .filter((r) => r.value);
}
