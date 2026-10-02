import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";
import Search from "./Search";

const path = (to: string) => to.split("#")[0];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="wrap flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Velero Capital home">
            <img src="/images/logo-box.png" alt="Velero Capital" className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
            {nav.map((item) => (
              <div key={item.label} className="group relative py-7">
                <Link to={item.to} className={`navlink ${isActive(item) ? "active" : ""}`}>{item.label}</Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full -mt-px opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-60 border border-rule bg-paper p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)]">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className={`block px-3 py-2 text-[15px] hover:bg-sand ${pathname === path(c.to) && !c.to.includes("#") ? "bg-sand" : ""}`}>{c.label}</Link>
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
