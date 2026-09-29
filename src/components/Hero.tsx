import type { ReactNode } from "react";

export default function Hero({ title, text, children, compact = false }: { title: ReactNode; text?: ReactNode; children?: ReactNode; compact?: boolean }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #af1550 0%, #0db2f9 45%, #056bf9 70%, transparent 80%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0b0b0b)]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      </div>
      <div className={`container-x ${compact ? "py-20 sm:py-24" : "py-28 sm:py-36"} text-center`}>
        <h1 className="fade-up mx-auto max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">{title}</h1>
        {text && <p className="fade-up mx-auto mt-6 max-w-2xl text-lg text-white/80 [animation-delay:120ms]">{text}</p>}
        {children && <div className="fade-up mt-9 flex flex-wrap justify-center gap-3 [animation-delay:240ms]">{children}</div>}
      </div>
    </section>
  );
}
