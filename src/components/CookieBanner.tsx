import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, onOpenCookieSettings, setConsent } from "@/lib/consent";

const DISMISSED = "velero.consent.dismissed";

function Toggle({ label, text, checked, onChange, locked }: { label: string; text: string; checked: boolean; onChange?: (v: boolean) => void; locked?: boolean }) {
  return (
    <label className={`flex items-start justify-between gap-4 border-t border-white/10 py-3 ${locked ? "opacity-70" : "cursor-pointer"}`}>
      <span>
        <span className="block text-[14px] font-medium text-white">{label}</span>
        <span className="block text-[12px] leading-relaxed text-white/60">{text}</span>
      </span>
      <input type="checkbox" className="peer sr-only" checked={checked} disabled={locked} onChange={(e) => onChange?.(e.target.checked)} />
      <span aria-hidden className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full bg-white/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-blue peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-white" />
    </label>
  );
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [media, setMedia] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(DISMISSED) === "1"; } catch { /* ignore */ }
    if (!getConsent() && !dismissed) setOpen(true);
    return onOpenCookieSettings(() => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMedia(c?.media ?? false);
      setDetail(true);
      setOpen(true);
    });
  }, []);

  if (!open) return null;

  const decide = (a: boolean, m: boolean) => { setConsent({ analytics: a, media: m }); setOpen(false); setDetail(false); };
  const dismiss = () => { try { sessionStorage.setItem(DISMISSED, "1"); } catch { /* ignore */ } setOpen(false); setDetail(false); };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] flex justify-center p-4 sm:justify-start sm:p-6" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <div className="fade-in w-full max-w-md rounded-2xl border border-white/15 border-t-2 border-t-blue bg-ink p-5 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.6)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-title" className="text-[17px] font-semibold">Cookies</h2>
          <button onClick={dismiss} aria-label="Close" className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5 5 19" /></svg>
          </button>
        </div>
        <p className="mt-1 text-[14px] leading-relaxed text-white/70">We measure how the site is used, and some pages embed media. Both stay off until you choose.</p>

        {detail && (
          <div className="mt-4">
            <Toggle label="Necessary" text="Remembers your cookie choice. Always on." checked locked />
            <Toggle label="Analytics" text="Anonymous measurement of how the site is used." checked={analytics} onChange={setAnalytics} />
            <Toggle label="Embedded media" text="Video and other content served by third parties." checked={media} onChange={setMedia} />
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={() => decide(false, false)} className="rounded-lg border border-white/30 px-4 py-2.5 text-[14px] font-medium hover:border-white">Reject</button>
          {detail ? (
            <button onClick={() => decide(analytics, media)} className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-ink hover:bg-white/90">Save choices</button>
          ) : (
            <button onClick={() => decide(true, true)} className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-ink hover:bg-white/90">Accept</button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 whitespace-nowrap text-[13px] text-white/60">
          {detail ? (
            <button onClick={() => decide(true, true)} className="underline decoration-white/30 underline-offset-4 hover:text-white">Accept all</button>
          ) : (
            <button onClick={() => setDetail(true)} className="underline decoration-white/30 underline-offset-4 hover:text-white">Choose by category</button>
          )}
          <Link to="/privacy/" className="underline decoration-white/30 underline-offset-4 hover:text-white">Read the privacy policy</Link>
        </div>
      </div>
    </div>
  );
}
