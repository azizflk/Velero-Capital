export default function Filters<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <div className="eyebrow mb-1">{label}</div>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} aria-pressed={value === o} className={`flex w-full items-center justify-between border-t border-rule py-2 text-left text-[13px] font-medium hover:text-blue ${value === o ? "text-blue" : ""}`}>
          {o}
          {value === o && <span aria-hidden>•</span>}
        </button>
      ))}
      <div className="rule" />
    </div>
  );
}
