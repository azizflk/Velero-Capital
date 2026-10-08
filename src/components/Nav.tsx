import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";
import { groups } from "@/data/solutions";
import { menus, type Menu } from "@/data/menus";
import Search from "./Search";

const path = (to: string) => to.split("#")[0];

/** A full-width panel under the header: a blue introduction on the left, grouped links on the right, a contact button beneath. */
function MegaPanel({ menu, onPick }: { menu: Menu; onPick: () => void }) {
  // Pad the grid to a whole number of rows of four so its borders close cleanly.
  const fillers = (4 - (menu.groups.length % 4)) % 4;
  return (
    <div className="border-b border-rule bg-paper shadow-[0_24px_40px_-24px_rgba(0,0,0,.25)]">
      <div className="wrap grid grid-cols-12">
        <div className="col-span-3 flex flex-col bg-blue px-7 py-8 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{menu.eyebrow}</div>
          <p className="display mt-4 text-[30px] leading-[1.02]">{menu.headline}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-white/80">{menu.text}</p>
          <Link to={menu.cta.to} onClick={onPick} className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-white underline-offset-4 hover:underline">{menu.cta.label} <span aria-hidden>→</span></Link>
        </div>

        <div className="col-span-9 pl-6">
          <div className="grid grid-cols-4 border-l border-rule">
            {menu.groups.map((g) => (
              <div key={g.title} className="border-b border-r border-rule px-5 py-6">
                {g.to ? (
                  <Link to={g.to} onClick={onPick} className="block border-b border-rule pb-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-blue hover:text-blue-dark">{g.title}</Link>
                ) : (
                  <div className="border-b border-rule pb-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-blue">{g.title}</div>
                )}
                <ul className={`mt-4 ${g.items.some((it) => it.desc) ? "space-y-4" : "space-y-2.5"}`}>
                  {g.items.map((it) => (
                    <li key={it.to + it.label}>
                      <Link to={it.to} onClick={onPick} className="group/item block">
                        <span className="block text-[14px] leading-snug text-ink group-hover/item:text-blue">{it.label}</span>
                        {it.desc && <span className="mt-1 block text-[12px] leading-snug text-ink/60">{it.desc}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {Array.from({ length: fillers }).map((_, k) => <div key={k} className="border-b border-r border-rule" />)}
          </div>
          <div className="flex justify-end py-5">
            <Link to={menu.action?.to ?? "/investor-access/"} onClick={onPick} className="pill pill-blue">{menu.action?.label ?? "Investor Access"} <span aria-hidden>→</span></Link>
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
            {nav.map((item) => {
              const menu = menus[item.label];
              return (
                <div key={item.label} className={`group py-7 ${menu ? "" : "relative"}`}>
                  <Link to={item.to} onClick={() => setShut(true)} className={`navlink ${isActive(item) ? "active" : ""}`}>{item.label}</Link>
                  {menu ? (
                    <div className={`invisible absolute inset-x-0 top-full opacity-0 transition-all ${reveal}`}>
                      <MegaPanel menu={menu} onPick={() => setShut(true)} />
                    </div>
                  ) : item.children ? (
                    <div className={`invisible absolute left-0 top-full -mt-px opacity-0 transition-all ${reveal}`}>
                      <div className="min-w-60 border border-rule bg-paper p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)]">
                        {item.children.map((c) => (
                          <Link key={c.to} to={c.to} onClick={() => setShut(true)} className={`block px-3 py-2 text-[15px] hover:bg-sand ${pathname === path(c.to) && !c.to.includes("#") ? "bg-sand" : ""}`}>{c.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
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
