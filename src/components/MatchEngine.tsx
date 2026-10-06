import { useEffect, useRef, useState } from "react";

/**
 * The match engine: an opportunity on one side of the court is played across the net ("Velero Capital")
 * to the capital that suits it on the other. One rally at a time, serving from alternate ends.
 * The pairs are illustrative of the kind of matching we do, not a record of transactions.
 */
const pairs = [
  { from: "Late-stage company", fromSub: "Pre-IPO round", to: "Family office", toSub: "Direct allocation", tag: "Late-Stage & Pre-IPO", how: "Direct holding" },
  { from: "Early shareholder", fromSub: "Secondary sale", to: "Institutional buyer", toSub: "Existing shares", tag: "Secondaries", how: "Single-asset SPV" },
  { from: "Real estate sponsor", fromSub: "Logistics portfolio", to: "Real estate investor", toSub: "Co-investment", tag: "Real Estate", how: "Joint venture" },
  { from: "Lead investor", fromSub: "Oversubscribed round", to: "Investor syndicate", toSub: "Deal by deal", tag: "Co-Investments", how: "Syndicate vehicle" },
  { from: "Founder", fromSub: "Growth round", to: "Growth fund", toSub: "Lead cheque", tag: "Fundraising Advisory", how: "Priced round" },
  { from: "Fund investor", fromSub: "LP stake for sale", to: "Secondary fund", toSub: "LP interests", tag: "Secondaries", how: "LP transfer" },
];

const W = 440, H = 580;
const court = { x: 70, y: 90, w: 300, h: 400 };
const net = court.y + court.h / 2;
const alley = 37;
const slots = [115, 167.5, 220, 272.5, 325];
const landing = [3, 0, 4, 1, 2, 4]; // shuffled so successive rallies cross the court
const SERVE = 1700, HOLD = 1900, FADE = 500;

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function rally(i: number) {
  const a = { x: slots[i % slots.length], y: court.y };
  const b = { x: slots[landing[i % landing.length]], y: court.y + court.h };
  const bend = (i % 2 ? -1 : 1) * 110;
  const c = { x: Math.min(court.x + court.w - 10, Math.max(court.x + 10, (a.x + b.x) / 2 + bend)), y: net }; // keep the arc on the court
  const up = i % 2 === 1; // odd rallies are served from the capital side
  const [p0, p2] = up ? [b, a] : [a, b];
  const at = (t: number) => ({
    x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * c.x + t * t * p2.x,
    y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * c.y + t * t * p2.y,
  });
  return { a, b, at, d: `M ${p0.x} ${p0.y} Q ${c.x} ${c.y} ${p2.x} ${p2.y}` };
}

export default function MatchEngine({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [matched, setMatched] = useState(false);
  const group = useRef<SVGGElement>(null);
  const arc = useRef<SVGPathElement>(null);
  const ball = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const r = rally(i);
    const place = (t: number) => {
      const p = r.at(t);
      ball.current?.setAttribute("cx", String(p.x));
      ball.current?.setAttribute("cy", String(p.y));
      arc.current?.setAttribute("stroke-dasharray", `${t} 1`);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(1);
      setMatched(true);
      return;
    }
    setMatched(false);
    place(0);
    if (group.current) group.current.style.opacity = "1";
    let raf = 0, start = 0, done = false;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      if (t < SERVE) place(ease(t / SERVE));
      else if (t < SERVE + HOLD) {
        if (!done) { done = true; place(1); setMatched(true); }
      } else if (t < SERVE + HOLD + FADE) {
        if (group.current) group.current.style.opacity = String(1 - (t - SERVE - HOLD) / FADE);
      } else {
        setI((n) => (n + 1) % pairs.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i]);

  const p = pairs[i];
  const r = rally(i);
  const line = { stroke: "currentColor", strokeOpacity: 0.22, strokeWidth: 1, fill: "none", vectorEffect: "non-scaling-stroke" as const };
  const head = { fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textAnchor: "middle" as const, fill: "currentColor", fillOpacity: 0.55 };
  const tagW = (p.tag.length + 12) * 7.4 + 28;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`block w-full text-ink ${className}`} role="img" aria-label="Animation of opportunities being matched with capital across a court, with Velero Capital at the net">
      <text x={W / 2} y={16} {...head}>THE OPPORTUNITY</text>
      <text x={W / 2} y={H - 6} {...head}>THE CAPITAL</text>

      {/* court */}
      <rect x={court.x} y={court.y} width={court.w} height={court.h} {...line} />
      <path d={`M ${court.x + alley} ${court.y} V ${court.y + court.h} M ${court.x + court.w - alley} ${court.y} V ${court.y + court.h}`} {...line} />
      <path d={`M ${court.x + alley} ${net - 110} H ${court.x + court.w - alley} M ${court.x + alley} ${net + 110} H ${court.x + court.w - alley} M ${W / 2} ${net - 110} V ${net + 110}`} {...line} />
      {/* the net */}
      <path d={`M ${court.x - 14} ${net} H ${court.x + court.w + 14}`} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <rect x={W / 2 - 62} y={net - 11} width={124} height={22} rx={11} fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth={1} />
      <text x={W / 2} y={net + 4} fontSize={10} fontWeight={700} letterSpacing="0.18em" textAnchor="middle" fill="var(--color-blue)">VELERO CAPITAL</text>

      <g ref={group}>
        <path ref={arc} d={r.d} pathLength={1} strokeDasharray="0 1" fill="none" stroke="var(--color-blue)" strokeWidth={1.75} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle cx={r.a.x} cy={r.a.y} r={4.5} fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth={1.5} />
        <circle cx={r.b.x} cy={r.b.y} r={4.5} fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth={1.5} />
        <circle ref={ball} r={6} fill="var(--color-blue)" />

        <text x={r.a.x} y={court.y - 30} fontSize={14} fontWeight={600} textAnchor="middle" fill="currentColor">{p.from}</text>
        <text x={r.a.x} y={court.y - 14} fontSize={11} textAnchor="middle" fill="currentColor" fillOpacity={0.6}>{p.fromSub}</text>
        <text x={r.b.x} y={court.y + court.h + 22} fontSize={14} fontWeight={600} textAnchor="middle" fill="currentColor">{p.to}</text>
        <text x={r.b.x} y={court.y + court.h + 38} fontSize={11} textAnchor="middle" fill="currentColor" fillOpacity={0.6}>{p.toSub}</text>

        <g style={{ opacity: matched ? 1 : 0, transition: "opacity .35s ease" }}>
          <rect x={W / 2 - tagW / 2} y={net - 62} width={tagW} height={24} rx={12} fill="var(--color-blue)" />
          <text x={W / 2} y={net - 46} fontSize={10.5} fontWeight={600} letterSpacing="0.08em" textAnchor="middle" fill="#fff">✓ MATCHED · {p.tag.toUpperCase()}</text>
          <text x={r.b.x} y={court.y + court.h + 54} fontSize={11} fontWeight={600} textAnchor="middle" fill="var(--color-blue)">{p.how}</text>
        </g>
      </g>
    </svg>
  );
}
