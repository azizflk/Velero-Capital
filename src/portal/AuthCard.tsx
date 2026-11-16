import { useEffect, useRef, useState, type FormEvent } from "react";
import { arrivalError, supabase } from "./client";
import { box } from "@/components/EnquiryForm";

/** Google's own mark, as its sign-in guidelines ask for it: unaltered, on a plain button. */
function GoogleMark() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

const wide = "pill pill-wide";

/**
 * One card for both logging in and signing up: an email address and a code sent to it, or Google.
 * There is no password to choose, forget or leak; whoever can read the mailbox owns the account.
 */
export default function AuthCard({ heading, lead, next }: { heading: string; lead: string; next: string }) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState<"" | "email" | "code" | "google">("");
  const [error, setError] = useState(arrivalError ? `${arrivalError.replace(/\+/g, " ").replace(/\.$/, "")}. Please try again.` : "");
  const [resent, setResent] = useState(false);
  const code = useRef<HTMLInputElement>(null);
  const back = `${location.origin}${next}`;

  useEffect(() => { if (step === "code") code.current?.focus(); }, [step]);
  // Offer Google only once it has been switched on for the project; until then the button would lead nowhere.
  const [withGoogle, setWithGoogle] = useState(false);
  useEffect(() => {
    let live = true;
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: import.meta.env.VITE_SUPABASE_KEY as string } })
      .then((r) => r.json())
      .then((s) => { if (live) setWithGoogle(!!s?.external?.google); })
      .catch(() => undefined);
    return () => { live = false; };
  }, []);

  const send = async (again = false) => {
    setError(""); setResent(false); setBusy("email");
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: back } });
    setBusy("");
    if (error) { setError(error.status === 429 ? "Too many attempts. Please wait a minute and try again." : error.message); return; }
    setStep("code"); setResent(again);
  };
  const onEmail = (e: FormEvent) => { e.preventDefault(); void send(); };
  const onCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setBusy("code");
    const token = String(new FormData(e.currentTarget).get("code") ?? "").replace(/\D/g, "");
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: "email" });
    // On success the session change is picked up by the page, which moves on by itself.
    if (error) { setBusy(""); setError("That code is not right or has expired. Check it, or send a new one."); }
  };
  const google = async () => {
    setError(""); setBusy("google");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: back } });
    if (error) { setBusy(""); setError(error.message); }
  };

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-rule bg-white px-7 py-9 sm:px-9 sm:py-10">
      <a href="/" aria-label="Velero Capital home" className="mx-auto block w-fit">
        <img src="/images/logo-blue.png" alt="Velero Capital" width={935} height={403} className="h-12 w-auto" />
      </a>

      {step === "email" ? (
        <>
          <h1 className="display mt-7 text-center text-[34px]">{heading}</h1>
          <p className="mx-auto mt-3 max-w-[30ch] text-center text-[14px] leading-relaxed text-ink/70">{lead}</p>
          <form onSubmit={onEmail} className="mt-7">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold">Email</span>
              <input name="email" type="email" required autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} className={box} placeholder="you@company.com" />
            </label>
            <button type="submit" disabled={!!busy} className={`${wide} pill-blue mt-4`}>{busy === "email" ? "Sending…" : "Continue"}</button>
          </form>
          {withGoogle && (
            <>
              <div className="my-5 flex items-center gap-4 text-[12px] text-ink/50" aria-hidden="true"><span className="h-px flex-1 bg-rule" />or<span className="h-px flex-1 bg-rule" /></div>
              <button type="button" onClick={google} disabled={!!busy} className={`${wide} pill-quiet relative`}>
                <span className="absolute left-5"><GoogleMark /></span>
                {busy === "google" ? "Opening Google…" : "Continue with Google"}
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="display mt-7 text-center text-[34px]">Check your email</h1>
          <p className="mx-auto mt-3 max-w-[34ch] text-center text-[14px] leading-relaxed text-ink/70">We sent a sign-in code to <strong className="break-all font-semibold text-ink">{email.trim()}</strong>. Enter it below, or open the link in the email.</p>
          <form onSubmit={onCode} className="mt-7">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold">Sign-in code</span>
              <input ref={code} name="code" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]{6,12}" maxLength={12} className={`${box} text-center text-[20px] tracking-[0.3em]`} placeholder="••••••••" />
            </label>
            <button type="submit" disabled={!!busy} className={`${wide} pill-blue mt-4`}>{busy === "code" ? "Checking…" : "Log in"}</button>
          </form>
          <div className="mt-5 flex items-center justify-between text-[13px]">
            <button type="button" onClick={() => { setStep("email"); setError(""); }} className="textlink">Use another email</button>
            <button type="button" onClick={() => void send(true)} disabled={!!busy} className="textlink disabled:opacity-50">{busy === "email" ? "Sending…" : "Send a new code"}</button>
          </div>
          {resent && <p className="mt-3 text-center text-[13px] text-ink/70" role="status">A new code is on its way.</p>}
        </>
      )}

      {error && <p className="mt-4 rounded-md border border-red-700/25 bg-red-50 px-3.5 py-2.5 text-[13px] leading-snug text-red-800" role="alert">{error}</p>}

      <p className="mt-7 text-center text-[12px] leading-relaxed text-ink/55">New here? The same steps create your account. By continuing you agree to the <a href="/privacy/" className="textlink">privacy policy</a>.</p>
    </div>
  );
}

/** The plain page an auth card sits on: nothing but the card and three quiet links. */
export function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-paper px-5 py-10 sm:py-16">
      <main id="main" className="flex w-full flex-1 flex-col items-center justify-center">{children}</main>
      <nav aria-label="Legal" className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[13px] text-ink/70">
        <a href="https://velero.capital/" className="hover:text-ink">velero.capital</a>
        <a href="https://velero.capital/privacy/" className="hover:text-ink">Privacy</a>
        <a href="https://velero.capital/legal/" className="hover:text-ink">Legal &amp; Disclosures</a>
      </nav>
    </div>
  );
}
