type Logo = { name: string; src: string };

export function LogoGrid({ logos, more = true }: { logos: Logo[]; more?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {logos.map((l) => (
        <div key={l.name + l.src} className="card flex h-20 items-center justify-center bg-card-2 px-6 transition-colors hover:border-cyan/40" title={l.name}>
          <img src={l.src} alt={l.name} loading="lazy" className="max-h-9 w-auto max-w-[130px] object-contain brightness-0 invert" />
        </div>
      ))}
      {more && (
        <div className="card flex h-20 items-center justify-center bg-card-2 text-sm text-muted">and more!</div>
      )}
    </div>
  );
}

export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const items = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee flex w-max items-center gap-14 py-4">
        {items.map((l, i) => (
          <img key={i} src={l.src} alt={l.name} className="h-8 w-auto max-w-[140px] object-contain opacity-80 brightness-0 invert" loading="lazy" />
        ))}
      </div>
    </div>
  );
}
