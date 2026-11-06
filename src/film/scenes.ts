/**
 * The walkthrough's timelines (seconds), in order. VeleroFilm plays these; the
 * public /walkthrough page uses them to start at, or loop, one chapter.
 *
 * Two editions share one engine: the full film for the site, and a short cut
 * for social feeds. `draw` is how long the line takes to ink that chapter's
 * drawing; the rest of the chapter it rests while the words are read.
 */
export type Scene = { id: string; start: number; dur: number; draw: number };
export type Edition = "full" | "short";

const PLANS: Record<Edition, [string, number, number][]> = {
  full: [
    ["intro", 7, 2.8],
    ["who", 9, 4.6],
    ["late", 9, 4.6],
    ["secondaries", 9, 4.6],
    ["realestate", 9.5, 5.2],
    ["coinvest", 8.5, 4.4],
    ["record", 9, 4.6],
    ["process", 9.5, 5.4],
    ["services", 10, 4.6],
    ["where", 9.5, 5.4],
    ["access", 10, 6],
    ["outro", 8.5, 4.2],
  ],
  short: [
    ["intro", 5, 2.4],
    ["who", 7.5, 3.8],
    ["strategies", 9, 5.2],
    ["record", 7.5, 3.8],
    ["access", 9, 5.4],
    ["outro", 7, 3.8],
  ],
};

function lay(plan: [string, number, number][]) {
  let at = 0;
  const scenes = plan.map(([id, dur, draw]) => { const s = { id, start: at, dur, draw }; at += dur; return s; });
  return { scenes, total: at };
}
export const EDITIONS: Record<Edition, { scenes: Scene[]; total: number }> = { full: lay(PLANS.full), short: lay(PLANS.short) };

export const SCENES = EDITIONS.full.scenes;
export const TOTAL = EDITIONS.full.total;

/** The chapter mark shown over each scene; the intro and outro carry none. */
export const CHAPTERS: Record<string, string> = {
  who: "Who we are",
  late: "Late-Stage & Pre-IPO",
  secondaries: "Secondaries",
  realestate: "Real Estate",
  coinvest: "Co-Investments & Syndicates",
  strategies: "Investment strategies",
  record: "Track record",
  process: "How a transaction runs",
  services: "Advisory services",
  where: "Dubai and San Francisco",
  access: "Investor access",
};

const key = (s: string | null | undefined) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const ALIASES: Record<string, string> = {
  ...Object.fromEntries(Object.keys(CHAPTERS).concat(["intro", "outro"]).map((id) => [id, id])),
  ...Object.fromEntries(Object.entries(CHAPTERS).map(([id, name]) => [key(name), id])),
  home: "who", about: "who", capital: "late", latestage: "late", preipo: "late", secondary: "secondaries", property: "realestate",
  syndicates: "coinvest", coinvestments: "coinvest", stats: "record", portfolio: "record", howitworks: "process", advisory: "services",
  company: "where", offices: "where", dubai: "where", sanfrancisco: "where", investoraccess: "access", end: "outro",
};

/** A chapter name or alias (any case, spaces and dashes ignored) → its scene in that edition, or null. */
export function sceneFor(name: string | null, edition: Edition = "full"): Scene | null {
  const id = ALIASES[key(name)];
  return id ? EDITIONS[edition].scenes.find((s) => s.id === id) ?? null : null;
}
