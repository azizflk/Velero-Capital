import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { EDITIONS, CHAPTERS, type Edition, type Scene } from "./scenes";
import { S, gap, row, candles, coins, type Scene as Stroke } from "@/components/VeleroStory";
import { stats, STATS_ASOF, offices } from "@/data/site";
import { CONTACT_EMAIL } from "@/data/site";
import { investments, process } from "@/data/investments";
import { menus } from "@/data/menus";

/**
 * The Velero Capital walkthrough — one unbroken line, as on the site.
 *
 * The pen goes down once and never lifts. It draws the sailboat, then runs
 * along a baseline from topic to topic: the investors we serve, the three
 * strategies, the firm's figures, how a transaction runs, the advisory
 * practice, Dubai and San Francisco, the staged investor-access process, and
 * finally the lighthouse and the boat coming home. At each stop the line
 * inks that topic's drawing while the words and figures animate in beside it.
 *
 * The chapters read the site's own data files, so what the film says is what
 * the pages say. Everything is a function of the elapsed time `t`, so the
 * film is deterministic: it loops seamlessly, pauses when the tab is hidden,
 * and renders frame by frame to video (scripts/render-walkthrough.mjs).
 */

const W = 960;
const H = 540;
const BLUE = "#023ccf";
const INK = "#1f1f1f";
const PAPER = "#f3f4ef";
const RULE = "rgba(0,0,0,0.12)";
const DIM = "rgba(31,31,31,.72)";

/** World units → stage pixels at zoom 1; the baseline's y on the stage; the stage's horizontal centre. */
const K = 0.54;
const BASE = 468;
const CX = 480;
/** The stretch of bare baseline the pen travels between one topic and the next. */
const LEAD = 150;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x: number) => 1 - (1 - clamp(x)) ** 3;
const easeInOut = (x: number) => { const c = clamp(x); return c < 0.5 ? 4 * c * c * c : 1 - (-2 * c + 2) ** 3 / 2; };
const smooth = (x: number) => { const c = clamp(x); return c * c * (3 - 2 * c); };
/** 0→1 over [a, a+d] seconds of a local timeline. */
const seg = (lt: number, a: number, d: number) => clamp((lt - a) / d);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ── The drawings, chapter by chapter ────────────────────────────────────────

const person = (w: number): Stroke => {
  const s = w / 50;
  const n = (v: number) => +(v * s).toFixed(1);
  return { w, d: `L 0 ${n(50)} C 0 ${n(75)} ${n(12)} ${n(82)} ${n(25)} ${n(82)} C ${n(7)} ${n(82)} ${n(7)} ${n(118)} ${n(25)} ${n(118)} C ${n(43)} ${n(118)} ${n(43)} ${n(82)} ${n(25)} ${n(82)} C ${n(38)} ${n(82)} ${n(50)} ${n(75)} ${n(50)} ${n(50)} L ${n(50)} 0` };
};

/** Four steps climbing left to right: sourcing, diligence, structuring, closing. Each tread is 65 wide. */
const STAIR_TREADS = [62, 127, 192, 257];
const stairs: Stroke = { w: 310, d: "L 30 0 L 30 40 L 95 40 L 95 80 L 160 80 L 160 120 L 225 120 L 225 160 L 290 160 L 290 0 L 310 0" };

/** Beads threaded on the line: one for each stage of investor access. */
const BEAD_STEP = 150;
const BEAD_R = 10;
const beads = (n: number): Stroke => {
  const r = BEAD_R, k = +(0.5523 * r).toFixed(2);
  const d: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = 20 + i * BEAD_STEP, cx = x + r, x2 = x + 2 * r;
    d.push(`L ${x} 0 C ${x} ${k} ${cx - k} ${r} ${cx} ${r} C ${cx + k} ${r} ${x2} ${k} ${x2} 0 C ${x2} ${-k} ${cx + k} ${-r} ${cx} ${-r} C ${cx - k} ${-r} ${x} ${-k} ${x} 0 L ${x2} 0`);
  }
  const w = 20 + (n - 1) * BEAD_STEP + 2 * r + 20;
  d.push(`L ${w} 0`);
  return { w, d: d.join(" ") };
};
const beadX = (i: number) => 20 + i * BEAD_STEP + BEAD_R;

