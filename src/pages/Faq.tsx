import { Link } from "react-router-dom";
import { SidebarPage, Section } from "@/components/Layout";
import FAQ from "@/components/FAQ";
import Button from "@/components/Button";
import { faqGroups, faqs } from "@/data/site";
import { faqPage, useTitle } from "@/lib/useTitle";
import { APPLY_HREF } from "@/lib/portal";

const anchors = faqGroups.map((g) => ({ id: g.id, label: g.title }));

export default function FaqPage() {
  useTitle("FAQ", "Answers to common questions about Velero Capital: what the firm does and does not do, how investors take part, how to submit an opportunity, and how to apply.", {
    full: "Frequently Asked Questions | Velero Capital",
    crumbs: [{ name: "Company", path: "/company/" }],
    jsonLd: [faqPage("/faq/", faqs)],
  });
  return (
    <SidebarPage
      title="Frequently asked questions"
      intro="Velero Capital does not invest its own capital. It helps investment happen: it introduces private-market opportunities to eligible investors, and advises companies on raising capital and on their transactions."
      anchors={anchors}
    >
      {faqGroups.map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>
          <FAQ items={g.items} />
        </Section>
      ))}
      <Section title="Still have a question?">
        <p className="max-w-2xl text-[14px] leading-relaxed text-ink/80">Tell us who you are and what you are looking for, or write to us. Before acting on any message that claims to come from Velero Capital, check it on the <Link to="/verification/" className="textlink">Account Verification</Link> page.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Button to={APPLY_HREF} variant="blue">Apply</Button><Button to="/contact-us/">Contact</Button></div>
      </Section>
    </SidebarPage>
  );
}
