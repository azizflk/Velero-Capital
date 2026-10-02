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
  { type: "Announcements", title: "Beware of scammers: verify before you reply", text: "We’ve seen increasing attempts of impersonation. Confirm any Telegram handle or email with our verification tool. We do not reach out through unofficial channels.", to: "/verification/", tile: "Verify" },
  { type: "Announcements", title: "Only approved projects and investors can participate", text: "Every opportunity we bring is curated, vetted, and shared only within our closed investor circle.", to: "/contact-us/", tile: "Closed circle" },
  { type: "Insights", title: "How daily OTC allocations work", text: "Token-for-USDT/USD deals at discounted rates deliver steady cash flow to projects while protecting retail markets from price shocks.", to: "/otc-investment/", photo: "/team/kamala-aliyeva.jpg" },
  { type: "Insights", title: "Our ticket: $50k to $10M", text: "From initial ticket to Series A through OTC acquisitions and venture capital, prioritizing value over valuation.", to: "/strategic-investments/#ticket", tile: "$50K–$10M" },
  { type: "Insights", title: "Six tech categories we back", text: "AI, robotics, biotechnology, space, fintech and healthcare technology — from seed stage to pre-IPO.", to: "/tech-investments-part/#categories", photo: "/team/aziz-falak.jpg" },
  { type: "Insights", title: "From token design to investor-ready launches", text: "Tokenomics, compliance, TGE and listings: how our advisory team becomes part of yours.", to: "/transformations/", photo: "/team/rosie-gazar.jpg" },
  { type: "Insights", title: "100% transparency, at every stage", text: "From deal flow to due diligence, we ensure complete visibility at every stage of the investment process.", to: "/famiglia/#apart", tile: "100%" },
  { type: "Insights", title: "Smart risk and custom alerts", text: "Our proprietary alert system monitors on-chain signals, market trends, and ecosystem movements in real time. We don’t react — we anticipate.", to: "/famiglia/#apart", tile: "On-chain" },
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
