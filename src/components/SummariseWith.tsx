import { useLocation } from "react-router-dom";

const SITE = "https://www.velero.capital";

const tools = [
  { name: "ChatGPT", url: (q: string) => `https://chatgpt.com/?q=${q}` },
  { name: "Claude", url: (q: string) => `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", url: (q: string) => `https://www.perplexity.ai/search?q=${q}` },
];

/** "Summarise this page with…" strip. Each pill opens the assistant with a prefilled prompt for the current page. */
export default function SummariseWith() {
  const { pathname } = useLocation();
  const page = SITE + (pathname === "/" ? "" : pathname);
  const prompt = `Read ${page} and summarise it for me: what Velero Capital does on this page, who it is for, how the engagement works and what it costs. Then tell me what questions I should ask them on a first call.`;
  const q = encodeURIComponent(prompt);
  return (
    <div>
      <div className="wrap flex flex-col items-center justify-center gap-4 py-7 sm:flex-row sm:gap-6">
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/60">Summarise this page with</span>
        <div className="flex flex-wrap justify-center gap-2.5">
          {tools.map((t) => (
            <a key={t.name} href={t.url(q)} target="_blank" rel="noopener noreferrer" className="pill" title={`Summarise this page with ${t.name}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
              {t.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
