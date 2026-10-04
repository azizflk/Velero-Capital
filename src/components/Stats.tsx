import { useEffect, useState } from "react";
import { stats } from "@/data/site";
import { useInView } from "@/lib/useInView";

function Counter({ value, prefix = "", suffix = "", go }: { value: number; prefix?: string; suffix?: string; go: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    const start = performance.now(); const dur = 1400; let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - start) / dur); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);
  return <>{prefix}{n.toLocaleString("en-US")}{suffix}</>;
}

export default function Stats({ compact = false }: { compact?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} data-stats className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.title} className="bg-paper p-5 sm:p-6">
          <div className={`display ${compact ? "text-4xl" : "text-5xl sm:text-6xl"}`}><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} go={inView} /></div>
          <div className="mt-3 text-[14px] font-semibold">{s.title}</div>
          <div className="mt-0.5 text-[13px] text-ink/70">{s.note}</div>
        </div>
      ))}
    </div>
  );
}
