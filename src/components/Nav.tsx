import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";
import { groups } from "@/data/solutions";
import { menus, type Menu } from "@/data/menus";
import Search from "./Search";
import { PORTAL_ON, SIGNED_IN_KEY, isPortalPath, loginFor } from "@/lib/portal";

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

/** The filled button in the header: signing in, or the account once signed in. */
function AccountButton({ to, label, email }: { to: string; label: string; email?: string }) {
  return (
    <Link to={to} title={email ? `Signed in as ${email}` : undefined} aria-label={email ? `Your account, signed in as ${email}` : undefined} className="pill pill-blue pill-cta group/cta">
      {email ? (
        <>
          {/* Phones have no room for an address: a person icon there, and the address heads the menu instead. */}
          <svg aria-hidden="true" width="15" height="20" viewBox="0 -2 16 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="sm:hidden"><circle cx="8" cy="5.5" r="3" /><path d="M2.5 14.5c.8-2.9 3-4.5 5.5-4.5s4.7 1.6 5.5 4.5" /></svg>
          {/* A long address is cut short with an ellipsis; the full one is in the tooltip. */}
          <span className="hidden max-w-[13rem] truncate sm:block">{label}</span>
        </>
      ) : label}
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="hidden transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none min-[400px]:block">
        <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" />
      </svg>
    </Link>
  );
}

/** “Apply”, drawn like the outlined logo: a plain ink frame that fills on hover. It opens the application questions. */
function ApplyButton({ to }: { to: string }) {
  return <Link to={to} className="frame-cta">Apply</Link>;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  // After a pick, keep the hover menus shut until the pointer leaves, so they don't hang open over the new page.
  const [shut, setShut] = useState(false);
  const { pathname } = useLocation();
  const closeSearch = useCallback(() => setSearching(false), []);
  // Someone already signed in on this browser is offered their account rather than the login page.
  const [signedIn, setSignedIn] = useState("");
  useEffect(() => { try { setSignedIn(localStorage.getItem(SIGNED_IN_KEY) ?? ""); } catch { /* storage blocked: keep “Login” */ } }, [pathname]);
  const email = signedIn.includes("@") ? signedIn : "";
  // Login brings the visitor back to the page they were on; Apply takes them to the questions, signing in first if needed.
  const account = PORTAL_ON ? { to: signedIn ? "/account/" : loginFor(isPortalPath(pathname) ? "/" : pathname), label: signedIn ? email || "My account" : "Login", email } : null;
  const apply = PORTAL_ON ? (signedIn ? "/account/" : loginFor("/account/")) : null;
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
          {/* Already on the home page, a click reloads it fresh instead of doing nothing. */}
          <Link to="/" className="group/logo relative flex h-12 shrink-0 items-center" aria-label="Velero Capital home" onClick={(e) => { if (pathname.replace(/\/+$/, "") === "") { e.preventDefault(); window.location.assign("/"); } }}>
            <img src="/images/logo-blue.png" alt="Velero Capital" width={935} height={403} className="h-9 w-auto transition-opacity min-[360px]:h-10 min-[400px]:h-12 duration-200 group-hover/logo:opacity-0 group-focus-visible/logo:opacity-0" />
            <img src="/images/logo-outline.png" alt="" aria-hidden="true" width={935} height={403} className="pointer-events-none absolute left-0 top-0 h-9 w-auto min-[360px]:h-10 min-[400px]:h-12 max-w-none opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 xl:gap-8">
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

          {account && (
            <div className="flex items-center gap-1.5 min-[400px]:gap-2 sm:gap-3">
              <AccountButton {...account} />
              {apply && <ApplyButton to={apply} />}
            </div>
          )}

          <button className="-mr-2 p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
          </div>
        </div>

        {open && (
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-rule lg:hidden">
            <div className="wrap py-2">
              {email && (
                <Link to="/account/" onClick={() => setOpen(false)} className="block border-b border-rule py-3 sm:hidden">
                  <span className="block text-[12px] text-ink/60">Signed in as</span>
                  <span className="block truncate text-[15px] font-medium text-blue">{email}</span>
                </Link>
              )}
              {/* First in the list, where it is seen at once and nothing at the foot of the screen can cover it. */}
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
