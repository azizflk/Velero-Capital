import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import { Section } from "@/components/Section";
import { team } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

const TG = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.47 8.7 20.2c.48 0 .69-.21.94-.46l2.26-2.16 4.68 3.43c.86.47 1.47.22 1.7-.79l3.08-14.44c.28-1.26-.45-1.75-1.29-1.44L1.9 11.3c-1.24.48-1.22 1.17-.21 1.48l4.62 1.44 10.73-6.76c.5-.33.96-.15.58.18" /></svg>;
const IN = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>;

export default function Team() {
  useTitle("Team", "The operators shaping the future of tech and Web3 at Velero Capital.");
  return (
    <>
      <Hero title="The Core Team" text="This is the team behind the curtain. The operators shaping the future of tech and Web3." compact />
      <Section className="!pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="card group overflow-hidden transition-all hover:border-cyan/40">
              <div className="aspect-[4/4] overflow-hidden bg-surface">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl font-medium text-white/20">{m.name.split(" ").map((s) => s[0]).join("")}</div>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="text-lg font-medium">{m.name}</h3>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
                <div className="flex gap-2">
                  {m.telegram && <a href={m.telegram} target="_blank" rel="noreferrer" aria-label={`${m.name} on Telegram`} className="rounded-lg border border-line p-2 text-muted hover:border-cyan hover:text-cyan">{TG}</a>}
                  {"linkedin" in m && m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} className="rounded-lg border border-line p-2 text-muted hover:border-cyan hover:text-cyan">{IN}</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
