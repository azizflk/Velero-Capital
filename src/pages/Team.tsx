import { SidebarPage } from "@/components/Layout";
import { team } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

export default function Team() {
  useTitle("Team", "The operators behind every Velero Capital mandate.");
  return (
    <SidebarPage title="Team" intro="This is the team behind the curtain. The operators behind every mandate.">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {team.map((m) => (
          <div key={m.name}>
            <div className="aspect-[2/3] w-full overflow-hidden bg-sand">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover object-center grayscale transition-all duration-500 hover:grayscale-0" />
              ) : (
                <div className="display flex h-full w-full items-center justify-center text-5xl text-ink/20">{m.name.split(" ").map((s) => s[0]).join("")}</div>
              )}
            </div>
            <div className="mt-3 text-[15px] font-semibold leading-tight">{m.name}</div>
            <div className="text-[12px] text-ink/70">{m.role}</div>
            <div className="mt-1.5 flex gap-3 text-[12px]">
              {"linkedin" in m && m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" className="textlink">LinkedIn</a>}
            </div>
          </div>
        ))}
      </div>
    </SidebarPage>
  );
}
