import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";
import { groups } from "@/data/solutions";
import Search from "./Search";

const path = (to: string) => to.split("#")[0];

/** The Solutions panel: every sector, grouped, across the full width of the header. */
function SolutionsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="border-b border-rule bg-paper shadow-[0_24px_40px_-24px_rgba(0,0,0,.25)]">
      <div className="wrap grid grid-cols-12">
        {/* intro panel */}
        <div className="col-span-3 flex flex-col bg-blue px-7 py-8 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Industry coverage</div>
          <p className="display mt-4 text-[30px] leading-[1.02]">Sector knowledge. Disciplined execution.</p>
          <p className="mt-4 text-[14px] leading-relaxed text-white/80">An understanding of each industry’s capital, cycle and counterparties, applied to every mandate.</p>
          <Link to="/solutions/" onClick={onPick} className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-white underline-offset-4 hover:underline">Explore the sectors we serve <span aria-hidden>→</span></Link>
        </div>

        {/* every sector, grouped */}
        <div className="col-span-9 pl-6">
          <div className="grid grid-cols-4 border-l border-rule">
            {groups.map((g) => (
              <div key={g.id} className="border-b border-r border-rule px-5 py-6">
                <Link to={`/solutions/#${g.id}`} onClick={onPick} className="block border-b border-rule pb-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-blue hover:text-blue-dark">{g.title}</Link>
                <ul className="mt-4 space-y-2.5">
                  {g.sectors.map((s) => (
                    <li key={s.slug}><Link to={s.path} onClick={onPick} className="text-[14px] leading-snug text-ink hover:text-blue">{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            {/* fills the eighth cell so the grid closes cleanly */}
            <div className="border-b border-r border-rule" />
          </div>
          <div className="flex items-center justify-between gap-6 py-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink/55">Start a conversation</div>
              <Link to="/contact-us/" onClick={onPick} className="mt-0.5 block text-[16px] font-semibold text-ink hover:text-blue">Contact Velero Capital</Link>
            </div>
            <Link to="/contact-us/" onClick={onPick} className="pill pill-blue">Discuss a mandate <span aria-hidden>→</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  // After a pick, keep the hover menus shut until the pointer leaves, so they don't hang open over the new page.
  const [shut, setShut] = useState(false);
  const { pathname } = useLocation();
  const closeSearch = useCallback(() => setSearching(false), []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearching(true); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (item: (typeof nav)[number]) =>
    pathname.startsWith(path(item.to)) || !!item.children?.some((c) => pathname.startsWith(path(c.to)));
  const reveal = shut ? "" : "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="wrap flex h-20 items-center justify-between">
          {/* Blue logo by default; the outlined version fades in while the pointer (or keyboard focus) is on it. */}
          <Link to="/" className="group/logo relative flex h-12 items-center" aria-label="Velero Capital home">
            <img src="/images/logo-blue.png" alt="Velero Capital" className="h-12 w-auto transition-opacity duration-200 group-hover/logo:opacity-0 group-focus-visible/logo:opacity-0" />
            <img src="/images/logo-outline.png" alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-12 w-auto max-w-none opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main" onMouseLeave={() => setShut(false)}>
            {nav.map((item) => (
              <div key={item.label} className={`group py-7 ${item.mega ? "" : "relative"}`}>
                <Link to={item.to} onClick={() => setShut(true)} className={`navlink ${isActive(item) ? "active" : ""}`}>{item.label}</Link>
                {item.mega && (
                  <div className={`invisible absolute inset-x-0 top-full opacity-0 transition-all ${reveal}`}>
                    <SolutionsPanel onPick={() => setShut(true)} />
                  </div>
                )}
                {item.children && (
                  <div className={`invisible absolute left-0 top-full -mt-px opacity-0 transition-all ${reveal}`}>
                    <div className="min-w-60 border border-rule bg-paper p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)]">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} onClick={() => setShut(true)} className={`block px-3 py-2 text-[15px] hover:bg-sand ${pathname === path(c.to) && !c.to.includes("#") ? "bg-sand" : ""}`}>{c.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => setSearching(true)} className="navlink">Search</button>
          </nav>

          <button className="p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-rule lg:hidden">
            <div className="wrap py-2">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-rule">
                  <NavLink to={item.to} className="block py-3 text-lg font-medium">{item.label}</NavLink>
                  {item.mega && (
                    <div className="pb-3 pl-4">
                      {groups.map((g) => <Link key={g.id} to={`/solutions/#${g.id}`} onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-ink/70">{g.title}</Link>)}
                    </div>
                  )}
                  {item.children && (
                    <div className="pb-3 pl-4">
                      {item.children.map((c) => <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-ink/70">{c.label}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => { setOpen(false); setSearching(true); }} className="block w-full py-3 text-left text-lg font-medium">Search</button>
            </div>
          </div>
        )}
      </header>
      <Search open={searching} onClose={closeSearch} />
    </>
  );
}
