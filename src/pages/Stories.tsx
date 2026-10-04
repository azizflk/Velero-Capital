import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarPage, Section } from "@/components/Layout";
import Filters from "@/components/Filters";
import FAQ from "@/components/FAQ";
import { faqs } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const TYPES = ["All", "Announcements", "Insights"] as const;
type T = (typeof TYPES)[number];

type Story = { type: Exclude<T, "All">; title: string; text: string; to: string; tile?: string; photo?: string };
const stories: Story[] = [
  { type: "Announcements", title: "Beware of scammers: verify before you reply", text: "We’ve seen increasing attempts of impersonation. Confirm any email address with our verification tool. We do not reach out through unofficial channels.", to: "/verification/", tile: "Verify" },
  { type: "Announcements", title: "Only approved investors can participate", text: "Every opportunity we bring is curated, vetted, and shared only within our closed investor circle.", to: "/contact-us/", tile: "Closed circle" },
  { type: "Insights", title: "Late-stage and pre-IPO: where we allocate", text: "Primary allocations in growth rounds of established private companies, typically Series C onward.", to: "/late-stage/", photo: "/team/aziz-falak.jpg" },
  { type: "Insights", title: "How secondary transactions work", text: "Buying existing stakes from founders, employees, early investors and fund limited partners — and what we look for before we do.", to: "/secondaries/", tile: "Secondaries" },
  { type: "Insights", title: "Real estate: direct deals, joint ventures and funds", text: "Institutional-quality real estate alongside established operators and sponsors.", to: "/real-estate/", tile: "Real estate" },
  { type: "Insights", title: "Co-investing deal by deal", text: "Why most family offices access private markets alongside a lead sponsor, one transaction at a time.", to: "/co-investments/", photo: "/team/kamala-aliyeva.jpg" },
  { type: "Insights", title: "A focused corporate finance practice", text: "Fundraising, corporate development, M&A, cap table and valuation work — senior-led and tightly scoped.", to: "/services/", photo: "/team/rosie-gazar.jpg" },
  { type: "Insights", title: "100% transparency, at every stage", text: "From deal flow to due diligence, we ensure complete visibility at every stage of the investment process.", to: "/company/#apart", tile: "100%" },
];

export default function Stories() {
  useTitle("News & Content", "Announcements, insights and frequently asked questions from Velero Capital.");
  const [type, setType] = useState<T>("All");
  const list = stories.filter((s) => type === "All" || s.type === type);
  return (
    <SidebarPage title="News & Content" intro="Announcements and insights from the Velero Capital team, plus answers to the questions founders and investors ask us most." aside={<Filters label="Type" options={TYPES} value={type} onChange={setType} />}>
      <Section>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link key={s.title} to={s.to} className="group block">
              <div className="mb-3 aspect-[16/10] w-full overflow-hidden bg-sand">
                {s.photo ? (
                  <img src={s.photo} alt="" loading="lazy" className="h-full w-full object-cover object-[center_20%] grayscale transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="display flex h-full w-full items-center justify-center bg-blue px-4 text-center text-4xl text-white">{s.tile}</div>
                )}
              </div>
              <div className="eyebrow">{s.type}</div>
              <div className="mt-0.5 text-[15px] font-semibold leading-snug underline-offset-4 group-hover:underline">{s.title}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/70">{s.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FAQ items={faqs} />
      </Section>
    </SidebarPage>
  );
}
