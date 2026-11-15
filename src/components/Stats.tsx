import { useEffect, useState } from "react";
import { stats } from "@/data/site";
import { useInView } from "@/lib/useInView";

function Counter({ value, prefix = "", suffix = "", go }: { value: number; prefix?: string; suffix?: string; go: boolean }) {
  // The figure itself is the first render, so it is in the static HTML and readable without scripts.
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!go) { setN(0); return; }
    const start = performance.now(); const dur = 1400; let raf = 0;
    // The first frame's timestamp can be a hair earlier than `start`; never count below zero.
    const tick = (t: number) => { const p = Math.min(1, Math.max(0, (t - start) / dur)); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);
  // One string, so the figure is one text node in the static HTML ("$350M+"), not three.
  return <>{`${prefix}${n.toLocaleString("en-US")}${suffix}`}</>;
}

/** `compact` is the smaller figure used inside pages; `hero` is the tight row that closes the home page's first screen. */
export default function Stats({ compact = false, hero = false }: { compact?: boolean; hero?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  // In the hero the row is on screen from the first paint. It stays transparent until the page is live, then fades in
  // as the count starts, so nobody sees the finished figures drop to zero. (Without scripts, index.html shows it as is.)
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  return (
    <div ref={ref} data-stats className={hero ? `transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}` : undefined}>
      <div className={`grid gap-px border border-rule bg-rule lg:grid-cols-4 ${hero ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {stats.map((s) => (
          <div key={s.title} className={`bg-paper ${hero ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
            <div className={`display ${hero ? "text-3xl sm:text-4xl" : compact ? "text-4xl" : "text-5xl sm:text-6xl"}`}><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} go={inView} /></div>
            <div className={`font-semibold ${hero ? "mt-2 text-[13px] sm:text-[14px]" : "mt-3 text-[14px]"}`}>{s.title}</div>
            <div className={`mt-0.5 text-[13px] text-ink/70 ${hero ? "hidden sm:block" : ""}`}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
