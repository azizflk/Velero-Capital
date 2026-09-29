import { useEffect, useState } from "react";
import { stats } from "@/data/site";
import { useInView } from "@/lib/useInView";

function Counter({ value, prefix = "", suffix = "", go }: { value: number; prefix?: string; suffix?: string; go: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);
  return <span>{prefix}{n}{suffix}</span>;
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="card p-6 text-center sm:p-8">
          <div className="gradient-text text-4xl font-medium sm:text-5xl">
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} go={inView} />
          </div>
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
