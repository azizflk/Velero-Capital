import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Velero Capital home">
          <img src="/images/logo-box.png" alt="Velero Capital" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <div key={item.label} className="group relative py-5">
              <NavLink to={item.to} end={!item.children} className={({ isActive }) => `navlink ${isActive || (item.children && item.children.some((c) => pathname.startsWith(c.to))) ? "active" : ""}`}>
                {item.label}
              </NavLink>
              {item.children && (
                <div className="invisible absolute left-0 top-full -mt-px opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-56 border border-rule bg-paper p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)]">
                    {item.children.map((c) => (
                      <NavLink key={c.to} to={c.to} className={({ isActive }) => `block px-3 py-2 text-[14px] hover:bg-sand ${isActive ? "bg-sand" : ""}`}>{c.label}</NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button className="p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-rule lg:hidden">
          <div className="wrap py-2">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-rule last:border-0">
                <NavLink to={item.to} className="block py-3 text-lg font-medium">{item.label}</NavLink>
                {item.children && (
                  <div className="pb-3 pl-4">
                    {item.children.map((c) => <NavLink key={c.to} to={c.to} className="block py-1.5 text-[15px] text-ink/70">{c.label}</NavLink>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
