import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * A five-second clip for the "not every opportunity deserves a conversation"
 * post: three unsolicited emails draw themselves in one line, a blue line
 * strikes them out, and the firm's answer — verification, transparency, a
 * track record — takes their place. Same paper, ink and blue as the site.
 *
 * Like the walkthrough it is a pure function of time, so it loops, pauses
 * when hidden, and renders frame by frame (scripts/render-walkthrough.mjs,
 * FILM=scams).
 */

export const CLIP_TOTAL = 5;

const W = 960;
const H = 540;
const BLUE = "#023ccf";
const INK = "#1f1f1f";
const PAPER = "#f3f4ef";
const DIM = "rgba(31,31,31,.72)";

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x: number) => 1 - (1 - clamp(x)) ** 3;
const seg = (t: number, a: number, d: number) => clamp((t - a) / d);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Three envelopes on one line, each 150 wide and 96 tall, 60 apart. */
const EW = 150, EH = 96, GAPX = 60;
const envelope = (x: number) => `L ${x} 0 L ${x} ${-EH} L ${x + EW} ${-EH} L ${x + EW / 2} ${-EH / 2 + 6} L ${x} ${-EH} L ${x} 0 L ${x + EW} 0 L ${x + EW} ${-EH} L ${x + EW} 0`;
const MAILS = [
  { from: "“Strategic partner”", line: "Exclusive deal. Reply today." },
  { from: "“Fund manager”", line: "$20M available. No diligence needed." },
  { from: "“Investor”", line: "URGENT opportunity, 48 hours." },
];
const X0 = (W - (3 * EW + 2 * GAPX)) / 2;
const ENVELOPES = `M ${X0 - 80} 0 ` + MAILS.map((_, i) => envelope(X0 + i * (EW + GAPX))).join(" ") + ` L ${W - X0 + 80} 0`;
/** One blue stroke crossing all three out, corner to corner. */
const STRIKE = MAILS.map((_, i) => { const x = X0 + i * (EW + GAPX); return `${i ? "L" : "M"} ${x - 8} ${-EH - 10} L ${x + EW + 8} 10`; }).join(" ");
/** A tick in a circle. */
const TICK = "M 0 -28 C -15.5 -28 -28 -15.5 -28 0 C -28 15.5 -15.5 28 0 28 C 15.5 28 28 15.5 28 0 C 28 -15.5 15.5 -28 0 -28 L 0 -28 M -12 1 L -4 9 L 13 -9";

type Props = { className?: string; style?: CSSProperties; at?: number };

export default function ScamClip({ className = "", style, at }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [t, setT] = useState(at ?? 0);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const fit = () => { const w = el.clientWidth; if (w) setScale((s) => (Math.abs(s - w / W) > 0.0005 ? w / W : s)); };
    fit();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(el);
    window.addEventListener("resize", fit);
    return () => { ro?.disconnect(); window.removeEventListener("resize", fit); };
  }, []);

  useEffect(() => {
    if (at != null) { setT(at); return undefined; }
    if (reduced) { setT(4.6); return undefined; }
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!document.hidden) { acc = (acc + dt) % CLIP_TOTAL; setT(acc); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [at, reduced]);

  // Beat A (0–1.7): the emails arrive. Beat B (1.7–3): struck out. Beat C (3–5): the answer.
  const draw = ease(seg(t, 0.1, 1.3));
  const strike = ease(seg(t, 1.75, 0.6));
  const gone = ease(seg(t, 2.9, 0.4));
  const answer = ease(seg(t, 3.05, 0.6));
  const tick = ease(seg(t, 3.3, 0.7));
  const end = 1 - seg(t, 4.65, 0.35);
  const base = 330;

  return (
    <div ref={box} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "16 / 9", background: PAPER, ...style }} role="img" aria-label="Not every opportunity deserves a conversation">
      <div inert style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0", pointerEvents: "none", userSelect: "none", color: INK, background: PAPER, opacity: end }}>
        {/* Beat A + B: the emails */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - gone }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 54, textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, fontWeight: 600, opacity: ease(seg(t, 0.15, 0.5)) }}>Every day, in our inbox</div>
            <div className="display" style={{ fontSize: 44, marginTop: 10, opacity: ease(seg(t, 0.3, 0.6)), transform: `translateY(${(1 - ease(seg(t, 0.3, 0.6))) * 12}px)` }}>“Investors”, “fund managers”, “strategic partners”.</div>
            <div className="display" style={{ fontSize: 44, color: BLUE, opacity: strike, transform: `translateY(${(1 - strike) * 12}px)` }}>A surprising number are scams.</div>
          </div>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
            <g transform={`translate(0 ${base})`}>
              <path d={ENVELOPES} pathLength={1} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - draw} />
              <path d={STRIKE} pathLength={1} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - strike} />
            </g>
          </svg>
          {MAILS.map((m, i) => {
            const p = ease(seg(t, 0.5 + i * 0.3, 0.45));
            const x = X0 + i * (EW + GAPX);
            return (
              <div key={m.from} style={{ position: "absolute", left: x - 20, width: EW + 40, top: base + 16, textAlign: "center", opacity: p * (1 - strike * 0.6), transform: `translateY(${(1 - p) * 8}px)` }}>
                <div className="display" style={{ fontSize: 17 }}>{m.from}</div>
                <div style={{ fontSize: 11.5, color: DIM, marginTop: 3 }}>{m.line}</div>
              </div>
            );
          })}
        </div>

        {/* Beat C: the answer */}
        <div style={{ position: "absolute", inset: 0, opacity: answer }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 118, textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, fontWeight: 600 }}>In private markets, credibility is built through</div>
            {["Verification.", "Transparency.", "A track record."].map((w, i) => {
              const p = ease(seg(t, 3.25 + i * 0.22, 0.55));
              return <div key={w} className="display" style={{ fontSize: 62, lineHeight: 1, marginTop: i ? 2 : 14, color: i === 2 ? BLUE : INK, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>{w}</div>;
            })}
            <div style={{ fontSize: 15, color: DIM, marginTop: 18, opacity: ease(seg(t, 4.0, 0.5)) }}>Not every opportunity deserves a conversation.</div>
          </div>
          <svg width={80} height={80} viewBox="-40 -40 80 80" style={{ position: "absolute", left: W / 2 - 40, top: 356 + 72, opacity: 0 }} aria-hidden="true" />
          <svg width={64} height={64} viewBox="-32 -32 64 64" style={{ position: "absolute", left: 140, top: 190, transform: `scale(${lerp(0.7, 1, tick)})` }} aria-hidden="true">
            <path d={TICK} pathLength={1} fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - tick} />
          </svg>
        </div>

        <div style={{ position: "absolute", left: 40, bottom: 18, display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM }}>
          <img src="/images/logo-box.png" alt="" style={{ height: 14, width: "auto" }} />
          <span>Velero Capital</span>
        </div>
        <div style={{ position: "absolute", right: 40, bottom: 18, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM }}>velero.capital</div>
      </div>
    </div>
  );
}
