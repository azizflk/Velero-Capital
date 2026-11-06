// Renders the walkthrough (/walkthrough) to a 1080p MP4, frame by frame.
//
// The film is a pure function of time, so each frame is drawn by seeking the
// page to that second and taking a screenshot; the frames stream straight
// into ffmpeg, which encodes H.264 and lays the music underneath.
//
//   npm run build && node scripts/render-walkthrough.mjs
//
// Options (environment):
//   FILM_URL    a server that already serves the built site (default: starts `vite preview` on :4173)
//   FPS         frames per second (default 30)
//   MUSIC       audio file laid on the film's timeline (default public/media/walkthrough-music.m4a; "" for silent)
//   OUT         output file (default film-out/velero-walkthrough-1080p.mp4)
//   POSTER      second to save as a poster PNG next to the video (default 9.5)
//   FILM        "short" renders the 45-second cut (film-out/velero-walkthrough-short-1080p.mp4);
//               "scams" the five-second clip (silent, film-out/velero-scams-clip-1080p.mp4)
//
// Needs: Google Chrome (or Chromium) on this Mac, ffmpeg on PATH, and the
// playwright-core dev dependency.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const FPS = Number(process.env.FPS || 30);
const W = 960, H = 540, SCALE = 2;
const FILM = process.env.FILM || "";
const DEFAULTS = {
  "": { out: "film-out/velero-walkthrough-1080p.mp4", music: "public/media/walkthrough-music.m4a", poster: 9.5 },
  short: { out: "film-out/velero-walkthrough-short-1080p.mp4", music: "public/media/walkthrough-music-short.m4a", poster: 7 },
  scams: { out: "film-out/velero-scams-clip-1080p.mp4", music: "", poster: 4.4 },
}[FILM] || { out: `film-out/velero-${FILM}-1080p.mp4`, music: "", poster: 1 };
const OUT = process.env.OUT || DEFAULTS.out;
const MUSIC = process.env.MUSIC === "" ? "" : (process.env.MUSIC || DEFAULTS.music);
const POSTER = Number(process.env.POSTER || DEFAULTS.poster);

let server = null;
let base = process.env.FILM_URL;
if (!base) {
  if (!existsSync("dist/index.html")) { console.error("✗ No dist/ build. Run `npm run build` first."); process.exit(1); }
  server = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], { stdio: ["ignore", "pipe", "inherit"] });
  await new Promise((resolve, reject) => {
    const to = setTimeout(() => reject(new Error("vite preview did not start")), 20000);
    server.stdout.on("data", (d) => { if (String(d).includes("4173")) { clearTimeout(to); resolve(); } });
    server.on("exit", (code) => reject(new Error(`vite preview exited with ${code}`)));
  });
  base = "http://localhost:4173";
}

await mkdir(path.dirname(OUT), { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE, reducedMotion: "no-preference" });
await page.goto(`${base}/walkthrough?render=1${FILM ? `&film=${FILM}` : ""}`, { waitUntil: "networkidle" });
await page.waitForFunction(() => !!window.__film);
await page.evaluate(() => document.fonts.ready);
const total = await page.evaluate(() => window.__film.total);
const frames = Math.round(total * FPS);

const seek = (t) => page.evaluate((s) => new Promise((r) => { window.__film.seek(s); requestAnimationFrame(() => requestAnimationFrame(() => r())); }), t);

// Warm every scene once, so fonts, logos and photos are decoded before the real pass.
for (let t = 0; t < total; t += 2) { await seek(t); await page.waitForTimeout(40); }
await seek(0);

// Poster still.
await seek(POSTER);
await page.waitForTimeout(80);
await writeFile(OUT.replace(/\.mp4$/, "-poster.png"), await page.screenshot({ type: "png" }));

const args = ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-"];
if (MUSIC) args.push("-i", MUSIC);
args.push("-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", String(FPS), "-movflags", "+faststart");
if (MUSIC) args.push("-c:a", "aac", "-b:a", "192k", "-shortest");
args.push(OUT);
const ff = spawn("ffmpeg", args, { stdio: ["pipe", "ignore", "inherit"] });
const done = new Promise((resolve, reject) => ff.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)))));

const started = Date.now();
for (let i = 0; i < frames; i++) {
  await seek(i / FPS);
  const png = await page.screenshot({ type: "png" });
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  if (i % (FPS * 5) === 0) {
    const pct = Math.round((i / frames) * 100);
    const eta = i ? Math.round(((Date.now() - started) / i) * (frames - i) / 1000) : 0;
    console.log(`  ${String(pct).padStart(3)}%  frame ${i}/${frames}${i ? `  ~${eta}s left` : ""}`);
  }
}
ff.stdin.end();
await done;
await browser.close();
server?.kill();
console.log(`✓ ${OUT}  (${frames} frames, ${total.toFixed(1)}s at ${FPS} fps${MUSIC ? ", with music" : ", silent"})`);
