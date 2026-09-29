import { useState } from "react";

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((it, i) => (
        <div key={it.q}>
          <button
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium hover:text-cyan"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {it.q}
            <span className={`shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <p className="px-6 pb-6 text-muted">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}
