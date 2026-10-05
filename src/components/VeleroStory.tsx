import { useEffect, useRef } from "react";

/**
 * The Velero Capital story as one unbroken line. The pen goes down once and never lifts:
 * four rows, read like a page, joined by a turn at each end. One loop lasts a minute.
 *
 * Each scene is written in local units (x to the right, y upward from the row's baseline),
 * starts and ends on the baseline, and is stitched onto the path by `row()`.
 */
/** `keep` scenes are never mirrored, even on a right-to-left row. Charts must always rise from left to right. */
export type Scene = { w: number; d: string; keep?: boolean };

export const gap = (w: number): Scene => ({ w, d: `L ${w} 0` });

const person = (w: number): Scene => {
  const s = w / 50;
  const n = (v: number) => +(v * s).toFixed(1);
  return {
    w,
    d: `L 0 ${n(50)} C 0 ${n(75)} ${n(12)} ${n(82)} ${n(25)} ${n(82)} C ${n(7)} ${n(82)} ${n(7)} ${n(118)} ${n(25)} ${n(118)} C ${n(43)} ${n(118)} ${n(43)} ${n(82)} ${n(25)} ${n(82)} C ${n(38)} ${n(82)} ${n(50)} ${n(75)} ${n(50)} ${n(50)} L ${n(50)} 0`,
  };
};

