import { useEffect, useRef, useState } from "react";
import { S, STORY_COMPLETE, gap, row, type Scene } from "./VeleroStory";

/** Shrink a hero scene so it fits under the closing section. */
const scale = (sc: Scene, k: number): Scene => ({
  ...sc,
  w: sc.w * k,
  d: sc.d.split(/\s+/).map((t) => (/^-?[\d.]+$/.test(t) ? String(+(Number(t) * k).toFixed(1)) : t)).join(" "),
});

/** The happy ending: after the last section the line sails home — a boat on the water reaching a lighthouse (kept facing the boat). */
const ending = (k: number) => [gap(24), S.wave, S.wave, S.boat, S.wave, S.wave, S.wave, gap(10), { ...S.lighthouse, keep: true }, gap(16)].map((sc) => scale(sc, k));
// How much further the page scrolls past the last divider while the ending draws itself.
const ENDING_SCROLL = 220;

type Pt = { x: number; y: number };

/**
 * Continues the hero's one-line drawing down the page. The line starts at the exact point where
 * the drawing ends and grows with the scroll position: down one edge of the page for a section,
 * across along the divider, down the other edge for the next section, and so on.
 *
 * Place inside a `relative` container that also holds an element marked `data-scroll-sections`
 * whose direct <section> children are the sections to weave between.
 */
export default function ScrollLine() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const probe = useRef<SVGPathElement>(null);
  const geo = useRef<{ pts: Pt[]; cum: number[]; total: number; rootTop: number; tail: number }>({ pts: [], cum: [], total: 0, rootTop: 0, tail: 0 });
  const [box, setBox] = useState({ w: 0, h: 0, d: "" });

  useEffect(() => {
    const el = svg.current;
    const root = el?.parentElement;
    if (!el || !root) return;

    // The line waits for the hero drawing to finish, then catches up to wherever the page has been scrolled.
    const story = root.querySelector<HTMLElement>("[data-story]");
    let ready = !story || story.dataset.complete === "true";
    const onComplete = () => { ready = true; draw(); };

    const draw = () => {
      const p = path.current;
      const g = geo.current;
      if (!p || !g.total) return;
      if (!ready) { p.style.strokeDasharray = `${g.total}`; p.style.strokeDashoffset = `${g.total}`; return; }
      // The tip of the line sits a little below the middle of the viewport.
      const tipY = window.scrollY + window.innerHeight * 0.62 - g.rootTop;
      let len = 0;
      for (let i = 1; i < g.pts.length; i++) {
        const a = g.pts[i - 1], b = g.pts[i];
        const seg = g.cum[i] - g.cum[i - 1];
        if (a.y === b.y) { // divider: drawn in full once the tip reaches it
          if (tipY >= a.y) len += seg; else break;
        } else if (tipY >= b.y) {
          len += seg;
        } else {
          if (tipY > a.y) len += tipY - a.y;
          break;
        }
      }
      // The ending is drawn once the line has reached the water, over the next stretch of scrolling.
      const last = g.pts[g.pts.length - 1];
      if (g.tail && tipY >= last.y) len += Math.min(1, (tipY - last.y) / ENDING_SCROLL) * g.tail;
      p.style.strokeDasharray = `${g.total}`;
      p.style.strokeDashoffset = `${Math.max(0, g.total - len)}`;
    };

    const measure = () => {
      const wrap = root.querySelector<HTMLElement>("[data-scroll-sections]");
      if (!wrap) return;
      const rr = root.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(wrap).paddingLeft) || 24;
      const leftX = Math.round(wr.left - rr.left + pad / 2);
      const rightX = Math.round(wr.right - rr.left - pad / 2);
      const secs = Array.from(wrap.children).filter((c) => c.tagName === "SECTION") as HTMLElement[];
      if (!secs.length) return;
      const tops = secs.map((s) => Math.round(s.getBoundingClientRect().top - rr.top));
      const bottom = Math.round(secs[secs.length - 1].getBoundingClientRect().bottom - rr.top);

      // Where the hero drawing ends, in this container's coordinates.
      let start: Pt = { x: leftX, y: tops[0] };
      const story = Array.from(root.querySelectorAll<SVGPathElement>(".story-line")).find((s) => s.getBoundingClientRect().width > 0);
      const ctm = story?.getScreenCTM();
      if (story && ctm) {
        const end = story.getPointAtLength(story.getTotalLength()).matrixTransform(ctm);
        start = { x: Math.round(end.x - rr.left), y: Math.round(end.y - rr.top) };
      }

      const pts: Pt[] = [start, { x: start.x, y: tops[0] }, { x: leftX, y: tops[0] }];
      let x = leftX;
      for (let i = 1; i < tops.length; i++) {
        pts.push({ x, y: tops[i] }); // down this edge to the next divider
        x = x === leftX ? rightX : leftX;
        pts.push({ x, y: tops[i] }); // across the divider to the other edge
      }
      // Down the last edge to the water line, then the ending sails back in from that edge.
      const k = wr.width < 640 ? 0.3 : 0.42;
      const water = bottom - 24;
      pts.push({ x, y: water });
      const tail = row(ending(k), x, water, x === rightX ? -1 : 1).d;

      const cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y));
      let tailLen = 0;
      if (probe.current) { probe.current.setAttribute("d", `M ${x} ${water} ${tail}`); tailLen = probe.current.getTotalLength(); }
      geo.current = { pts, cum, total: cum[cum.length - 1] + tailLen, rootTop: rr.top + window.scrollY, tail: tailLen };
      const d = pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ") + " " + tail;
      setBox((b) => (b.d === d && b.w === Math.round(rr.width) && b.h === Math.round(rr.height) ? b : { w: Math.round(rr.width), h: Math.round(rr.height), d }));
      draw();
    };

    // Drawn directly on scroll: the update is two style writes, and waiting for a frame makes the line lag the page.
    const onScroll = () => draw();
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    measure();
    // The hero fades in with a small upward slide; measure again once it has settled so the line starts exactly on the drawing's end.
    const settle = [setTimeout(measure, 900), setTimeout(measure, 2000)];
    window.addEventListener("load", measure);
    window.addEventListener(STORY_COMPLETE, onComplete);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener(STORY_COMPLETE, onComplete); settle.forEach(clearTimeout); window.removeEventListener("load", measure); ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); };
  }, []);

  // Re-apply the scroll position once the path has rendered with its new geometry.
  useEffect(() => { window.dispatchEvent(new Event("scroll")); }, [box.d]);

  return (
    <svg ref={svg} width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} className="pointer-events-none absolute left-0 top-0 z-10 overflow-visible text-ink" aria-hidden="true">
      <path ref={path} className="scroll-line" d={box.d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} />
      <path ref={probe} fill="none" stroke="none" />
    </svg>
  );
}
