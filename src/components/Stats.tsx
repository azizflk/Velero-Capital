import { useEffect, useState } from "react";
import { STATS_ASOF, stats } from "@/data/site";
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
  return <>{prefix}{n}{suffix}</>;
}

export default function Stats({ compact = false }: { compact?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="grid grid-cols-2 border-t border-rule sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s, i) => (
        <div key={s.label} className={`border-b border-rule py-6 pr-4 ${i % 2 ? "border-l pl-4 sm:border-l-0 sm:pl-0" : ""} sm:[&:not(:nth-child(3n+1))]:border-l sm:[&:not(:nth-child(3n+1))]:pl-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4 lg:[&:nth-child(3n+1)]:border-l lg:[&:first-child]:border-l-0 lg:[&:first-child]:pl-0`}>
          <div className={`display ${compact ? "text-4xl" : "text-5xl sm:text-6xl"}`}><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} go={inView} /></div>
          <div className="mt-2 text-[13px]">{s.label}</div>
          <div className="mt-1 text-[11px] text-ink/50">{STATS_ASOF}</div>
        </div>
      ))}
    </div>
  );
}