export const S = {
  // Velero means sailboat
  wave: { w: 60, d: "C 10 14 20 14 30 0 C 40 -14 50 -14 60 0" },
  boat: { w: 220, d: "L 165 0 L 190 40 L 110 40 L 110 200 L 185 60 L 110 60 L 45 60 L 110 170 L 110 40 L 30 40 L 55 0 L 220 0" },
  // headquartered in Dubai
  dubai: { w: 300, d: "L 20 0 L 20 90 L 60 90 L 60 0 L 75 0 L 75 140 L 95 160 L 115 140 L 115 0 L 135 0 L 135 110 L 147 110 L 147 190 L 157 190 L 157 250 L 165 250 L 165 320 L 173 250 L 181 250 L 181 190 L 191 190 L 191 110 L 203 110 L 203 0 L 220 0 C 220 120 250 170 285 180 L 285 0 L 300 0" },
  palm: { w: 80, d: "L 40 0 C 36 40 44 80 40 110 C 20 125 8 112 2 96 C 14 110 26 116 40 110 C 30 135 22 140 14 138 C 26 132 34 122 40 110 C 50 135 58 140 66 138 C 54 132 46 122 40 110 C 60 125 72 112 78 96 C 66 110 54 116 40 110 C 44 80 36 40 40 0 L 80 0" },
  // San Francisco: the Golden Gate Bridge and the Transamerica Pyramid
  bridge: { w: 300, d: "L 0 50 L 74 200 L 74 0 L 86 0 L 86 200 L 74 200 L 86 200 C 110 110 130 62 150 58 C 170 62 190 110 214 200 L 226 200 L 226 0 L 214 0 L 214 200 L 226 200 L 300 50 L 0 50 L 300 50 L 300 0" },
  pyramid: { w: 70, d: "L 5 0 L 35 250 L 35 285 L 35 250 L 65 0 L 70 0" },
  // New York: the Statue of Liberty, a tapered downtown tower and the Empire State Building
  liberty: { w: 90, d: "L 15 0 L 22 70 L 30 70 L 36 168 L 28 215 C 16 235 24 252 28 260 C 32 252 40 235 28 215 L 42 172 C 34 174 34 198 44 199 L 40 212 L 45 201 L 48 216 L 51 201 L 57 211 L 54 198 C 62 194 60 174 50 172 L 62 150 L 60 70 L 68 70 L 75 0 L 90 0" },
  downtown: { w: 80, d: "L 5 0 L 5 200 L 20 200 L 20 235 L 40 290 L 60 235 L 60 200 L 75 200 L 75 0 L 80 0" },
  empire: { w: 100, d: "L 5 0 L 5 120 L 20 120 L 20 190 L 32 190 L 32 240 L 42 240 L 42 268 L 50 268 L 50 318 L 50 268 L 58 268 L 58 240 L 68 240 L 68 190 L 80 190 L 80 120 L 95 120 L 95 0 L 100 0" },
  // the market: a trading screen with a rising line and arrow
  screen: { w: 220, d: "L 110 0 L 110 40 L 10 40 L 10 200 L 210 200 L 210 40 L 110 40 L 30 40 L 30 70 L 70 110 L 95 90 L 135 150 L 160 130 L 190 180 L 168 176 L 190 180 L 184 158 L 190 180 L 210 200 L 210 40 L 110 40 L 110 0 L 220 0", keep: true },
  // offices across the globe
  globe: { w: 200, d: "L 100 0 L 100 30 C 61 30 30 61 30 100 C 30 139 61 170 100 170 C 139 170 170 139 170 100 C 170 61 139 30 100 30 C 62 62 62 138 100 170 C 138 138 138 62 100 30 L 100 0 L 200 0" },
  // family offices and institutional investors
  institution: { w: 270, d: "L 0 20 L 20 20 L 20 136 L 52 136 L 52 20 L 80 20 L 80 136 L 112 136 L 112 20 L 140 20 L 140 136 L 172 136 L 172 20 L 200 20 L 200 136 L 232 136 L 232 20 L 250 20 L 250 156 L 2 156 L 126 228 L 250 156 L 250 20 L 270 20 L 270 0" },
  // late-stage and pre-IPO: stages, rocket, opening bell (stages are authored descending because this row runs right to left)
  stages: { w: 150, d: "L 0 96 L 48 96 L 48 64 L 96 64 L 96 32 L 144 32 L 144 0 L 150 0" },
  rocket: { w: 160, d: "L 18 58 L 46 72 L 46 150 L 62 150 C 62 174 94 174 94 150 C 94 126 62 126 62 150 L 46 150 L 46 196 C 46 238 68 274 78 292 C 88 274 110 238 110 196 L 110 72 L 46 72 L 110 72 L 138 58 L 156 0 L 160 0" },
  bell: { w: 130, d: "L 0 170 L 64 170 L 64 148 C 36 146 34 104 20 78 L 64 78 L 64 66 C 55 66 55 50 64 50 C 73 50 73 66 64 66 L 64 78 L 108 78 C 94 104 92 146 64 148 L 64 170 L 128 170 L 128 0 L 130 0" },
  // secondaries: a stake changing hands
  certificate: { w: 230, d: "L 0 216 L 140 216 L 182 174 L 140 174 L 140 216 L 182 174 L 182 88 C 220 88 220 40 182 40 C 152 40 152 88 182 88 L 182 0 L 230 0" },
  // services: M&A (two circles merging) and cap table (pie)
  merge: { w: 200, d: "L 70 0 L 70 15 C 40 15 15 40 15 70 C 15 100 40 125 70 125 C 100 125 125 100 125 70 C 125 40 100 15 70 15 L 130 15 C 100 15 75 40 75 70 C 75 100 100 125 130 125 C 160 125 185 100 185 70 C 185 40 160 15 130 15 L 130 0 L 200 0" },
  pie: { w: 160, d: "L 80 0 L 80 15 C 47 15 20 42 20 75 C 20 108 47 135 80 135 C 113 135 140 108 140 75 C 140 42 113 15 80 15 L 80 75 L 132 105 L 80 75 L 80 135 L 80 75 L 80 15 L 80 0 L 160 0" },
  // real estate
  house: { w: 100, d: "L 10 0 L 10 70 L 50 108 L 90 70 L 90 0 L 66 0 L 66 36 L 42 36 L 42 0 L 100 0" },
  midrise: { w: 110, d: "L 0 160 L 28 160 L 28 192 L 80 192 L 80 160 L 108 160 L 108 0 L 110 0" },
  tower: { w: 80, d: "L 0 234 L 39 266 L 39 306 L 39 266 L 78 234 L 78 0 L 80 0" },
  warehouse: { w: 150, d: "L 0 84 L 30 116 L 30 84 L 60 116 L 60 84 L 90 116 L 90 84 L 120 84 L 120 0 L 84 0 L 84 44 L 38 44 L 38 0 L 150 0" },
  apartments: { w: 120, d: "L 0 208 L 96 208 L 96 170 L 112 170 L 112 154 L 96 154 L 96 116 L 112 116 L 112 100 L 96 100 L 96 62 L 112 62 L 112 46 L 96 46 L 96 0 L 120 0" },
  tree: { w: 70, d: "L 35 0 L 35 38 C 3 38 3 90 35 90 C 67 90 67 38 35 38 L 35 0 L 70 0" },
  // $350M+ raised, placed and advised: growth
  growth: { w: 260, d: "L 0 48 L 40 48 L 40 0 L 55 0 L 55 76 L 95 76 L 95 0 L 110 0 L 110 114 L 150 114 L 150 0 L 165 0 L 165 160 L 205 160 L 205 0 L 220 0 L 220 212 L 260 212 L 260 0" },
  // the safe harbour
  lighthouse: { w: 140, d: "L 30 0 L 50 190 L 40 190 L 40 202 L 55 202 L 55 236 L 70 258 L 85 236 L 85 219 L 138 236 L 85 219 L 138 202 L 85 219 L 85 202 L 100 202 L 100 190 L 90 190 L 110 0 L 140 0" },
} satisfies Record<string, Scene> as Record<string, Scene>;

