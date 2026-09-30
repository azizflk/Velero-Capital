type Logo = { name: string; src: string };

export function LogoRow({ logos, title }: { logos: Logo[]; title?: string }) {
  return (
    <div>
      {title && <div className="eyebrow mb-3">{title}</div>}
      <div className="grid grid-cols-3 border-l border-t border-rule sm:grid-cols-4 lg:grid-cols-6">
        {logos.map((l) => (
          <div key={l.name + l.src} className="flex h-20 items-center justify-center border-b border-r border-rule px-5" title={l.name}>
            <img src={l.src} alt={l.name} loading="lazy" className="logo-ink max-h-7 w-auto max-w-[110px] object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const items = [...logos, ...logos];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee flex w-max items-center gap-16 py-2">
        {items.map((l, i) => <img key={i} src={l.src} alt={l.name} className="logo-ink h-6 w-auto max-w-[120px] object-contain" loading="lazy" />)}
      </div>
    </div>
  );
}
