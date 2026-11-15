import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { Confirmations, GoalPick, Questions, RolePick, about, chosen, collect, summary, type Answers, type Goal, type Role } from "@/components/EnquiryForm";
import { CONTACT_EMAIL } from "@/data/site";
import { DELIVERS, submitForm } from "@/lib/forms";
import { day, dayTime, flow, stages, supabase, usePageTitle, type Application } from "./client";
import { nameOf } from "./Account";
import { Chip, Loading, toneOf } from "./Shell";

const backLink = <Link to="/account/" className="text-[13px] text-ink/70 hover:text-ink"><span aria-hidden>←</span> Your applications</Link>;

/** One application: the form while it is a draft, a read-only record once it has been sent. */
export default function ApplicationPage({ session }: { session: Session }) {
  const { id = "" } = useParams();
  const [app, setApp] = useState<Application | null | undefined>(undefined);
  const [justSent, setJustSent] = useState(false);
  usePageTitle(app ? nameOf(app) : "Application");

  useEffect(() => {
    let live = true;
    setApp(undefined);
    supabase.from("applications").select("*").eq("id", id).eq("user_id", session.user.id).maybeSingle().then(({ data }) => { if (live) setApp((data as Application) ?? null); });
    return () => { live = false; };
  }, [id, session.user.id]);

  if (app === undefined) return <Loading what="Loading your application" />;
  if (app === null) {
    return (
      <div className="mx-auto max-w-3xl">
        {backLink}
        <h1 className="display mt-6 text-4xl">Application not found</h1>
        <p className="mt-3 text-[15px] text-ink/80">It may have been deleted, or it belongs to another account.</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      {app.status === "draft"
        ? <Editor key={app.id} app={app} session={session} onSent={(sent) => { setJustSent(true); setApp(sent); window.scrollTo({ top: 0 }); }} />
        : <Sent app={app} justSent={justSent} />}
    </div>
  );
}

function Editor({ app, session, onSent }: { app: Application; session: Session; onSent: (a: Application) => void }) {
  const [role, setRole] = useState<Role>(app.role);
  const [goal, setGoal] = useState<Goal | null>(app.goal);
  const [state, setState] = useState<"saved" | "dirty" | "saving" | "failed">("saved");
  const [savedAt, setSavedAt] = useState(app.updated_at);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const timer = useRef(0);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  // The latest answers, kept outside the form so they can still be saved as the page is left.
  const latest = useRef<{ role: Role; goal: Goal | null; fields: Answers; dirty: boolean }>({ role: app.role, goal: app.goal, fields: app.fields, dirty: false });

  // What the questions start with: the saved answers, or for a new draft the account's own name and email.
  const [initial] = useState<Answers>(() => ({
    name: String(session.user.user_metadata?.full_name ?? session.user.user_metadata?.name ?? ""),
    email: session.user.email ?? "",
    ...app.fields,
  }));

  const snapshot = () => {
    if (form.current) latest.current = { role, goal: role === "founder" ? goal : null, fields: collect(form.current), dirty: true };
  };
  const write = useCallback((status?: "submitted") => {
    const { role, goal, fields } = latest.current;
    latest.current.dirty = false;
    // One write at a time, in order, so an older save can never land on top of a newer one.
    const run = queue.current.then(async () => supabase.from("applications").update({ role, goal, fields, ...(status ? { status } : {}) }).eq("id", app.id).select().single());
    queue.current = run.catch(() => undefined);
    return run;
  }, [app.id]);
  const save = useCallback(async () => {
    window.clearTimeout(timer.current);
    setState("saving");
    const { data, error } = await write();
    if (error || !data) { setState("failed"); return false; }
    setSavedAt((data as Application).updated_at);
    setState(latest.current.dirty ? "dirty" : "saved");
    return true;
  }, [write]);
  const touched = () => {
    snapshot();
    setState("dirty");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void save(), 1200);
  };

  // Changing profile changes the questions; save once they are on the page.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    touched();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, goal]);
  // Leaving with unsaved answers: send them on the way out.
  useEffect(() => () => { window.clearTimeout(timer.current); if (latest.current.dirty) void write(); }, [write]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.clearTimeout(timer.current);
    snapshot();
    setError(""); setSending(true);
    const { data, error } = await write("submitted");
    if (error || !data) { setSending(false); setState("failed"); setError(`That did not send. Please try again, or email ${CONTACT_EMAIL}.`); return; }
    const sent = data as Application;
    // Tell the team by email as the public form does. The application is already safely stored, so this is best effort.
    if (DELIVERS) await submitForm(`Account application: ${about(sent.role, sent.goal)}`, { ...sent.fields, account_email: sent.email, application_id: sent.id }).catch(() => undefined);
    onSent(sent);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {backLink}
        <span className="text-[12px] text-ink/60" role="status">
          {state === "saving" ? "Saving…" : state === "dirty" ? "Unsaved changes" : state === "failed" ? "Not saved. Check your connection." : `Draft saved ${dayTime(savedAt)}`}
        </span>
      </div>
      <h1 className="display mt-6 text-4xl sm:text-5xl">Your application</h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/80">Choose the option that describes you and we will ask only what is relevant. Your answers are saved as you type; nothing is sent to us until you submit. Please do not include confidential documents.</p>

      <form ref={form} onSubmit={onSubmit} onChange={touched} className="mt-8 grid gap-5 sm:grid-cols-2">
        <RolePick value={role} onChange={(r) => { setRole(r); if (r !== "founder") setGoal(null); }} />
        {role === "founder" && <GoalPick value={goal} onChange={setGoal} />}
        <Questions role={role} goal={goal} values={initial} />

        {chosen(role, goal) && (
          <>
            <Confirmations role={role} values={initial} />
            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <button type="submit" disabled={sending} className="pill pill-blue">{sending ? "Sending…" : "Submit application"}</button>
              <button type="button" disabled={sending || state === "saving"} onClick={() => { snapshot(); void save(); }} className="pill">Save draft</button>
            </div>
          </>
        )}
        {error && <p className="rounded-md border border-red-700/25 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-800 sm:col-span-2" role="alert">{error}</p>}
      </form>
    </>
  );
}

