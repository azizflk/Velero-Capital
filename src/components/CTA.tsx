import Button from "./Button";
import { Check } from "./Cards";

export default function CTA() {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-10 sm:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo/30 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-medium sm:text-4xl">Velero Capital</h2>
            <p className="mt-4 text-muted">Velero Capital builds trust through clear communication, shared knowledge, and aligned incentives. Weekly syncs, market insights keep us growing together.</p>
            <p className="mt-3 text-muted">Velero Capital is based in UAE, focused on crypto infrastructure solutions and private investment services.</p>
            <div className="mt-6 flex flex-wrap gap-5"><Check>Clarity.</Check><Check>Strategy.</Check><Check>Results.</Check></div>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Button to="/contact-us/">Contact Us</Button>
            <div className="flex flex-wrap gap-4 text-xs text-muted"><span>No obligations.</span><span>No upfront costs.</span><span>100% transparent.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
