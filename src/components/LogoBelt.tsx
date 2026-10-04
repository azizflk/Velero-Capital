import { useEffect, useRef } from "react";

/**
 * Conveyor-belt marquee: every item is rendered exactly once. As an item leaves one edge
 * it is moved to the other end of the track, so the row scrolls forever with no duplicates.
 */
type Item = { name: string; src: string };

export default function LogoBelt({ items, direction = "left", speed = 40 }: { items: Item[]; direction?: "left" | "right"; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0") || 0;
    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (!paused) {
        offset += speed * dt;
        if (direction === "left") {
          // move items that have fully scrolled past the left edge to the end
          let first = el.firstElementChild as HTMLElement | null;
          while (first && offset >= first.offsetWidth + gap) {
            offset -= first.offsetWidth + gap;
            el.appendChild(first);
            first = el.firstElementChild as HTMLElement | null;
          }
          el.style.transform = `translate3d(${-offset}px,0,0)`;
        } else {
          // content moves right: pull items from the end and prepend them as space opens on the left
          let lastEl = el.lastElementChild as HTMLElement | null;
          while (lastEl && offset >= lastEl.offsetWidth + gap) {
            offset -= lastEl.offsetWidth + gap;
            el.insertBefore(lastEl, el.firstElementChild);
            lastEl = el.lastElementChild as HTMLElement | null;
          }
          const w = el.scrollWidth;
          el.style.transform = `translate3d(${offset - (w - (el.parentElement?.clientWidth ?? w))}px,0,0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [direction, speed]);

  return (
    <div className="min-w-0 max-w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div ref={track} className="flex w-max items-center gap-16 whitespace-nowrap py-5 will-change-transform">
        {items.map((it) => (
          <img key={it.name} src={it.src} alt={it.name} title={it.name} className="logo-ink h-7 w-auto max-w-[170px] object-contain sm:h-8" draggable={false} />
        ))}
      </div>
    </div>
  );
}
