import { useState } from "react";

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl border-b border-rule">
      {items.map((it, i) => (
        <div key={it.q} className="border-t border-rule">
          <button className="flex w-full items-center justify-between gap-6 py-4 text-left text-[15px] font-medium hover:text-blue" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {it.q}
            <span className="text-xl leading-none text-ink/50">{open === i ? "–" : "+"}</span>
          </button>
          {open === i && <p className="pb-5 text-[14px] leading-relaxed text-ink/80">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}