type ChapterDef = { id: string; strokes: Stroke[]; zoom?: number; lead?: number };
const FULL_DEFS: ChapterDef[] = [
  { id: "intro", strokes: [S.wave, S.wave, S.boat, S.wave, S.wave], zoom: 1.3 },
  { id: "who", strokes: [person(56), person(56), person(56), gap(30), S.institution, gap(30), S.globe] },
  { id: "late", strokes: [S.rocket, gap(30), S.bell] },
  { id: "secondaries", strokes: [person(86), gap(40), S.certificate, gap(40), person(86)] },
  { id: "realestate", strokes: [S.house, gap(20), S.warehouse, gap(20), S.apartments, gap(20), S.tower, gap(16), S.tree] },
  { id: "coinvest", strokes: [coins, gap(40), S.pie] },
  { id: "record", strokes: [candles, gap(30), S.growth] },
  { id: "process", strokes: [stairs] },
  { id: "services", strokes: [S.merge, gap(30), S.screen], zoom: 0.88 },
  { id: "where", strokes: [S.bridge, gap(16), S.pyramid, gap(80), S.dubai, S.palm] },
  { id: "access", strokes: [beads(6)] },
  { id: "outro", strokes: [S.wave, S.wave, S.lighthouse, gap(10), S.wave, S.boat, S.wave, S.wave], zoom: 1.15, lead: 300 },
];
/** The short cut for feeds: the three strategies share one stop. */
const STRATEGY_STROKES: Stroke[] = [S.rocket, gap(70), S.certificate, gap(70), S.house, gap(14), S.tower];
const SHORT_DEFS: ChapterDef[] = [
  FULL_DEFS[0],
  FULL_DEFS[1],
  { id: "strategies", strokes: STRATEGY_STROKES, zoom: 0.9 },
  FULL_DEFS.find((c) => c.id === "record")!,
  FULL_DEFS.find((c) => c.id === "access")!,
  FULL_DEFS.find((c) => c.id === "outro")!,
];

type Part = { id: string; x0: number; x1: number; d: string; zoom: number };

/** The whole line, laid out left to right along one baseline (y = 0, up is negative). */
function buildWorld(defs: ChapterDef[]) {
  let x = 0;
  const parts: Part[] = [];
  const all: string[] = [];
  defs.forEach((c, i) => {
    const lead = i ? c.lead ?? LEAD : 40;
    const r = row([gap(lead), ...c.strokes], x, 0, 1);
    parts.push({ id: c.id, x0: x + lead, x1: r.x, d: r.d, zoom: c.zoom ?? 1 });
    all.push(r.d);
    x = r.x;
  });
  return { d: `M 0 0 ${all.join(" ")}`, parts };
}
type World = ReturnType<typeof buildWorld>;
const WORLDS: Record<Edition, World> = { full: buildWorld(FULL_DEFS), short: buildWorld(SHORT_DEFS) };

/** A hidden path used to measure lengths and find the pen's tip. */
let probe: SVGPathElement | null = null;
function getProbe() {
  if (probe) return probe;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  svg.setAttribute("aria-hidden", "true");
  probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.appendChild(probe);
  document.body.appendChild(svg);
  return probe;
}

/** The probe set to a path (only when it changes). */
function probeFor(d: string) {
  const p = getProbe();
  if (p.getAttribute("d") !== d) p.setAttribute("d", d);
  return p;
}

/** The line's length at the end of each chapter's drawing. */
const MARKS: Partial<Record<Edition, number[]>> = {};
function measureMarks(edition: Edition) {
  if (MARKS[edition]) return MARKS[edition]!;
  const p = getProbe();
  const marks: number[] = [];
  let d = "M 0 0";
  for (const part of WORLDS[edition].parts) {
    d += " " + part.d;
    p.setAttribute("d", d);
    marks.push(p.getTotalLength());
  }
  MARKS[edition] = marks;
  return marks;
}

// ── Engine ──────────────────────────────────────────────────────────────────

type Props = {
  className?: string;
  style?: CSSProperties;
  /** Freeze the film at this second (stills, frame rendering). */
  at?: number;
  /** Start playback here. */
  startAt?: number;
  /** Play only this stretch, over and over. */
  loop?: [number, number];
  /** An audio URL laid out on the film's own timeline; adds a sound button. */
  music?: string;
  /** The full film (default) or the short cut for feeds. */
  edition?: Edition;
};