/** Candlestick chart: each candle is drawn in turn and joined to the next, so the trend reads as one climbing line. */
const candles: Scene = (() => {
  const cs = [
    [30, 20, 40, 90, 105],
    [75, 50, 70, 130, 150],
    [120, 60, 95, 125, 160],
    [165, 100, 120, 190, 205],
    [210, 150, 170, 240, 262],
  ]; // centre x, wick low, body low, body high, wick high
  const d = [`L 30 0`];
  for (const [cx, w0, b0, b1, w1] of cs) {
    d.push(`L ${cx} ${w0} L ${cx} ${b0} L ${cx - 10} ${b0} L ${cx - 10} ${b1} L ${cx} ${b1} L ${cx} ${w1} L ${cx} ${b1} L ${cx + 10} ${b1} L ${cx + 10} ${b0} L ${cx} ${b0}`);
  }
  d.push("L 250 170 L 250 0 L 260 0");
  return { w: 260, d: d.join(" "), keep: true };
})();

/** Three stacks of coins, each taller than the last. */
const coins: Scene = (() => {
  const d: string[] = [];
  [3, 5, 8].forEach((n, i) => {
    const x = 5 + i * 55;
    d.push(`L ${x} 0`);
    for (let k = 1; k < n; k++) d.push(`L ${x} ${k * 14} L ${x + 40} ${k * 14} L ${x} ${k * 14}`);
    d.push(`L ${x} ${n * 14} L ${x + 40} ${n * 14} L ${x + 40} 0`);
  });
  d.push("L 160 0");
  return { w: 160, d: d.join(" ") };
})();

/** Stitch scenes along a baseline. dir = 1 runs left to right, -1 right to left. Returns the path and where the pen ends up. */
export function row(scenes: Scene[], startX: number, base: number, dir: 1 | -1) {
  let x = startX;
  const out: string[] = [];
  for (const sc of scenes) {
    // A kept scene on a right-to-left row: run along the baseline to its left end, draw it left to right,
    // then return along the baseline. The pen still never lifts; the extra travel hides under the baseline.
    const unmirror = dir === -1 && sc.keep === true;
    const ox = unmirror ? x - sc.w : x;
    const d = unmirror ? 1 : dir;
    if (unmirror) out.push(`L ${+ox.toFixed(1)} ${base}`);
    const tokens = sc.d.trim().split(/\s+/);
    let i = 0;
    while (i < tokens.length) {
      const cmd = tokens[i++];
      const pairs = cmd === "C" ? 3 : 1;
      const pts: string[] = [];
      for (let k = 0; k < pairs; k++) {
        const lx = Number(tokens[i++]);
        const ly = Number(tokens[i++]);
        pts.push(`${+(ox + d * lx).toFixed(1)} ${+(base - ly).toFixed(1)}`);
      }
      out.push(`${cmd} ${pts.join(" ")}`);
    }
    if (unmirror) { out.push(`L ${+ox.toFixed(1)} ${base}`); x = ox; } else { x = ox + dir * sc.w; }
  }
  return { d: out.join(" "), x };
}

const W = 1600;
const H = 1460;
const L = 40;
const R = W - 40;
const B1 = 340, B2 = 700, B3 = 1060, B4 = 1420;

function build() {
  // Row 1, left to right: the sailboat, San Francisco first, then the investors we serve and the globe
  const r1 = row(
    [S.wave, S.boat, S.wave, S.bridge, gap(20), S.pyramid, gap(40), person(56), person(56), person(56), gap(30), S.institution, gap(30), S.globe],
    L, B1, 1,
  );
  // Row 2, right to left: New York beside the market, then the bell, the rocket and the stages
  const r2 = row(
    [S.liberty, gap(15), S.downtown, gap(20), S.empire, gap(30), candles, gap(20), S.screen, gap(20), S.bell, gap(20), S.rocket, gap(30), S.stages],
    R, B2, -1,
  );
  // Row 3, left to right: secondaries, M&A, cap table, growth and capital
  const r3 = row(
    [person(86), gap(50), S.certificate, gap(30), person(86), gap(50), S.merge, gap(40), S.pie, gap(40), S.growth, gap(40), coins],
    L, B3, 1,
  );
  // Row 4, right to left: Dubai, real estate, then the lighthouse and a boat coming into harbour
  const r4 = row(
    [S.dubai, S.palm, gap(30), S.house, gap(20), S.warehouse, gap(20), S.apartments, gap(30), S.tree, gap(40), S.lighthouse, S.wave, S.boat, S.wave],
    R, B4, -1,
  );
  return [
    `M ${L} ${B1}`,
    r1.d,
    `L ${R} ${B1}`,
    `C ${W - 4} ${B1} ${W - 4} ${B2} ${R} ${B2}`,
    r2.d,
    `L ${L} ${B2}`,
    `C 4 ${B2} 4 ${B3} ${L} ${B3}`,
    r3.d,
    `L ${R} ${B3}`,
    `C ${W - 4} ${B3} ${W - 4} ${B4} ${R} ${B4}`,
    r4.d,
    `L ${L} ${B4}`,
  ].join(" ");
}

