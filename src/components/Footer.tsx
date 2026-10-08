import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, nav, offices, social } from "@/data/site";
import SummariseWith from "./SummariseWith";
import { groups } from "@/data/solutions";
import { openCookieSettings } from "@/lib/consent";

/** Column heading in the module style: uppercase with a trailing slash, in the site's own typeface. */
function Heading({ children }: { children: string }) {
  return <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">{children}/</h3>;
}

/** One row of a module list: a small elbow connector, then the entry. */
function Row({ children }: { children: ReactNode }) {
  return (
    <li className="group/row flex items-start gap-3">
      <span aria-hidden className="mt-[3px] h-2.5 w-4 shrink-0 border-b border-l border-white/40 transition-colors group-hover/row:border-white" />
      <span className="text-[14px] leading-snug text-white/75 transition-colors group-hover/row:text-white">{children}</span>
    </li>
  );
}

function Module({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <Heading>{title}</Heading>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

const linkCls = "outline-none focus-visible:underline underline-offset-4";

/**
 * U.S. regulatory notice. Kept switched off: it is a statement of fact about a chaperoning agreement with a named
 * U.S. broker-dealer, and must only be shown once that agreement is signed and the broker-dealer's compliance team has
 * approved the wording. Set the text to enable it.
 */
const US_NOTICE: string = "";
// Wording held for that day: "Velero Capital’s U.S.-related activities are conducted under SEC Rule 15a-6 through a
// chaperoning arrangement with a U.S. registered broker-dealer that is a FINRA and SIPC member."
const find = (label: string) => nav.find((n) => n.label === label);

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-blue text-white shadow-[0_10px_30px_-10px_rgba(2,60,207,.7)] transition-all hover:bg-blue-dark ${show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

export default function Footer() {
  const capital = find("Capital");
  const services = find("Services");
  return (
    <footer className="mt-24">
      <div className="rule" />
      <SummariseWith />

      {/* Everything below sits on one blue field: the module columns, then the name moving across. */}
      <div className="relative overflow-hidden bg-blue text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,.14),transparent_55%)]" />
        <div className="wrap relative grid grid-cols-1 gap-12 pb-4 pt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link to="/" aria-label="Velero Capital home"><img src="/images/logo-outline.png" alt="Velero Capital" className="h-12 w-auto brightness-0 invert" /></Link>
            <p className="mt-5 text-[14px] leading-relaxed text-white/80">Access is the edge.<br />Private markets, by relationship.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-[14px] text-white/80 underline-offset-4 hover:text-white hover:underline">{CONTACT_EMAIL}</a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-9 lg:grid-cols-5">
            <Module title="Solutions">
            {groups.map((g) => <Row key={g.id}><Link to={`/solutions/#${g.id}`} className={linkCls}>{g.title}</Link></Row>)}
          </Module>

          <Module title="Capital">
              {capital?.children?.map((c) => <Row key={c.to}><Link to={c.to} className={linkCls}>{c.label}</Link></Row>)}
              <Row><Link to="/portfolio/" className={linkCls}>Portfolio</Link></Row>
            </Module>

            <Module title="Services">
              {services?.children?.map((c) => <Row key={c.to}><Link to={c.to} className={linkCls}>{c.label}</Link></Row>)}
            </Module>

            <Module title="Company">
              <Row><Link to="/company/" className={linkCls}>Inside Velero Capital</Link></Row>
              <Row><Link to="/investor-access/" className={linkCls}>Investor Access</Link></Row>
              <Row><Link to="/submit-an-opportunity/" className={linkCls}>Submit an Opportunity</Link></Row>
              <Row><Link to="/verification/" className={linkCls}>Account Verification</Link></Row>
              <Row><Link to="/contact-us/" className={linkCls}>Inquiries</Link></Row>
              <Row><Link to="/privacy/" className={linkCls}>Privacy Policy</Link></Row>
              <Row><Link to="/legal/" className={linkCls}>Legal &amp; Disclosures</Link></Row>
              <Row><button onClick={openCookieSettings} className={`${linkCls} text-left`}>Cookie Settings</button></Row>
            </Module>

            <div className="space-y-12">
              <Module title="Offices">
                {offices.map((o) => <Row key={o.region}>{o.region === "United Arab Emirates" ? "Dubai" : o.region}</Row>)}
              </Module>
              <Module title="Socials">
                {social.map((s) => (
                  <Row key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className={linkCls}>
                      {s.label} <span aria-hidden className="ml-1 text-white/70">↗</span>
                    </a>
                  </Row>
                ))}
              </Module>
            </div>
          </div>
        </div>

        {/* The name, moving: one continuous band that never stops. */}
        <div className="relative pt-10 sm:pt-14" aria-hidden="true">
          <div className="name-marquee flex w-max select-none">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="display whitespace-nowrap pr-[0.35em] text-[22vw] leading-[0.9] tracking-[-0.02em] sm:text-[15.5vw]">Velero Capital</span>
            ))}
          </div>
        </div>
        <div className="wrap relative space-y-3 pb-6 pt-6 text-[11px] leading-relaxed text-white/75">
          <p className="max-w-3xl">
            Nothing on this website is an offer to sell or a solicitation of an offer to buy any security. Opportunities are shared only with eligible investors, on a
            case-by-case basis, and access or allocation is never guaranteed. Private-market investments carry significant risk, including the loss of capital.
            Third-party names and logos do not indicate partnership, endorsement or affiliation.{" "}
            <Link to="/legal/" className="text-white underline-offset-4 hover:underline">Legal &amp; disclosures</Link>
          </p>
          {US_NOTICE && <p className="max-w-3xl">{US_NOTICE}</p>}
          <p>©{new Date().getFullYear()} Velero Capital. All rights reserved.</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
