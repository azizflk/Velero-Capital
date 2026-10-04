import { useEffect, useState } from "react";
import { team } from "@/data/site";

const people = team.filter((m): m is (typeof team)[number] & { photo: string } => "photo" in m && !!m.photo);

/** Team portraits, one at a time, cross-fading every three seconds. The founder is first. */
export default function TeamSlideshow({ interval = 3000 }: { interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (people.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % people.length), interval);
    return () => clearInterval(t);
  }, [interval]);
  return (
    <figure>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
        {people.map((m, k) => (
          <img
            key={m.name}
            src={m.photo}
            alt={k === i ? `${m.name}, ${m.role}` : ""}
            aria-hidden={k !== i}
            loading={k === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover object-top grayscale transition-opacity duration-700 motion-reduce:transition-none ${k === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </figure>
  );
}
