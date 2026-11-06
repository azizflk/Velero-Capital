import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VeleroFilm from "@/film/VeleroFilm";
import ScamClip, { CLIP_TOTAL } from "@/film/ScamClip";
import { EDITIONS, CHAPTERS, sceneFor, type Edition } from "@/film/scenes";

/**
 * The walkthrough on its own public page: no header, no footer, no cookie
 * banner — the film is a picture of the site, for sharing and embedding.
 *
 *   /walkthrough                          the whole film, looping
 *   /walkthrough?chapter=services         start at a chapter, then carry on
 *   /walkthrough?chapter=services&only=1  loop just that chapter
 *   &embed=1                              film only, for an iframe
 *   ?at=12.5                              a still, frozen at that second
 *   ?render=1                             frame rendering: exposes window.__film.seek(t)
 *   ?film=short                           the 45-second cut for social feeds
 *   ?film=scams                           the five-second "not every opportunity" clip instead
 */

const BG = "#023ccf";
// J. S. Bach, Cello Suite No. 1 in G major, BWV 1007: I. Prélude — a CC0 (public domain) recording from Wikimedia Commons, cut to the film’s length.
const MUSIC: Record<Edition, string> = { full: "/media/walkthrough-music.m4a", short: "/media/walkthrough-music-short.m4a" };
const on = (v: string | null) => v === "1" || v === "true" || v === "yes";

declare global {
  interface Window { __film?: { seek: (t: number) => void; total: number } }
}

function useDocument(bare: boolean) {
  useEffect(() => {
    const prev = document.title;
    document.title = "Velero Capital — Walkthrough";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    const root = document.documentElement;
    const was = [root.style.background, document.body.style.background, root.style.overflow];
    root.style.background = bare ? "transparent" : BG;
    document.body.style.background = bare ? "transparent" : BG;
    root.style.overflow = "hidden";
    return () => {
      document.title = prev;
      robots.remove();
      [root.style.background, document.body.style.background, root.style.overflow] = was;
    };
  }, [bare]);
}

export default function Walkthrough() {
  const [params, setParams] = useSearchParams();
  const embed = on(params.get("embed"));
  const only = on(params.get("only"));
  const render = on(params.get("render"));
  const atParam = params.get("at");
  const clip = params.get("film") === "scams";
  const edition: Edition = params.get("film") === "short" ? "short" : "full";
  const { scenes: SCENES, total: TOTAL } = EDITIONS[edition];
  const scene = sceneFor(params.get("chapter"), edition);
  useDocument(embed || render);

  // Frame rendering: the clock is driven from outside, one frame at a time.
  const [seek, setSeek] = useState<number | null>(() => (atParam != null && atParam !== "" ? Number(atParam) : render ? 0 : null));
  useEffect(() => {
    if (!render) return undefined;
    window.__film = { seek: (t) => setSeek(t), total: clip ? CLIP_TOTAL : TOTAL };
    return () => { delete window.__film; };
  }, [render, clip, TOTAL]);

  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const film = useMemo(() => {
    if (seek != null) return { at: seek };
    if (!scene) return {};
    if (reduced) return { at: scene.start + Math.max(0, scene.dur - 1.2) };
    return { startAt: scene.start, ...(only ? { loop: [scene.start, scene.start + scene.dur] as [number, number] } : {}) };
  }, [scene, only, reduced, seek]);

  const pick = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set("chapter", id); else next.delete("chapter");
    setParams(next, { replace: true });
  };

  if (render) {
    // Exactly the stage, edge to edge: the renderer sets the viewport to 960×540.
    return <div style={{ position: "fixed", inset: 0, background: "#f3f4ef" }}>{clip ? <ScamClip key="clip" at={seek ?? 0} /> : <VeleroFilm key={`render-${edition}`} edition={edition} {...film} />}</div>;
  }
  if (clip) {
    const cw = "min(calc(100vw - 32px), calc((100vh - 32px) * 16 / 9))";
    return (
      <div className="flex items-center justify-center" style={{ position: "fixed", inset: 0, background: embed ? "transparent" : BG, padding: embed ? 0 : 16 }}>
        <div style={{ width: embed ? "100%" : cw, borderRadius: embed ? 0 : 12, overflow: "hidden" }}><ScamClip key={`clip-${seek ?? ""}`} at={seek ?? undefined} /></div>
      </div>
    );
  }

  const bare = embed;
  const width = bare ? "100%" : "min(calc(100vw - 32px), calc((100vh - 88px) * 16 / 9))";
  return (
    <div className="flex flex-col items-center justify-center" style={{ position: "fixed", inset: 0, background: bare ? "transparent" : BG, gap: bare ? 0 : 16, padding: bare ? 0 : 16 }}>
      <div style={{ width, borderRadius: bare ? 0 : 12, overflow: "hidden", boxShadow: bare ? "none" : "0 40px 100px rgb(0 0 0 / 0.35)" }}>
        <VeleroFilm key={`${edition}-${scene?.id ?? "all"}-${only}-${seek ?? ""}`} edition={edition} music={seek == null ? MUSIC[edition] : undefined} {...film} />
      </div>
      {!bare && (
        <nav aria-label="Chapters" className="flex flex-wrap items-center justify-center gap-1.5" style={{ maxWidth: width }}>
          <Chip active={!scene} onClick={() => pick(null)}>Full film</Chip>
          {SCENES.filter((s) => CHAPTERS[s.id]).map((s) => (
            <Chip key={s.id} active={scene?.id === s.id} onClick={() => pick(s.id)}>{CHAPTERS[s.id]}</Chip>
          ))}
          <a href="https://velero.capital" className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[12.5px] font-semibold text-blue">velero.capital</a>
        </nav>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="h-8 rounded-full px-3 text-[12.5px] font-medium transition-colors"
      style={{ color: active ? "#fff" : "rgb(255 255 255 / 0.75)", background: active ? "rgb(255 255 255 / 0.18)" : "transparent", border: "1px solid rgb(255 255 255 / 0.25)", cursor: "pointer" }}
    >
      {children}
    </button>
  );
}