const PATH = build();

/** Phones: a shorter three-row telling so each scene stays legible at small widths. */
const CW = 800;
const CH = 1100;
function buildCompact() {
  const l = 30, r = CW - 30;
  const r1 = row([S.wave, S.boat, S.wave, S.bridge, gap(10), S.pyramid], l, B1, 1);
  const r2 = row([S.liberty, gap(10), S.empire, gap(20), candles, gap(20), S.rocket], r, B2, -1);
  const r3 = row([S.house, gap(20), S.dubai, S.palm, gap(20), S.lighthouse, S.wave], l, B3, 1);
  return [
    `M ${l} ${B1}`,
    r1.d,
    `L ${r} ${B1}`,
    `C ${CW - 2} ${B1} ${CW - 2} ${B2} ${r} ${B2}`,
    r2.d,
    `L ${l} ${B2}`,
    `C 2 ${B2} 2 ${B3} ${l} ${B3}`,
    r3.d,
    `L ${r} ${B3}`,
  ].join(" ");
}
const PATH_COMPACT = buildCompact();

const LABEL =
  "A single unbroken line drawing the Velero Capital story: a sailboat; the Golden Gate Bridge and Transamerica Pyramid in San Francisco; investors, an institution and a globe; funding stages, a rocket, an opening bell, a trading screen and a candlestick chart beside the Empire State Building and the Statue of Liberty in New York; a share certificate passing between two people, a merger, a cap table, a growth chart and stacks of coins; then a boat coming into harbour past a lighthouse, real estate, and the Dubai skyline with a palm.";

/** Fired on window once the drawing has finished inking itself in. */
export const STORY_COMPLETE = "velero:story-complete";
const FINISH_MS = 900;

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" } as const;

/**
 * The finished drawing is always visible as a faint ghost, so the hero is never empty;
 * the dark line then traces over it. Large screens get the full four rows on a one-minute loop,
 * small screens a compact three-row version on a shorter one.
 */
export default function VeleroStory({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  // The line continues down the page from the end of this drawing, so the drawing must be whole first.
  // When the stats row ($350M+) comes into view, stop the loop and ink the rest of the line in quickly from
  // wherever it had reached, then announce it so the scroll line can pick up from a finished picture.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let done = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (done) return;
      const mark = document.querySelector("[data-scroll-sections] [data-stats]");
      // Not yet: the stats row is still below the fold. (Without one, fall back to any real scroll.)
      if (mark ? mark.getBoundingClientRect().top > window.innerHeight * 0.85 : window.scrollY < 24) return;
      done = true;
      window.removeEventListener("scroll", finish);
      el.querySelectorAll<SVGPathElement>(".story-line").forEach((p) => {
        const at = getComputedStyle(p).strokeDashoffset; // where the pen is right now
        p.style.animation = "none";
        p.style.strokeDashoffset = at;
        void p.getBoundingClientRect(); // commit the starting value before transitioning
        p.style.transition = `stroke-dashoffset ${FINISH_MS}ms cubic-bezier(.2,.7,.2,1)`;
        p.style.strokeDashoffset = "0";
      });
      timer = setTimeout(() => {
        el.dataset.complete = "true";
        window.dispatchEvent(new Event(STORY_COMPLETE));
      }, FINISH_MS);
    };
    window.addEventListener("scroll", finish, { passive: true });
    finish();
    return () => { window.removeEventListener("scroll", finish); clearTimeout(timer); };
  }, []);

  return (
    <div ref={box} data-story className={className} role="img" aria-label={LABEL}>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden aspect-[160/146] w-full lg:block" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d={PATH} {...stroke} opacity={0.14} />
        <path className="story-line" d={PATH} pathLength={1} {...stroke} />
      </svg>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="aspect-[8/11] w-full lg:hidden" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d={PATH_COMPACT} {...stroke} opacity={0.14} />
        <path className="story-line story-line-short" d={PATH_COMPACT} pathLength={1} {...stroke} />
      </svg>
    </div>
  );
}
