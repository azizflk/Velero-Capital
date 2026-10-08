import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import LogoBelt from "@/components/LogoBelt";
import OneLineArt from "@/components/OneLineArt";
import { coInvestors, realEstateInvestors } from "@/data/site";
import { process, type Investment as Inv } from "@/data/investments";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "overview", label: "Overview" },
  { id: "criteria", label: "What we look for" },
  { id: "process", label: "How it works" },
  { id: "enquire", label: "Enquire" },
];

export default function Investment({ item }: { item: Inv }) {
  useTitle(item.label, item.summary);
  const belt = item.belt === "realEstate" ? realEstateInvestors : item.belt === "venture" ? coInvestors : null;
  return (
    <SidebarPage title={item.title} intro={item.intro} anchors={anchors}>
      <Section id="overview">
        <Cols items={item.points} />
      </Section>

      {item.extra && (
        <Section title={item.extra.title}>
          <div className="grid items-end gap-10 grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5"><List items={item.extra.items} /></div>
            <div className="lg:col-span-7"><OneLineArt kind={item.art} className="w-full text-ink" /></div>
          </div>
        </Section>
      )}

      <Section id="criteria" title="What we look for">
        {item.extra ? (
          <List items={item.lookFor} />
        ) : (
          <div className="grid items-end gap-10 grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6"><List items={item.lookFor} /></div>
            <div className="lg:col-span-6"><OneLineArt kind={item.art} className="w-full text-ink" /></div>
          </div>
        )}
      </Section>

      <Section id="process" title="How it works">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.title} className="border-t border-rule pt-4">
              <div className="text-[12px] tabular-nums text-ink/50">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-1 text-2xl">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {belt && (
        <Section>
          <div className="eyebrow mb-3">{item.beltLabel}</div>
          <div className="border-y border-rule">
            <LogoBelt items={belt[0]} direction="left" />
            <div className="rule" />
            <LogoBelt items={belt[1]} direction="right" />
          </div>
        </Section>
      )}

      <Section id="enquire" title="Investor access">
        <Prose><p>Opportunities are shared only with eligible family offices and institutional investors whose mandate they fit, after review. Access and allocation are never guaranteed.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/investor-access/" variant="blue">Investor Access</Button><Button to="/capital/">All strategies</Button></div>
      </Section>
    </SidebarPage>
  );
}
