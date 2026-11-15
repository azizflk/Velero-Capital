import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { about, roleOptions, type Role } from "@/components/EnquiryForm";
import { day, stages, supabase, usePageTitle, type Application } from "./client";
import { Chip, Loading, toneOf } from "./Shell";

/** What an application is called in a list: a founder who has not yet said what they want is just “Founder”. */
export const nameOf = (a: Pick<Application, "role" | "goal">) => (a.role === "founder" && !a.goal ? "Founder" : about(a.role, a.goal));

/** The first screen after signing in: every application this person has started, and the way to start one. */
export default function Account({ session }: { session: Session }) {
  usePageTitle("Your applications");
  const nav = useNavigate();
  const uid = session.user.id;
  const [apps, setApps] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState<Role | "">("");
  const [picking, setPicking] = useState(false);
  const [removing, setRemoving] = useState("");

  const load = useCallback(async () => {
    // Filtered to this person even for an admin, whose access would otherwise include other people's applications.
    const { data, error } = await supabase.from("applications").select("*").eq("user_id", uid).order("updated_at", { ascending: false });
    if (error) setError("Your applications could not be loaded. Please refresh the page.");
    else setApps(data as Application[]);
  }, [uid]);
  useEffect(() => { void load(); }, [load]);

  const start = async (role: Role) => {
    setError(""); setStarting(role);
    const { data, error } = await supabase.from("applications").insert({ role }).select().single();
    setStarting("");
    if (error || !data) { setError(error?.message || "That could not be started. Please try again."); return; }
    nav(`/account/application/${(data as Application).id}/`);
  };
  const remove = async (id: string) => {
    setError("");
    const { error } = await supabase.from("applications").delete().eq("id", id);
    setRemoving("");
    if (error) setError("That draft could not be deleted. Please try again.");
    else setApps((list) => (list ?? []).filter((a) => a.id !== id));
  };

  if (!apps && !error) return <Loading what="Loading your applications" />;
  const none = !apps?.length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">Your account</div>
      <div className="mt-3 h-px w-10 bg-blue" />
      <h1 className="display mt-5 text-4xl sm:text-5xl">{none ? "Connect with Velero" : "Your applications"}</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">
        {none
          ? "Select your profile to explore investment opportunities, access advisory services, or submit a transaction for consideration. Your answers are saved as you go, so you can finish later."
          : "Continue a draft, or follow an application you have sent. We review each one for fit before arranging a first conversation."}
      </p>
      {error && <p className="mt-6 rounded-md border border-red-700/25 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-800" role="alert">{error}</p>}

      {!none && (
        <ul className="mt-9 space-y-3">
          {apps!.map((a) => (
            <li key={a.id} className="flex flex-col gap-4 rounded-lg border border-rule bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="display text-2xl">{nameOf(a)}</h2>
                  <Chip tone={toneOf(a.status)}>{stages[a.status].label}</Chip>
                </div>
                <p className="mt-1.5 text-[13px] text-ink/65">
                  {a.fields.organisation ? `${a.fields.organisation} · ` : ""}
                  {a.status === "draft" ? `Last saved ${day(a.updated_at)}` : `Sent ${day(a.submitted_at)}`}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {a.status === "draft" && (removing === a.id ? (
                  <>
                    <button type="button" onClick={() => void remove(a.id)} className="pill pill-small pill-danger">Delete draft</button>
                    <button type="button" onClick={() => setRemoving("")} className="pill pill-small">Keep</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setRemoving(a.id)} className="px-2 text-[13px] text-ink/60 underline-offset-4 hover:text-ink hover:underline">Delete</button>
                ))}
                {removing !== a.id && <Link to={`/account/application/${a.id}/`} className={`pill pill-small ${a.status === "draft" ? "pill-blue" : ""}`}>{a.status === "draft" ? "Continue" : "View"} <span aria-hidden>→</span></Link>}
              </div>
            </li>
          ))}
        </ul>
      )}

      {none || picking ? (
        <section className="mt-9" aria-labelledby="start">
          <h2 id="start" className="text-[13px] font-semibold">I am</h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {roleOptions.map((o) => (
              <button key={o.value} type="button" disabled={!!starting} onClick={() => void start(o.value)} className="rounded-md border border-ink/20 bg-white px-4 py-3.5 text-left transition-colors hover:border-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-60">
                <span className="display block text-xl">{starting === o.value ? "Starting…" : o.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-ink/65">{o.text}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <button type="button" onClick={() => setPicking(true)} className="pill mt-7">Start another application</button>
      )}

      <p className="mt-12 max-w-2xl border-t border-rule pt-6 text-[12px] leading-relaxed text-ink/60">Please do not send confidential documents through this account. Nothing here is an offer or a solicitation; any engagement is subject to due diligence and a written scope. See the <a href="/legal/" className="textlink">legal and disclosures</a> page.</p>
    </div>
  );
}