function Sent({ app, justSent }: { app: Application; justSent: boolean }) {
  const rows = summary(app.role, app.goal, app.fields);
  const at = flow.indexOf(app.status);
  const steps = flow.slice(0, 3);
  return (
    <>
      {backLink}
      {justSent && (
        <div className="mt-6 rounded-md border border-blue/30 bg-white p-5 text-[15px]" role="status">
          <strong>Thank you.</strong> We have your application and will come back to you once we have reviewed it.
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="display text-4xl sm:text-5xl">{nameOf(app)}</h1>
        <Chip tone={toneOf(app.status)}>{stages[app.status].label}</Chip>
      </div>
      <p className="mt-3 text-[13px] text-ink/65">Sent {day(app.submitted_at)}{app.fields.organisation ? ` · ${app.fields.organisation}` : ""}</p>

      {app.status === "closed" ? (
        <p className="mt-7 rounded-lg border border-rule bg-white p-5 text-[14px] leading-relaxed text-ink/80">{stages.closed.text}</p>
      ) : (
        <ol className="mt-7 grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => {
            const done = i < at, now = i === at;
            return (
              <li key={s} aria-current={now ? "step" : undefined} className={`rounded-lg border p-5 ${now ? "border-blue bg-white" : "border-rule bg-white/50"}`}>
                <div className={`display text-3xl ${now || done ? "text-blue" : "text-ink/30"}`}>{String(i + 1).padStart(2, "0")}</div>
                <h2 className={`display mt-3 text-xl ${now || done ? "" : "text-ink/45"}`}>{stages[s].label}{done && <span className="sr-only"> (done)</span>}</h2>
                {now && <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{stages[s].text}</p>}
              </li>
            );
          })}
        </ol>
      )}

      <h2 className="display mt-12 text-2xl">What you sent</h2>
      <dl className="mt-4 grid gap-x-8 border-t border-rule sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className={`border-b border-rule py-3.5 ${r.wide ? "sm:col-span-2" : ""}`}>
            <dt className="text-[12px] font-semibold text-ink/60">{r.label}</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-[15px]">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-ink/65">Something to add or correct? Email <a href={`mailto:${CONTACT_EMAIL}`} className="textlink">{CONTACT_EMAIL}</a>. We only ever write from official addresses, which you can <a href="/verification/" className="textlink">check here</a>.</p>
    </>
  );
}
