import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import { LogoRow } from "@/components/Logos";
import { Section, Cols, Quote } from "@/components/Layout";
import { differentiators, faqs, partners, team, trustedExchanges } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

type Slide = { eyebrow: string; title: string; text: string; to: string; image: React.ReactNode };

const LogoPanel = (
  <div className="flex h-full w-full items-center justify-center border border-rule bg-paper p-10">
    <img src="/images/logo-box.png" alt="Velero Capital" className="w-3/5 max-w-sm" />
  </div>
);
const Portrait = (src: string, alt: string) => <img src={src} alt={alt} className="h-full w-full object-cover object-top grayscale" />;
const LogoMosaic = (
  <div className="grid h-full w-full grid-cols-4 gap-px bg-rule p-px">
    {[...partners.CEX.slice(0, 8), ...partners.DEX.slice(0, 4)].map((l) => (
      <div key={l.src} className="flex items-center justify-center bg-paper p-4"><img src={l.src} alt={l.name} className="logo-ink max-h-6 w-auto max-w-[80px] object-contain" /></div>
    ))}
  </div>
);

const slides: Slide[] = [
  { eyebrow: "Velero Capital", title: "Guiding bold ideas to safe harbors", text: "We connect top-tier investors with high-growth Tech and Web3 innovators. Every opportunity we bring is curated, vetted, and shared only within our closed investor circle.", to: "/about-us/", image: LogoPanel },
  { eyebrow: "Web3", title: "We don’t just talk Web3. We build it.", text: "A private investment syndicate connecting a trusted network of global investors with high-growth Web3 projects, from token design to investor-ready launches.", to: "/web3-services/", image: LogoMosaic },
  { eyebrow: "OTC Investment", title: "Daily OTC allocations into high-utility tokens", text: "Daily Over-The-Counter deals in utility tokens create steady cash flow and sustainable value for everyone involved. No obligations. No upfront costs. 100% transparent.", to: "/otc-investment/", image: Portrait("/team/kamala-aliyeva.jpg", "Kamala Aliyeva, Head of OTC") },
  { eyebrow: "Tech", title: "Scale without limits, on your terms", text: "You bring the vision, we bring the execution. From Dubai to Silicon Valley, our syndicate unlocks access to vetted early-stage ventures in AI, robotics, biotech, fintech and space.", to: "/tech-investments-part/", image: Portrait("/team/aziz-falak.jpg", "Aziz Falak, Founder") },
  { eyebrow: "Account Verification", title: "Beware of scammers", text: "We do not reach out through unofficial channels. If someone claims to represent Velero Capital, verify their Telegram handle or email before you reply.", to: "/verification/", image: Portrait("/team/lika-gazar.jpg", "Lika Gazar") },
];

function Feature() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go, paused]);
  const s = slides[i];
  return (
    <section className="wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-end gap-8 py-8 lg:grid-cols-12 lg:py-10">
        <div key={"img" + i} className="fade-in order-1 lg:order-2 lg:col-span-7 lg:col-start-6 lg:self-center">
          <Link to={s.to} className="block aspect-[4/3] w-full overflow-hidden bg-sand lg:aspect-[16/11]">{s.image}</Link>
        </div>
        <div key={"txt" + i} className="fade-in order-2 lg:order-1 lg:col-span-5 lg:col-start-1">
          <div className="eyebrow">{s.eyebrow}</div>
          <h1 className="display mt-1 text-5xl sm:text-6xl lg:text-[64px]"><Link to={s.to} className="hover:text-blue">{s.title}</Link></h1>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ink/80">{s.text}</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-ink/70">
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}</span>
            <span className="flex gap-1">
              <button onClick={() => go(-1)} aria-label="Previous" className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 hover:border-ink">←</button>
              <button onClick={() => go(1)} aria-label="Next" className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 hover:border-ink">→</button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle("Home");
  const founder = team[0];
  return (
    <>
      <Feature />
      <Ticker />

      <div className="wrap py-14">
        <Stats />
      </div>

      <div className="wrap">
        <Section title="What we do">
          <Cols items={[
            { title: "OTC Investment", text: "Daily Over-The-Counter OTC deals in utility tokens create steady cash flow and sustainable value—for everyone involved.", to: "/otc-investment/" },
            { title: "Strategic Investments", text: "Early-stage blockchain ventures, offering customized strategies, hands-on guidance, and critical resources to accelerate growth.", to: "/strategic-investments/" },
            { title: "Tech", text: "AI, robotics, health tech, and beyond — we partner early, scale fast, and connect you with the capital that counts.", to: "/tech-investments-part/" },
            { title: "Advisory", text: "Growth with expert support in tokenomics, regulatory compliance, TGE on Tier 1 & 2 CEXs, market strategy, and capital raising.", to: "/strategic-investments/" },
          ]} cols={4} />
        </Section>

        <Section title="Our partners">
          <div className="space-y-10">
            <LogoRow title="Trusted exchanges" logos={trustedExchanges} />
            <LogoRow title="CEX" logos={partners.CEX} />
            <LogoRow title="DEX" logos={partners.DEX} />
            <LogoRow title="Chains" logos={partners.Chains} />
          </div>
        </Section>

        <Section title="What sets us apart">
          <Cols items={differentiators} cols={3} />
        </Section>

        <Section>
          <Quote text="Transparency isn’t just a feature — it’s our foundation. From deal flow to due diligence, we ensure complete visibility at every stage of the investment process." name={founder.name} role={`${founder.role}, Velero Capital`} photo={founder.photo} />
        </Section>

        <Section title="Frequently asked questions">
          <FAQ items={faqs} />
        </Section>
      </div>
    </>
  );
}
