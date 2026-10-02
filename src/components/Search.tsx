import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "@/data/search";

export default function Search({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => search(q), [q]);

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 0); } }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;
  const go = (to: string) => { onClose(); navigate(to); };

  return (
    <div className="fixed inset-0 z-[60] bg-paper" role="dialog" aria-modal="true" aria-label="Search">
      <div className="wrap flex h-20 items-center justify-between">
        <span className="display text-2xl">Search</span>
        <button onClick={onClose} className="pill">Close</button>
      </div>
      <div className="wrap">
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === "Enter" && results[sel]) go(results[sel].to);
          }}
          placeholder="Search Velero Capital"
          aria-label="Search Velero Capital"
          className="display w-full border-0 border-b border-ink bg-transparent py-4 text-4xl placeholder:text-ink/25 focus:outline-none sm:text-6xl"
        />
        <div className="mt-6 max-h-[60vh] overflow-y-auto pb-10">
          {q && results.length === 0 && <p className="text-[14px] text-ink/60">No results for “{q}”.</p>}
          {results.map((r, i) => (
            <button key={r.title + r.to + i} onClick={() => go(r.to)} onMouseEnter={() => setSel(i)} className={`grid w-full grid-cols-12 gap-4 border-t border-rule py-3 text-left ${i === sel ? "bg-sand" : ""}`}>
              <span className="eyebrow col-span-12 px-2 sm:col-span-2">{r.section}</span>
              <span className="col-span-12 px-2 sm:col-span-10">
                <span className="block text-[15px] font-semibold">{r.title}</span>
                <span className="block truncate text-[13px] text-ink/70">{r.text}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
