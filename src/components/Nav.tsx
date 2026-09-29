import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/data/site";
import Button from "./Button";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "text-cyan" : "text-white/80 hover:text-white"}`;

  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled || open ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"}`}>
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Velero Capital home">
          <img src="/images/logo.png" alt="Velero Capital" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white" aria-haspopup="true">
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="card min-w-56 p-2 shadow-2xl">
                    {item.children.map((c) => (
                      <NavLink key={c.to} to={c.to} className={linkCls}>{c.label}</NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to!} className={linkCls}>{item.label}</NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/contact-us/" className="hidden sm:inline-flex">Get Started</Button>
          <button
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line lg:hidden">
          <div className="container-x space-y-4 py-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-3 pb-1 text-xs uppercase tracking-wider text-muted">{item.label}</div>
                  {item.children.map((c) => (
                    <NavLink key={c.to} to={c.to} className={linkCls}>{c.label}</NavLink>
                  ))}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to!} className={linkCls}>{item.label}</NavLink>
              ),
            )}
            <Button to="/contact-us/" className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}
