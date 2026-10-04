import { Link } from "react-router-dom";
import { CONTACT_EMAIL, offices, social } from "@/data/site";
import SummariseWith from "./SummariseWith";
import { openCookieSettings } from "@/lib/consent";

const icons: Record<string, string> = {
  LinkedIn: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  X: "M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L2.6 2h6.4l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.3 3.8H5.4l12.4 16.3z",
  Telegram: "M9.04 15.47 8.7 20.2c.48 0 .69-.21.94-.46l2.26-2.16 4.68 3.43c.86.47 1.47.22 1.7-.79l3.08-14.44c.28-1.26-.45-1.75-1.29-1.44L1.9 11.3c-1.24.48-1.22 1.17-.21 1.48l4.62 1.44 10.73-6.76c.5-.33.96-.15.58.18",
  CoinMarketCap: "M20.7 14.3c-.6.4-1.3.4-1.7 0-.5-.5-.7-1.3-.7-2.3V8.7c0-1.6-.6-2.8-1.7-3.1-1.8-.5-3.1 1.6-3.6 2.4l-3.1 5V6.9c0-1.5-.5-2.4-1.5-2.7-.6-.2-1.6-.1-2.5 1.3L1.8 12.3A10.1 10.1 0 0 1 1 8.4C1 4.3 4.3 1 8.4 1s7.4 3.3 7.4 7.4v.1c0 2.5 1.4 3.4 2.6 3.4 1 0 2.3-.6 2.3-3.5v-.1C21.9 3.7 17.4 0 12 0S2 4 2 12s5 12 12 12c4.3 0 7.9-2.2 9.8-5.6l-3.1-4.1z",
};

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="rule" />
      <div className="wrap py-14 text-center">
        <h2 className="display text-3xl">Stay connected</h2>
        <div className="mt-6 flex justify-center gap-3">
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-blue">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={icons[s.label] ?? ""} /></svg>
            </a>
          ))}
        </div>
        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px]" aria-label="Footer">
          <Link to="/contact-us/" className="hover:underline underline-offset-4">Contact</Link>
          <Link to="/team/" className="hover:underline underline-offset-4">Team</Link>
          <Link to="/verification/" className="hover:underline underline-offset-4">Account Verification</Link>
          <Link to="/privacy/" className="hover:underline underline-offset-4">Privacy Policy</Link>
          <button onClick={openCookieSettings} className="hover:underline underline-offset-4">Cookie settings</button>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline underline-offset-4">{CONTACT_EMAIL}</a>
        </nav>
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-12 gap-y-2 text-[12px] text-ink/60">
          {offices.map((o) => <span key={o.region}>{o.address}</span>)}
        </div>
      </div>

      <SummariseWith />

      <div className="relative overflow-hidden bg-blue text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,.14),transparent_55%)]" />
        <div className="wrap relative flex min-h-[46vw] flex-col justify-end pb-6 pt-24 sm:min-h-[34vw]">
          <div className="display select-none whitespace-nowrap text-[15.5vw] leading-[0.85] tracking-[-0.02em]" aria-hidden="true">Velero Capital</div>
          <div className="mt-6 flex flex-col gap-1 text-[11px] text-white/80 sm:flex-row sm:justify-between">
            <span>©{new Date().getFullYear()} Velero Capital. All rights reserved.</span>
            <span>Guiding bold ideas to safe harbours.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
