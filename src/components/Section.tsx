import type { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`container-x py-16 sm:py-20 ${className}`}>{children}</section>;
}

export function Heading({ eyebrow, title, text, center = true }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">{eyebrow}</div>}
      <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
