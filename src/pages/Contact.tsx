import { Link } from "react-router-dom";
import { S, gap, row } from "@/components/VeleroStory";
import Button from "@/components/Button";
import MessageForm from "@/components/MessageForm";
import { APPLY_HREF } from "@/lib/portal";
import { CONTACT_EMAIL, offices } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const cities = [
  { label: "San Francisco", scenes: [S.bridge, gap(20), S.pyramid] },
  { label: "Dubai", scenes: [S.dubai, S.palm] },
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
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-white" role="img" aria-label="One-line drawing of San Francisco and Dubai">
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
  useTitle("Contact", "Start a confidential conversation with Velero Capital about raising capital, a transaction, liquidity, or access to private markets.", { full: "Contact Velero Capital | Dubai & San Francisco", pageType: "ContactPage" });

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
              <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">Connect With Velero</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">To apply as an investor, a founder or a sponsor, use Apply. For anything else, send us a short message.</p>
            </div>
            <div className="lg:col-span-5"><Skyline /></div>
          </div>
        </div>
      </section>

      {/* Form and contact card */}
      <section className="wrap grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* Applications go through Apply; this page takes general messages only. */}
          <div className="flex flex-col gap-4 rounded-lg border border-blue/30 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[14px] font-semibold">Applying to Velero Capital?</div>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/70">Investors, founders and sponsors apply through Apply. Log in with your email or Google; you can save a draft and follow your application.</p>
            </div>
            <Button to={APPLY_HREF} variant="blue" className="shrink-0">Apply <span aria-hidden>→</span></Button>
          </div>

          <div className="mt-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">General enquiries</div>
          <div className="mt-3 h-px w-10 bg-blue" />
          <h2 className="display mt-5 text-4xl sm:text-5xl">Send us a message</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/80">For questions that are not an application. Please do not send confidential documents through this form.</p>

          <div className="mt-8"><MessageForm /></div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl bg-blue p-8 text-white lg:sticky lg:top-28">
            <h2 className="display text-3xl">Questions?</h2>
            <dl className="mt-6">
              <div className="border-b border-white/20 pb-5">
                <dt className="text-[14px] font-semibold">Email</dt>
                <dd className="mt-1"><a href={`mailto:${CONTACT_EMAIL}`} className="text-[15px] text-white/90 underline-offset-4 hover:underline">{CONTACT_EMAIL}</a></dd>
              </div>
              <div className="pt-5">
                <dt className="text-[14px] font-semibold">Offices</dt>
                <dd className="mt-2 space-y-3 text-[14px] leading-relaxed text-white/85">
                  {offices.map((o) => (
                    <div key={o.region} className="font-medium text-white">{o.city}</div>
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
            <Link to="/investor-access/" className="pill">How investor access works</Link>
            <Link to="/verification/" className="pill">Verify official contacts</Link>
            <Link to="/privacy/" className="pill">Privacy policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
