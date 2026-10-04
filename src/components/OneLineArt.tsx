/**
 * One-line drawings: a single continuous stroke that draws itself, holds, erases and loops.
 * Pure SVG + CSS (see `.one-line` in index.css), so they stay sharp at any size and need no video file.
 */
export type ArtKind = "skyline" | "growth" | "transfer" | "syndicate";

/** A person drawn without lifting the pen: up the left side, shoulder, head loop, shoulder, down. */
const person = (x: number, w = 50, base = 320) => {
  const s = w / 50;
  const X = (n: number) => +(x + n * s).toFixed(1);
  const Y = (n: number) => +(base - n * s).toFixed(1);
  return [
    `L ${X(0)} ${base} L ${X(0)} ${Y(50)}`,
    `C ${X(0)} ${Y(75)} ${X(12)} ${Y(82)} ${X(25)} ${Y(82)}`,
    `C ${X(7)} ${Y(82)} ${X(7)} ${Y(118)} ${X(25)} ${Y(118)}`,
    `C ${X(43)} ${Y(118)} ${X(43)} ${Y(82)} ${X(25)} ${Y(82)}`,
    `C ${X(38)} ${Y(82)} ${X(50)} ${Y(75)} ${X(50)} ${Y(50)} L ${X(50)} ${base}`,
  ].join(" ");
};

const art: Record<ArtKind, { d: string; label: string }> = {
  skyline: {
    label: "Line drawing of a row of buildings: a house, an office block, a tower, a warehouse and an apartment building",
    d: [
      "M 10 320 L 70 320",
      "L 70 250 L 110 212 L 150 250 L 150 320 L 126 320 L 126 284 L 102 284 L 102 320 L 172 320",
      "L 172 160 L 200 160 L 200 128 L 252 128 L 252 160 L 280 160 L 280 320 L 302 320",
      "L 302 86 L 341 54 L 341 14 L 341 54 L 380 86 L 380 320 L 402 320",
      "L 402 236 L 432 204 L 432 236 L 462 204 L 462 236 L 492 204 L 492 236 L 522 236 L 522 320 L 486 320 L 486 276 L 440 276 L 440 320 L 544 320",
      "L 544 112 L 640 112 L 640 150 L 656 150 L 656 166 L 640 166 L 640 204 L 656 204 L 656 220 L 640 220 L 640 258 L 656 258 L 656 274 L 640 274 L 640 320 L 692 320",
      "L 692 282 C 660 282 660 230 692 230 C 724 230 724 282 692 282 L 692 320 L 790 320",
    ].join(" "),
  },
  growth: {
    label: "Line drawing of funding stages stepping upward, a rocket on its launch pad, and the opening bell of a stock exchange",
    d: [
      "M 10 320 L 56 320",
      // stages stepping up
      "L 56 288 L 104 288 L 104 256 L 152 256 L 152 224 L 200 224 L 200 320 L 322 320",
      // rocket: left fin, body with porthole, nose cone
      "L 340 262 L 368 248 L 368 170 L 384 170 C 384 146 416 146 416 170 C 416 194 384 194 384 170 L 368 170 L 368 124",
      "C 368 82 390 46 400 28 C 410 46 432 82 432 124",
      // down the right side, across the base, right fin
      "L 432 248 L 368 248 L 432 248 L 460 262 L 478 320 L 536 320",
      // bell frame with the opening bell hanging from it
      "L 536 150 L 600 150 L 600 172 C 572 174 570 216 556 242 L 600 242 L 600 254 C 591 254 591 270 600 270 C 609 270 609 254 600 254 L 600 242 L 644 242 C 630 216 628 174 600 172 L 600 150 L 664 150 L 664 320 L 790 320",
    ].join(" "),
  },
  transfer: {
    label: "Line drawing of a share certificate passing between two people",
    d: [
      "M 10 320",
      person(60, 86),
      "L 300 320",
      // certificate with a folded corner
      "L 300 104 L 440 104 L 482 146 L 440 146 L 440 104 L 482 146",
      // seal on the right edge
      "L 482 232 C 520 232 520 280 482 280 C 452 280 452 232 482 232 L 482 320",
      "L 640 320".replace("L 640 320", ""),
      person(640, 86),
      "L 790 320",
    ].join(" "),
  },
  syndicate: {
    label: "Line drawing of three investors joined by one line to a single institution",
    d: [
      "M 10 320",
      person(40, 56),
      person(126, 56),
      person(212, 56),
      "L 372 320 L 372 300 L 392 300",
      // four columns
      "L 392 184 L 424 184 L 424 300 L 452 300",
      "L 452 184 L 484 184 L 484 300 L 512 300",
      "L 512 184 L 544 184 L 544 300 L 572 300",
      "L 572 184 L 604 184 L 604 300 L 622 300",
      // up the side, across the entablature, over the pediment
      "L 622 164 L 374 164 L 498 92 L 622 164 L 622 300 L 642 300 L 642 320 L 790 320",
    ].join(" "),
  },
};

export default function OneLineArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  const a = art[kind];
  return (
    <svg viewBox="0 0 800 340" className={className} role="img" aria-label={a.label}>
      <path key={kind} className="one-line" d={a.d} pathLength={1} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
