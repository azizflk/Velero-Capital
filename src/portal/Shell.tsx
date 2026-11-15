import type { ReactNode } from "react";
import { signOut } from "./client";

/** The slim bar over the account area and the admin panel: the logo, who is signed in, and the way out. */
export default function Shell({ email, home, label, children }: { email: string; home: string; label?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-blue focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href={home} className="flex items-center gap-3" aria-label="Velero Capital home">
            <img src="/images/logo-blue.png" alt="Velero Capital" width={935} height={403} className="h-10 w-auto" />
            {label && <span className="rounded-full border border-blue px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">{label}</span>}
          </a>
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="hidden truncate text-[13px] text-ink/70 sm:block" title={email}>{email}</span>
            <button type="button" onClick={() => void signOut()} className="pill pill-small shrink-0">Sign out</button>
          </div>
        </div>
      </header>
      <main id="main" className="wrap flex-1 py-10 sm:py-14">{children}</main>
      <footer className="border-t border-rule">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-[12px] text-ink/60">
          <span>©{new Date().getFullYear()} Velero Capital</span>
          <span className="flex gap-5">
            <a href="https://velero.capital/verification/" className="hover:text-ink">Verify official contacts</a>
            <a href="https://velero.capital/privacy/" className="hover:text-ink">Privacy</a>
            <a href="https://velero.capital/legal/" className="hover:text-ink">Legal</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

/** A status as a small label. */
export function Chip({ tone, children }: { tone: "draft" | "new" | "active" | "done"; children: ReactNode }) {
  const look = { draft: "border-ink/25 text-ink/70", new: "border-blue bg-blue text-white", active: "border-blue text-blue", done: "border-ink/20 bg-ink/5 text-ink/60" }[tone];
  return <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${look}`}>{children}</span>;
}
export const toneOf = (status: string) => (status === "draft" ? "draft" : status === "submitted" ? "new" : status === "closed" ? "done" : "active") as "draft" | "new" | "active" | "done";

export function Loading({ what = "Loading" }: { what?: string }) {
  return <p className="py-16 text-center text-[14px] text-ink/60" role="status">{what}…</p>;
}