export default function VeleroFilm({ className = "", style, at, startAt = 0, loop, music, edition = "full" }: Props) {
  const { scenes: SCENES, total: TOTAL } = EDITIONS[edition];
  const WORLD = WORLDS[edition];
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [t, setT] = useState(() => at ?? startAt % TOTAL);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [loopFrom, loopTo] = loop ?? [0, 0];
  const marks = useMemo(() => (typeof document === "undefined" ? WORLD.parts.map((_, i) => i + 1) : measureMarks(edition)), [edition, WORLD]);

  // Fit the 960×540 stage to the box.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const fit = () => { const w = el.clientWidth; if (w) setScale((s) => (Math.abs(s - w / W) > 0.0005 ? w / W : s)); };
    fit();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(el);
    window.addEventListener("resize", fit);
    const id = setInterval(fit, 500);
    return () => { ro?.disconnect(); window.removeEventListener("resize", fit); clearInterval(id); };
  }, []);

  // Music: while it plays it is the film's clock, so sound and picture never drift.
  const audio = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState(false);
  const soundRef = useRef(false);
  soundRef.current = sound;

  useEffect(() => {
    if (at != null) { setT(at); return undefined; }
    if (reduced) { setT(SCENES[1].start + 6); return undefined; }
    let raf = 0;
    let last = performance.now();
    const ranged = loopTo > loopFrom;
    let acc = ranged ? clamp(startAt, loopFrom, loopTo - 0.001) : startAt % TOTAL;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const a = audio.current;
      if (soundRef.current && a && !a.paused) {
        let m = a.currentTime;
        if (ranged && (m >= loopTo || m < loopFrom)) { a.currentTime = loopFrom; m = loopFrom; }
        acc = ranged ? m : m % TOTAL;
        setT(acc);
      } else if (!document.hidden) {
        acc = ranged ? loopFrom + ((acc - loopFrom + dt) % (loopTo - loopFrom)) : (acc + dt) % TOTAL;
        setT(acc);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, at, startAt, loopFrom, loopTo, TOTAL, SCENES]);

  const playable = !!music && at == null && !reduced;
  useEffect(() => {
    const a = audio.current;
    if (a && sound && loopTo > loopFrom) a.volume = clamp((t - loopFrom) / 0.3) * clamp((loopTo - t) / 0.5);
  }, [t, sound, loopFrom, loopTo]);
  useEffect(() => {
    if (!playable) return undefined;
    const onVis = () => {
      const a = audio.current;
      if (!a || !sound) return;
      if (document.hidden) a.pause(); else a.play().catch(() => setSound(false));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playable, sound]);
  useEffect(() => () => audio.current?.pause(), []);
  const toggleSound = () => {
    const a = audio.current;
    if (!a) return;
    if (sound) { a.pause(); setSound(false); return; }
    try { a.currentTime = t; } catch { /* starts from 0 */ }
    a.play().then(() => setSound(true)).catch(() => setSound(false));
  };

  // ── Where everything is at time t ──
  const idx = Math.max(0, SCENES.findIndex((s) => t >= s.start && t < s.start + s.dur));
  const scene = SCENES[idx];
  const lt = t - scene.start;
  const part = WORLD.parts[idx];
  // The words fade in over 0.45s and out over the last 0.5s of each chapter; the line itself stays.
  const vis = Math.min(seg(lt, 0, 0.45), 1 - seg(lt, scene.dur - 0.5, 0.5));

  // The pen: from the end of the previous drawing, along the lead and through this chapter's drawing.
  const L0 = idx ? marks[idx - 1] : 0;
  const L1 = marks[idx];
  const len = L0 + (L1 - L0) * smooth(seg(lt, 0.1, scene.draw));
  const total = marks[marks.length - 1];

  // The camera: centred on each chapter's drawing, gliding over from the previous one as the pen travels.
  const centre = (p: Part) => (p.x0 + p.x1) / 2;
  const prev = WORLD.parts[idx - 1];
  const glide = idx ? easeInOut(seg(lt, 0, 1.4)) : 1;
  const camX = prev ? lerp(centre(prev), centre(part), glide) : centre(part);
  const zoom = prev ? lerp(prev.zoom, part.zoom, glide) : part.zoom;
  const kz = K * zoom;
  /** World (x, height above the baseline) → stage pixels. */
  const anchor = (wx: number, wy: number) => ({ x: CX + (wx - camX) * kz, y: BASE - wy * kz });

  let tip = { x: 0, y: 0 };
  if (typeof document !== "undefined") {
    const pt = probeFor(WORLD.d).getPointAtLength(len);
    tip = { x: CX + (pt.x - camX) * kz, y: BASE + pt.y * kz };
  }
  const inking = lt > 0.1 && lt < scene.draw + 0.1;

  const ctx: Ctx = { lt, vis, part, anchor, scene: scene.id, idx, scenes: SCENES, brief: edition === "short" };

  const film = (
    <div ref={box} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "16 / 9", background: PAPER, ...style }} role="img" aria-label="Velero Capital walkthrough">
      <div inert style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0", pointerEvents: "none", userSelect: "none", color: INK, background: PAPER }}>
        {/* The line: the finished drawing as a faint ghost, and the ink that has been laid down so far. */}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
          <g transform={`translate(${CX - camX * kz} ${BASE}) scale(${kz})`}>
            <path d={WORLD.d} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity={0.1} />
            <path d={WORLD.d} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" strokeDasharray={`${total} ${total}`} strokeDashoffset={Math.max(0, total - len)} />
          </g>
          {/* The pen's tip: a drop of blue ink, larger while the line is moving. */}
          <circle cx={tip.x} cy={tip.y} r={inking ? 4.5 : 3 + Math.sin(lt * 4) * 0.6} fill={BLUE} />
          <circle cx={tip.x} cy={tip.y} r={inking ? 10 : 7} fill="none" stroke={BLUE} strokeWidth={1} opacity={0.35} />
        </svg>

        <div style={{ position: "absolute", inset: 0 }}>
          {scene.id === "intro" && <Intro {...ctx} />}
          {scene.id === "who" && <Who {...ctx} />}
          {scene.id === "strategies" && <Strategies {...ctx} />}
          {scene.id === "late" && <Late {...ctx} />}
          {scene.id === "secondaries" && <Secondaries {...ctx} />}
          {scene.id === "realestate" && <RealEstate {...ctx} />}
          {scene.id === "coinvest" && <CoInvest {...ctx} />}
          {scene.id === "record" && <Record {...ctx} />}
          {scene.id === "process" && <Process {...ctx} />}
          {scene.id === "services" && <Services {...ctx} />}
          {scene.id === "where" && <Where {...ctx} />}
          {scene.id === "access" && <Access {...ctx} />}
          {scene.id === "outro" && <Outro {...ctx} />}
        </div>

        {/* Footer: the mark, the progress of the film. */}
        <div style={{ position: "absolute", left: 40, bottom: 16, display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, opacity: idx ? 1 : 0 }}>
          <img src="/images/logo-box.png" alt="" style={{ height: 14, width: "auto" }} />
          <span>Velero Capital</span>
        </div>
        <div style={{ position: "absolute", right: 40, bottom: 16, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, fontVariantNumeric: "tabular-nums" }}>
          {idx && idx < SCENES.length - 1 ? `${String(idx).padStart(2, "0")} / ${String(SCENES.length - 2).padStart(2, "0")}` : "velero.capital"}
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 3, width: `${(t / TOTAL) * 100}%`, background: BLUE, opacity: 0.7 }} />
      </div>
    </div>
  );
  if (!playable) return film;
  return (
    <div className="relative">
      {film}
      <audio ref={audio} src={music} preload="none" loop />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={sound}
        aria-label={sound ? "Mute" : "Turn sound on"}
        title={sound ? "Mute" : "Turn sound on"}
        style={{
          position: "absolute", right: 12, top: 12, zIndex: 2, width: 38, height: 38, borderRadius: 999,
          display: "grid", placeItems: "center", cursor: "pointer", border: `1px solid ${RULE}`,
          background: "rgba(255,255,255,.85)", color: INK, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4z" />
          {sound ? <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></> : <><path d="m16 9 5 5" /><path d="m21 9-5 5" /></>}
        </svg>
      </button>
    </div>
  );
}

// ── Pieces ──────────────────────────────────────────────────────────────────

type Ctx = { lt: number; vis: number; part: Part; anchor: (wx: number, wy: number) => { x: number; y: number }; scene: string; idx: number; scenes: Scene[]; brief: boolean };

function Appear({ lt, at, children, dy = 14, dx = 0, dur = 0.55, style }: { lt: number; at: number; children: ReactNode; dy?: number; dx?: number; dur?: number; style?: CSSProperties }) {
  const p = ease(seg(lt, at, dur));
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`, ...style }}>{children}</div>;
}

/** The chapter's words, top left: the mark, display caps (the last line in blue), one sentence. */
function Words({ lt, vis, idx, scenes, lines, sub, size = 44, width = 420 }: { lt: number; vis: number; idx: number; scenes: Scene[]; lines: string[]; sub?: string; size?: number; width?: number }) {
  const name = CHAPTERS[scenes[idx].id];
  const m = ease(seg(lt, 0.25, 0.6));
  return (
    <div style={{ position: "absolute", left: 56, top: 54, width, opacity: vis }}>
      {name && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: m, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: BLUE, fontVariantNumeric: "tabular-nums" }}>{String(idx).padStart(2, "0")}</span>
          <span style={{ width: 28 * m, height: 1, background: BLUE }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(31,31,31,.6)" }}>{name}</span>
        </div>
      )}
      {lines.map((line, i) => (
        <Appear key={line} lt={lt} at={0.4 + i * 0.16} dx={-40} dy={0} dur={0.7}>
          <div className="display" style={{ fontSize: size, color: i === lines.length - 1 ? BLUE : INK, marginBottom: 4 }}>{line}</div>
        </Appear>
      ))}
      {sub && <Appear lt={lt} at={0.95}><p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: DIM, maxWidth: 380 }}>{sub}</p></Appear>}
    </div>
  );
}

/** A column of points on the right: a blue rule, a title, a sentence; each arrives in turn. */
function Points({ lt, vis, items, at = 1.1, step = 0.5, top = 70, left = 560, width = 350, titleSize = 18, hot = -1 }: { lt: number; vis: number; items: { title: string; text: string }[]; at?: number; step?: number; top?: number; left?: number; width?: number; titleSize?: number; hot?: number }) {
  return (
    <div style={{ position: "absolute", left, top, width, opacity: vis }}>
      {items.map((it, i) => {
        const p = ease(seg(lt, at + i * step, 0.6));
        return (
          <div key={it.title} style={{ position: "relative", padding: "10px 0 12px 18px", opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
            <span style={{ position: "absolute", left: 0, top: 12, width: 2, height: `${p * 100}%`, maxHeight: "calc(100% - 20px)", background: BLUE }} />
            <div className="display" style={{ fontSize: titleSize, color: hot === i ? BLUE : INK }}>{it.title}</div>
            <p style={{ marginTop: 4, fontSize: 11.5, lineHeight: 1.5, color: DIM }}>{it.text}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Small round labels that arrive one after another. */
function Pills({ lt, items, at, step = 0.14, blue = false, style }: { lt: number; items: string[]; at: number; step?: number; blue?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, ...style }}>
      {items.map((s, i) => {
        const p = ease(seg(lt, at + i * step, 0.45));
        return (
          <span key={s} style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "5px 12px", fontSize: 10.5, fontWeight: 500, border: `1px solid ${blue ? BLUE : INK}`, background: blue ? BLUE : "transparent", color: blue ? "#fff" : INK, whiteSpace: "nowrap", opacity: p, transform: `scale(${lerp(0.8, 1, p)})` }}>{s}</span>
        );
      })}
    </div>
  );
}

/** A label pinned to a point on the drawing, with a short vertical tick down to it. */
function Tag({ x, y, lt, at, title, text, blue = false, align = "center", width = 150, tick = 18, up = true }: { x: number; y: number; lt: number; at: number; title: string; text?: string; blue?: boolean; align?: "left" | "center" | "right"; width?: number; tick?: number; up?: boolean }) {
  const p = ease(seg(lt, at, 0.5));
  const left = align === "center" ? x - width / 2 : align === "left" ? x : x - width;
  const tickX = align === "center" ? width / 2 : align === "left" ? 0 : width;
  return (
    <div style={{ position: "absolute", left, top: up ? y - tick - 34 - (text ? 14 : 0) : y + tick + 4, width, textAlign: align, opacity: p, transform: `translateY(${(1 - p) * (up ? 8 : -8)}px)` }}>
      {!up && <div style={{ position: "absolute", left: tickX, top: -tick - 4, width: 1, height: tick * p, background: blue ? BLUE : INK, opacity: 0.6 }} />}
      <div className="display" style={{ fontSize: 15, color: blue ? BLUE : INK, lineHeight: 1 }}>{title}</div>
      {text && <div style={{ fontSize: 10, lineHeight: 1.35, color: DIM, marginTop: 3 }}>{text}</div>}
      {up && <div style={{ position: "absolute", left: tickX, bottom: -tick - 2, width: 1, height: tick * p, background: blue ? BLUE : INK, opacity: 0.6 }} />}
    </div>
  );
}

/** Where each stroke of a chapter starts, in world units. */
function starts(strokes: Stroke[], from: number) {
  const xs: number[] = [];
  let x = from;
  for (const s of strokes) { xs.push(x); x += s.w; }
  return xs;
}
const defOf = (id: string) => FULL_DEFS.find((c) => c.id === id)!;

// ── 0 · Intro: the sailboat ─────────────────────────────────────────────────

function Intro({ lt, vis }: Ctx) {
  const a = ease(seg(lt, 1.2, 0.8));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", opacity: vis }}>
      <img src="/images/logo-blue.png" alt="Velero Capital" style={{ display: "inline-block", height: 132, width: "auto", opacity: a, transform: `translateY(${(1 - a) * 16}px) scale(${lerp(0.96, 1, a)})` }} />
    </div>
  );
}

// ── 1 · Who we are ──────────────────────────────────────────────────────────

const PILLARS = [
  { title: "Direct Access", text: "Opportunities sourced through founder, sponsor and shareholder relationships across late-stage, secondary and real estate markets, not through listing platforms." },
  { title: "Institutional Discipline", text: "Every opportunity is reviewed before it is shared: the company or asset, the terms and the counterparties. Structure, costs and reporting are set out in writing for each transaction." },
  { title: "A Qualified Investor Network", text: "Family offices and institutional investors in Dubai, San Francisco and beyond, each with a defined mandate, so that what we share is relevant and handled with discretion." },
];

function Who(c: Ctx) {
  if (c.brief) {
    return (
      <>
        <Words {...c} lines={["Access", "is the edge."]} size={52} sub={menus.Capital.text} />
        <div style={{ position: "absolute", left: 560, top: 92, width: 360, opacity: c.vis }}>
          {PILLARS.map((p, i) => {
            const q = ease(seg(c.lt, 1.2 + i * 0.45, 0.6));
            return <div key={p.title} className="display" style={{ fontSize: 30, lineHeight: 1.1, marginBottom: 10, color: i === 2 ? BLUE : INK, opacity: q, transform: `translateX(${(1 - q) * 30}px)` }}>{p.title}</div>;
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <Words {...c} lines={["Access", "is the edge."]} sub="We connect family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions and real estate, and advise founders and companies on fundraising, M&A and corporate finance." />
      <Points lt={c.lt} vis={c.vis} items={PILLARS} at={1.3} step={0.7} top={62} />
    </>
  );
}

/** Short cut: the three strategies at one stop, each named over its drawing as the pen reaches it. */
function Strategies(c: Ctx) {
  const { lt, part, anchor } = c;
  const xs = starts(STRATEGY_STROKES, part.x0);
  const draw = c.scenes[c.idx].draw;
  const stops = [
    { x: xs[0] + 80, h: 300, label: investments[0].label, text: "Primary allocations in growth rounds, Series C onward.", at: 0.3 },
    { x: xs[2] + 115, h: 230, label: investments[1].label, text: "Existing stakes from founders, employees and fund investors.", at: 0.58 },
    { x: xs[4] + 95, h: 320, label: investments[2].label, text: "Direct deals, joint ventures and fund positions.", at: 0.9 },
  ];
  return (
    <>
      <Words {...c} lines={["Late-stage.", "Secondaries.", "Real estate."]} size={44} />
      {stops.map((s, i) => {
        const a = anchor(s.x, s.h);
        return <Tag key={s.label} x={a.x} y={a.y} lt={lt} at={0.6 + s.at * draw} title={s.label} text={s.text} width={200} tick={12} blue={i === 2} />;
      })}
    </>
  );
}

// ── 2–5 · The strategies ────────────────────────────────────────────────────

const inv = (slug: string) => investments.find((i) => i.slug === slug)!;

function Late(c: Ctx) {
  const i = inv("late-stage");
  return (
    <>
      <Words {...c} lines={["Primary allocations", "in growth rounds."]} size={40} sub={i.intro} />
      <Points lt={c.lt} vis={c.vis} items={i.points} at={1.2} step={0.55} top={56} />
      <div style={{ position: "absolute", left: 56, top: 262, opacity: c.vis }}>
        <Appear lt={c.lt} at={2.6}><div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, marginBottom: 8 }}>Stage</div></Appear>
        <Pills lt={c.lt} at={2.8} items={["Series C", "Series D+", "Pre-IPO"]} blue />
      </div>
    </>
  );
}

function Secondaries(c: Ctx) {
  const i = inv("secondaries");
  return (
    <>
      <Words {...c} lines={["Existing stakes,", "not new shares."]} size={40} sub={i.summary} />
      <Points lt={c.lt} vis={c.vis} items={i.points} at={1.2} step={0.55} top={56} />
    </>
  );
}

function RealEstate(c: Ctx) {
  const i = inv("real-estate");
  return (
    <>
      <Words {...c} lines={["Institutional-quality", "real estate."]} size={40} sub={i.summary} />
      <Points lt={c.lt} vis={c.vis} items={i.points} at={1.2} step={0.55} top={56} />
      {i.extra && (
        <div style={{ position: "absolute", left: 56, top: 232, opacity: c.vis }}>
          <Appear lt={c.lt} at={2.6}><div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, marginBottom: 8 }}>{i.extra.title}</div></Appear>
          <Pills lt={c.lt} at={2.8} items={i.extra.items} />
        </div>
      )}
    </>
  );
}

function CoInvest(c: Ctx) {
  const i = inv("co-investments");
  return (
    <>
      <Words {...c} lines={["Deal by deal,", "alongside a lead."]} size={40} sub={i.summary} />
      <Points lt={c.lt} vis={c.vis} items={i.points} at={1.2} step={0.55} top={56} />
    </>
  );
}

// ── 6 · Track record ────────────────────────────────────────────────────────

function Record(c: Ctx) {
  const { lt, vis } = c;
  return (
    <>
      <Words {...c} lines={["Raised, placed", "and advised."]} sub={`Aggregate transaction value across all mandates since 2023, as of ${STATS_ASOF}.`} />
      <div style={{ position: "absolute", left: 540, top: 62, width: 380, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, rowGap: 18, opacity: vis }}>
        {stats.map((s, k) => {
          const p = ease(seg(lt, 1.1 + k * 0.35, 1.6));
          const n = Math.round(s.value * p);
          return (
            <div key={s.title} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 10, opacity: seg(lt, 1.0 + k * 0.35, 0.4) }}>
              <div className="display" style={{ fontSize: 42, color: BLUE, fontVariantNumeric: "tabular-nums" }}>{s.prefix}{n.toLocaleString("en-US")}{s.suffix}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{s.title}</div>
              <div style={{ fontSize: 10.5, lineHeight: 1.4, color: DIM, marginTop: 2 }}>{s.note}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── 7 · How a transaction runs: the stairs ──────────────────────────────────

function Process(c: Ctx) {
  const { lt, vis, part, anchor } = c;
  const step = (c.scenes[c.idx].draw - 1.4) / 4;
  return (
    <>
      <Words {...c} lines={["How a", "transaction runs."]} sub="From sourcing to reporting, every transaction follows the same four stages." />
      <Points lt={lt} vis={vis} items={process} at={1.2} step={step} top={48} titleSize={16} width={340} left={580} hot={Math.min(3, Math.floor((lt - 0.9) / step))} />
      {STAIR_TREADS.map((tx, k) => {
        const a = anchor(part.x0 + tx, 40 * (k + 1));
        return <Tag key={tx} x={a.x} y={a.y} lt={lt} at={0.9 + k * step} title={String(k + 1).padStart(2, "0")} blue width={40} tick={10} />;
      })}
    </>
  );
}

// ── 8 · Advisory services ───────────────────────────────────────────────────

function Services(c: Ctx) {
  const { lt, vis } = c;
  const groups = menus.Services.groups;
  let n = 0;
  return (
    <>
      <Words {...c} lines={["Corporate finance", "and cross-border", "advisory."]} size={36} sub={menus.Services.text} />
      <div style={{ position: "absolute", left: 540, top: 56, width: 380, columnCount: 2, columnGap: 24, opacity: vis }}>
        {groups.map((g) => (
          <div key={g.title} style={{ breakInside: "avoid", marginBottom: 12 }}>
            <Appear lt={lt} at={1.0 + n * 0.22} dur={0.4}><div style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, marginBottom: 3 }}>{g.title}</div></Appear>
            {g.items.map((it) => {
              const at = 1.1 + n++ * 0.22;
              return (
                <Appear key={it.label} lt={lt} at={at} dx={20} dy={0} dur={0.5}>
                  <div style={{ borderTop: `1px solid ${RULE}`, padding: "5px 0 6px" }}>
                    <div className="display" style={{ fontSize: 15 }}>{it.label}</div>
                  </div>
                </Appear>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

// ── 9 · Dubai and San Francisco ─────────────────────────────────────────────

function Where(c: Ctx) {
  const { lt, part, anchor } = c;
  const xs = starts(defOf("where").strokes, part.x0);
  const sf = anchor(xs[0] + 150, 205); // over the bridge
  const dxb = anchor(xs[4] + 165, 325); // over the Burj
  const [uae, usa] = offices;
  return (
    <>
      <Words {...c} lines={["Dubai and", "San Francisco."]} sub={menus.Company.text} />
      <Tag x={sf.x} y={sf.y} lt={lt} at={2.2} title={usa.region} text={usa.address} width={170} />
      <Tag x={dxb.x} y={dxb.y} lt={lt} at={4.4} title="Dubai · Headquarters" text={uae.address} width={210} blue />
    </>
  );
}

// ── 10 · Investor access: beads on the line ─────────────────────────────────

const STEPS = ["Initial enquiry", "Investor profile and eligibility", "Mandate alignment", "Confidentiality and verification", "Review of opportunities", "Transaction engagement"];
const INVESTORS = [
  { title: "Family offices", text: "Single and multi-family offices allocating directly to private companies and real estate, deal by deal." },
  { title: "Institutions", text: "Pension, insurance, endowment and sovereign capital, and the managers that invest for them." },
  { title: "Professional investors", text: "Funds, venture and private equity firms, and individual professional investors who meet their jurisdiction’s eligibility rules." },
];

function Access(c: Ctx) {
  const { lt, vis, part, anchor } = c;
  const draw = c.scenes[c.idx].draw;
  return (
    <>
      <Words {...c} lines={["A staged process,", "from enquiry", "to transaction."]} size={36} sub="For family offices and institutions. Nothing specific is shared until a mandate fits and confidentiality is agreed." />
      {!c.brief && <Points lt={lt} vis={vis} items={INVESTORS} at={1.4} step={0.6} top={48} titleSize={16} />}
      {STEPS.map((s, k) => {
        const a = anchor(part.x0 + beadX(k), 0);
        // The pen reaches bead k at about this share of the drawing time.
        const at = 0.4 + ((k + 0.5) / STEPS.length) * draw;
        return <Tag key={s} x={a.x} y={a.y - BEAD_R * K} lt={lt} at={at} title={`${k + 1}`} text={s} width={88} tick={k % 2 ? 36 : 14} blue={k % 2 === 0} />;
      })}
    </>
  );
}

// ── 11 · Outro: the harbour ─────────────────────────────────────────────────

function Outro({ lt, vis }: Ctx) {
  const a = ease(seg(lt, 0.9, 0.7));
  const b = ease(seg(lt, 1.5, 0.7));
  const d = ease(seg(lt, 2.6, 0.8));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 78, textAlign: "center", opacity: vis }}>
      <div className="display" style={{ fontSize: 46, opacity: a, transform: `translateY(${(1 - a) * 16}px)` }}>Private-market opportunities.</div>
      <div className="display" style={{ fontSize: 46, color: BLUE, opacity: b, transform: `translateY(${(1 - b) * 16}px)` }}>Institutional discipline.</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 22, opacity: d, transform: `scale(${lerp(0.94, 1, d)})` }}>
        <img src="/images/logo-box.png" alt="" style={{ height: 30, width: "auto" }} />
        <span style={{ textAlign: "left" }}>
          <span style={{ display: "block", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>velero.capital</span>
          <span style={{ display: "block", fontSize: 12, color: DIM }}>{CONTACT_EMAIL} · Dubai · San Francisco</span>
        </span>
      </div>
    </div>
  );
}
