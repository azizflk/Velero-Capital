import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { CONTACT_EMAIL } from "@/data/site";
import { commonFaqs, groups, type Sector } from "@/data/solutions";
import { useTitle } from "@/lib/useTitle";

/** A full-width band. Bands alternate between the page colour and a warmer tint. */
function Band({ tint = false, children, id }: { tint?: boolean; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-rule ${tint ? "bg-sand/70" : ""}`}>
      <div className="wrap py-16 sm:py-20">{children}</div>
    </section>
  );
}

/** Centred section header: small label, short rule, large heading. */
function Head({ label, title, sub }: { label: string; title: ReactNode; sub?: string }) {
  return (
    <header className="mx-auto mb-10 max-w-3xl text-center">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">{label}</div>
      <div className="mx-auto mt-3 h-px w-10 bg-blue" />
      <h2 className="display mt-5 text-4xl sm:text-5xl">{title}</h2>
      {sub && <p className="serif mt-4 text-[17px] italic text-ink/65">{sub}</p>}
    </header>
  );
}

/** List rows with a ring marker and hairline dividers. */
function Rings({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mx-auto max-w-2xl">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-4 border-b border-rule py-3.5 text-[15px] last:border-b-0">
          <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full border border-blue" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Questions({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mx-auto max-w-2xl">
      {items.map((it, i) => (
        <div key={it.q} className="border-b border-rule">
          <button className="flex w-full items-center justify-between gap-6 py-4 text-left text-[15px] font-semibold hover:text-blue" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {it.q}
            <span aria-hidden className="text-xl leading-none text-blue">{open === i ? "–" : "+"}</span>
          </button>
          {open === i && <p className="pb-5 pr-8 text-[14px] leading-relaxed text-ink/80">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default function SolutionDetail({ sector }: { sector: Sector }) {
  useTitle(sector.title, sector.tagline);
  const name = sector.title.replace(/ \((FIG|FSG)\)$/, "");
  const lower = name.toLowerCase();
  const group = groups.find((g) => g.title === sector.group)!;
  const related = [...group.sectors.filter((s) => s.slug !== sector.slug), ...groups.flatMap((g) => g.sectors).filter((s) => s.group !== sector.group)].slice(0, 6);
  const facts = [
    { label: "Focus", value: sector.focus },
    { label: "Capital", value: sector.capital },
    { label: "Reach", value: "Global, led from Dubai" },
    { label: "Approach", value: "Senior-led advisory" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,.16),transparent_55%)]" />
        <div className="wrap relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <Link to="/" className="hover:text-white">Home</Link> <span aria-hidden>›</span>{" "}
            <Link to="/solutions/" className="hover:text-white">Solutions</Link> <span aria-hidden>›</span> <span className="text-white">{sector.title}</span>
          </nav>
          <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{sector.group}</div>
          <h1 className="display mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{sector.title}</h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">{sector.tagline}</p>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="scroll-mt-20">
        <div className="wrap py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">Overview</div>
            <div className="mt-3 h-px w-10 bg-blue" />
            <p className="mt-8 text-[19px] font-semibold leading-relaxed">{sector.overview}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/80">Velero Capital advises {lower} clients from Dubai, San Francisco, Los Angeles and Berlin, with a senior member of the team leading from the first call to close.</p>
          </div>
        </div>
      </section>

      {/* Our role */}
      <Band tint id="role">
        <Head label="How Velero helps" title={<>Our role on {lower} mandates</>} />
        <Rings items={sector.role} />
        <div className="mt-10 text-center"><Button to="/contact-us/" variant="blue">Discuss this with us</Button></div>
      </Band>

      {/* Illustrative mandate, or the sector focus */}
      {sector.mandate ? (
        <Band tint id="focus">
          <Head label="Illustrative mandate" title={sector.mandate.title} />
          <div className="mx-auto max-w-2xl space-y-4 text-[15px] leading-relaxed">
            <p><strong>The situation.</strong> {sector.mandate.situation}</p>
            <p><strong>What we do.</strong> {sector.mandate.did}</p>
            <p><strong>The outcome.</strong> {sector.mandate.outcome}</p>
          </div>
          <div className="mt-8"><Rings items={sector.mandate.facts.map((f) => <><strong>{f.label}:</strong> {f.value}</>)} /></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[12px] text-ink/55">An illustration of how a mandate of this kind runs, not a record of a completed transaction.</p>
        </Band>
      ) : (
        <Band tint id="focus">
          <Head label="Sector focus" title={sector.focusTitle} />
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed">{sector.focusText}</p>
          <div className="mt-8"><Rings items={facts.map((f) => <><strong>{f.label}:</strong> {f.value}</>)} /></div>
          <div className="mt-10 text-center"><Button to="/contact-us/">Discuss this sector with us</Button></div>
        </Band>
      )}

      {/* What we take on */}
      <Band id="mandates">
        <Head label="Mandates" title="What we take on" sub={`The kinds of mandate we advise on in ${lower}.`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sector.types.map((t) => (
            <div key={t.title} className="rounded-lg border border-rule bg-paper p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue">{name}</div>
              <div className="display mt-4 text-[26px] leading-[1.05]">{t.title}</div>
              <p className="mt-3 border-b border-rule pb-4 text-[14px] leading-relaxed text-ink/80">{t.text}</p>
              <div className="mt-3 text-[12px]"><span className="font-semibold">Velero Capital</span> <span className="text-ink/60">· Adviser</span></div>
            </div>
          ))}
        </div>
      </Band>

      {/* Questions */}
      <Band tint id="questions">
        <Head label="Questions, answered" title={<>{name}: frequently asked questions</>} />
        <Questions items={[...sector.faqs, ...commonFaqs]} />
      </Band>

      {/* Related */}
      <Band id="related">
        <Head label="Related" title="More in Solutions" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} to={r.path} className="group rounded-lg border border-rule p-5 transition-colors hover:border-blue">
              <div className="display text-2xl group-hover:text-blue">{r.title}</div>
              <div className="mt-1 text-[12px] text-ink/60">{r.group}</div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center"><Button to="/solutions/">Back to Solutions</Button></div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">Decision routes</div>
          <h3 className="display mt-3 text-center text-3xl">Financing and transaction routes</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/services/fundraising-advisory/" className="group rounded-lg border border-rule p-5 hover:border-blue">
              <div className="text-[15px] font-semibold group-hover:text-blue">Fundraising advisory <span aria-hidden>→</span></div>
              <div className="mt-1 text-[13px] text-ink/70">Equity and structured capital, from positioning to close.</div>
            </Link>
            <Link to="/services/m-and-a-advisory/" className="group rounded-lg border border-rule p-5 hover:border-blue">
              <div className="text-[15px] font-semibold group-hover:text-blue">M&A advisory <span aria-hidden>→</span></div>
              <div className="mt-1 text-[13px] text-ink/70">Corporate, portfolio and structured transactions.</div>
            </Link>
          </div>
        </div>
      </Band>

      {/* Closing call */}
      <section className="bg-blue text-white">
        <div className="wrap py-16 text-center sm:py-20">
          <h2 className="display text-4xl sm:text-5xl">Interested in {lower}?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-white/85">Tell us what you need and a senior member of the team will respond personally.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact-us/" className="pill border-white bg-white text-blue hover:bg-white/90 hover:text-blue">Talk to us</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="pill border-white/70 text-white hover:bg-white hover:text-blue">Email us</a>
          </div>
        </div>
      </section>
    </>
  );
}
