import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** GC-style subpage: sticky left column with title, intro and anchors; content on the right. */
const NO_ANCHORS: { id: string; label: string }[] = [];

export function SidebarPage({ title, intro, anchors = NO_ANCHORS, aside, children }: { title: ReactNode; intro?: ReactNode; anchors?: { id: string; label: string }[]; aside?: ReactNode; children: ReactNode }) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    if (!anchors.length) return;
    const els = anchors.map((a) => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: "-20% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [anchors]);

  return (
    <div className="wrap grid gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <h1 className="display text-4xl sm:text-5xl lg:text-[44px] xl:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ink/80">{intro}</p>}
          {anchors.length > 0 && (
            <nav className="mt-8 max-w-xs" aria-label="On this page">
              {anchors.map((a) => (
                <a key={a.id} href={`#${a.id}`} className={`block border-t border-rule py-2 text-[13px] font-medium transition-colors hover:text-blue ${active === a.id ? "text-blue" : ""}`}>{a.label}</a>
              ))}
              <div className="rule" />
            </nav>
          )}
          {aside && <div className="mt-8 max-w-xs">{aside}</div>}
        </div>
      </aside>
      <div className="lg:col-span-9 lg:col-start-4">{children}</div>
    </div>
  );
}

export function Section({ id, title, children, className = "" }: { id?: string; title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`rule scroll-mt-24 py-10 first:border-t-0 first:pt-0 ${className}`}>
      {title && <h2 className="display mb-6 text-4xl">{title}</h2>}
      {children}
    </section>
  );
}

export function Cols({ items, cols = 3 }: { items: { title: string; text: string; to?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-x-8 gap-y-8 ${grid}`}>
      {items.map((it) => (
        <div key={it.title}>
          <h3 className="display text-2xl">{it.to ? (it.to.startsWith("/") ? <Link to={it.to} className="hover:text-blue">{it.title}</Link> : <a href={it.to} className="hover:text-blue">{it.title}</a>) : it.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{it.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Quote({ text, name, role, photo }: { text: string; name: string; role: string; photo?: string }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12">
      <blockquote className="lg:col-span-8">
        <p className="serif text-2xl leading-snug sm:text-3xl">“{text}”</p>
        <footer className="mt-5 text-[13px]"><span className="font-semibold">{name}</span><br /><span className="text-ink/70">{role}</span></footer>
      </blockquote>
      {photo && <div className="lg:col-span-4"><img src={photo} alt={name} className="aspect-square w-full object-cover object-top grayscale" loading="lazy" /></div>}
    </div>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose-gc max-w-2xl text-[14px] leading-relaxed text-ink/85 ${className}`}>{children}</div>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="max-w-2xl">
      {items.map((i) => <li key={i} className="border-t border-rule py-2.5 text-[14px] last:border-b">{i}</li>)}
    </ul>
  );
}

export function Card({ eyebrow, title, text, to, image }: { eyebrow?: string; title: string; text?: string; to?: string; image?: ReactNode }) {
  const inner = (
    <>
      <div className="mb-3 aspect-[16/10] w-full overflow-hidden bg-sand">{image}</div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <div className="mt-0.5 text-[14px] font-semibold leading-snug group-hover:underline underline-offset-4">{title}</div>
      {text && <p className="mt-1 text-[13px] text-ink/70">{text}</p>}
    </>
  );
  return to ? <Link to={to} className="group block">{inner}</Link> : <div>{inner}</div>;
}
