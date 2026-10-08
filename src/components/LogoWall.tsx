import LogoBelt from "./LogoBelt";

type Item = { name: string; src: string };

/** Two logo belts with a fixed caption cell on the left; on narrow screens the caption sits above the belts. */
export default function LogoWall({ caption, rows }: { caption: string; rows: [Item[], Item[]] }) {
  return (
    <div className="grid grid-cols-1 border-y border-rule sm:grid-cols-[11rem_minmax(0,1fr)]">
      <div className="flex items-center border-b border-rule px-4 py-4 text-[15px] leading-snug text-ink/70 sm:border-b-0 sm:border-r sm:px-5 sm:py-0">{caption}</div>
      <div className="min-w-0">
        <LogoBelt items={rows[0]} direction="left" />
        <div className="rule" />
        <LogoBelt items={rows[1]} direction="right" />
      </div>
    </div>
  );
}
