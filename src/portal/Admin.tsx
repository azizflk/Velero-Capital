import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { box, questions, summary, type Role } from "@/components/EnquiryForm";
import { day, dayTime, flow, signOut, supabase, usePageTitle, type Admin as AdminRow, type Application, type Note, type Profile, type Status } from "./client";
import { nameOf } from "./Account";
import AuthCard, { AuthPage } from "./AuthCard";
import Shell, { Chip, Loading, toneOf } from "./Shell";

/** What the team calls each stage. An applicant sees the wording in client.ts instead. */
const labels: Record<Status, string> = { draft: "Draft", submitted: "New", in_review: "In review", call_scheduled: "Call arranged", closed: "Closed" };
const profiles: { value: Role; label: string }[] = [{ value: "investor", label: "Investors" }, { value: "founder", label: "Founders" }, { value: "sponsor", label: "Sponsors" }];
const warn = "rounded-md border border-red-700/25 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-800";

/** The admin panel. Signing in is not enough to see anything: the database only answers an address on the admin list. */
export default function Admin({ session }: { session: Session | null }) {
  usePageTitle("Admin");
  const [allowed, setAllowed] = useState<boolean | undefined>(undefined);
  const email = session?.user.email?.toLowerCase() ?? "";

  useEffect(() => {
    if (!session) { setAllowed(undefined); return; }
    let live = true;
    // The admin list is readable only by admins, so finding your own address in it is the test.
    supabase.from("admins").select("email").eq("email", email).then(({ data }) => { if (live) setAllowed(!!data?.length); });
    return () => { live = false; };
  }, [session, email]);

  if (!session) {
    return <AuthPage><AuthCard heading="Admin" lead="Velero Capital staff only. Log in with your admin address." next="/admin/" /></AuthPage>;
  }
  if (allowed === undefined) return <Shell email={email} home="/admin/" label="Admin"><Loading what="Checking access" /></Shell>;
  if (!allowed) {
    return (
      <Shell email={email} home="/admin/" label="Admin">
        <div className="mx-auto max-w-xl py-10 text-center">
          <h1 className="display text-4xl">No admin access</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80"><strong className="break-all">{email}</strong> is not on the admin list. Sign out and use an admin address, or ask an existing admin to add this one.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => void signOut()} className="pill pill-blue">Sign out</button>
            <a href="https://velero.capital/" className="pill">Go to velero.capital</a>
          </div>
        </div>
      </Shell>
    );
  }
  return <Shell email={email} home="/admin/" label="Admin"><Panel me={email} /></Shell>;
}

function Panel({ me }: { me: string }) {
  const [tab, setTab] = useState<"applications" | "accounts" | "admins">("applications");
  const [apps, setApps] = useState<Application[] | null>(null);
  const [people, setPeople] = useState<Profile[]>([]);
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState("");

  const load = useCallback(async () => {
    setError("");
    const [a, p, ad] = await Promise.all([
      // Drafts are never returned to an admin; the filter only keeps an admin's own drafts out of this list.
      supabase.from("applications").select("*").neq("status", "draft").order("submitted_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("admins").select("*").order("added_at", { ascending: true }),
    ]);
    if (a.error || p.error || ad.error) { setError("The data could not be loaded. Please refresh the page."); return; }
    setApps(a.data as Application[]); setPeople(p.data as Profile[]); setAdmins(ad.data as AdminRow[]);
  }, []);
  useEffect(() => { void load(); }, [load]);

  if (!apps) return error ? <p className={warn} role="alert">{error}</p> : <Loading />;
  const current = apps.find((a) => a.id === open);
  if (current) {
    return <Detail app={current} onBack={() => setOpen("")} onChange={(next) => setApps((list) => (list ?? []).map((a) => (a.id === next.id ? next : a)))} />;
  }

  const tabs = [["applications", `Applications (${apps.length})`], ["accounts", `Accounts (${people.length})`], ["admins", `Admins (${admins.length})`]] as const;
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-4xl sm:text-5xl">Admin</h1>
        <button type="button" onClick={() => void load()} className="pill pill-small">Refresh</button>
      </div>
      <div role="tablist" aria-label="Sections" className="mt-6 flex gap-6 border-b border-rule">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`-mb-px border-b-2 pb-3 text-[14px] font-medium transition-colors ${tab === id ? "border-blue text-blue" : "border-transparent text-ink/65 hover:text-ink"}`}>{label}</button>
        ))}
      </div>
      {error && <p className={`${warn} mt-5`} role="alert">{error}</p>}
      <div className="mt-7">
        {tab === "applications" && <Applications apps={apps} onOpen={setOpen} />}
        {tab === "accounts" && <Accounts people={people} apps={apps} />}
        {tab === "admins" && <Admins me={me} admins={admins} onChange={setAdmins} />}
      </div>
    </>
  );
}

function Applications({ apps, onOpen }: { apps: Application[]; onOpen: (id: string) => void }) {
  const [status, setStatus] = useState<Status | "">("");
  const [role, setRole] = useState<Role | "">("");
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const want = q.trim().toLowerCase();
    return apps.filter((a) => (!status || a.status === status) && (!role || a.role === role) && (!want || `${a.email} ${Object.values(a.fields).join(" ")}`.toLowerCase().includes(want)));
  }, [apps, status, role, q]);
  const count = (s: Status) => apps.filter((a) => a.status === s).length;

  const download = () => {
    const names = [...new Set(shown.flatMap((a) => questions(a.role, a.goal).map((d) => d.name)))];
    const cell = (v: string) => {
      // A value that starts like a formula is written as text, so a spreadsheet never runs what an applicant typed.
      const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
      return `"${safe.replace(/"/g, '""')}"`;
    };
    const rows = [["submitted_at", "status", "profile", "account_email", ...names], ...shown.map((a) => [a.submitted_at ?? "", labels[a.status], nameOf(a), a.email, ...names.map((n) => a.fields[n] ?? "")])];
    const url = URL.createObjectURL(new Blob(["﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: `velero-applications-${new Date().toISOString().slice(0, 10)}.csv` });
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
        {flow.map((s) => (
          <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(status === s ? "" : s)} className={`p-4 text-left transition-colors sm:p-5 ${status === s ? "bg-blue text-white" : "bg-paper hover:bg-white"}`}>
            <span className="display block text-4xl">{count(s)}</span>
            <span className={`mt-1 block text-[13px] font-medium ${status === s ? "text-white/85" : "text-ink/70"}`}>{labels[s]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, firm, email…" aria-label="Search applications" className={`${box} max-w-xs bg-white`} />
        {/* `box` is full width; a filter is only as wide as its longest choice. */}
        <select value={role} onChange={(e) => setRole(e.target.value as Role | "")} aria-label="Profile" className={`${box.replace("w-full ", "")} bg-white`}>
          <option value="">All profiles</option>
          {profiles.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <span className="text-[13px] text-ink/60">{shown.length} of {apps.length}</span>
        <button type="button" onClick={download} disabled={!shown.length} className="pill pill-small ml-auto">Download CSV</button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-lg border border-rule bg-white p-8 text-center text-[14px] text-ink/65">{apps.length ? "Nothing matches these filters." : "No applications have been submitted yet."}</p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-rule bg-white">
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead className="border-b border-rule text-[11px] uppercase tracking-[0.12em] text-ink/55">
              <tr><th className="px-4 py-3 font-semibold">Submitted</th><th className="px-4 py-3 font-semibold">Applicant</th><th className="px-4 py-3 font-semibold">Profile</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody>
              {shown.map((a) => (
                <tr key={a.id} className="border-b border-rule last:border-0 hover:bg-paper/60">
                  <td className="whitespace-nowrap px-4 py-3 text-ink/70">{day(a.submitted_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{a.fields.name || a.email}</div>
                    <div className="text-[12px] text-ink/60">{[a.fields.organisation, a.email].filter(Boolean).join(" · ")}</div>
                  </td>
                  <td className="px-4 py-3">{nameOf(a)}</td>
                  <td className="px-4 py-3"><Chip tone={toneOf(a.status)}>{labels[a.status]}</Chip></td>
                  <td className="px-4 py-3 text-right"><button type="button" onClick={() => onOpen(a.id)} className="pill pill-small" aria-label={`Open the application from ${a.fields.name || a.email}`}>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Detail({ app, onBack, onChange }: { app: Application; onBack: () => void; onChange: (a: Application) => void }) {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const rows = summary(app.role, app.goal, app.fields);
  const person = app.fields.name || app.email;

  useEffect(() => {
    let live = true;
    supabase.from("application_notes").select("*").eq("application_id", app.id).order("created_at", { ascending: true }).then(({ data }) => { if (live) setNotes((data as Note[]) ?? []); });
    return () => { live = false; };
  }, [app.id]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const move = async (status: Status) => {
    setError(""); setBusy(true);
    const { data, error } = await supabase.from("applications").update({ status }).eq("id", app.id).select().single();
    setBusy(false);
    if (error || !data) setError("The status was not changed. Please try again."); else onChange(data as Application);
  };
  const addNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const body = String(new FormData(el).get("note") ?? "").trim();
    if (!body) return;
    setError("");
    const { data, error } = await supabase.from("application_notes").insert({ application_id: app.id, body }).select().single();
    if (error || !data) { setError("The note was not saved. Please try again."); return; }
    setNotes((list) => [...(list ?? []), data as Note]);
    el.reset();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <button type="button" onClick={onBack} className="text-[13px] text-ink/70 hover:text-ink"><span aria-hidden>←</span> All applications</button>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="display text-4xl sm:text-5xl">{person}</h1>
        <Chip tone={toneOf(app.status)}>{labels[app.status]}</Chip>
      </div>
      <p className="mt-3 text-[13px] text-ink/65">{nameOf(app)} · submitted {dayTime(app.submitted_at)} · account <a href={`mailto:${app.email}`} className="textlink">{app.email}</a></p>
      {error && <p className={`${warn} mt-5`} role="alert">{error}</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <dl className="grid gap-x-8 border-t border-rule sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className={`border-b border-rule py-3.5 ${r.wide ? "sm:col-span-2" : ""}`}>
                <dt className="text-[12px] font-semibold text-ink/60">{r.label}</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-[15px]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-lg border border-rule bg-white p-5">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold">Status</span>
              <select value={app.status} disabled={busy} onChange={(e) => void move(e.target.value as Status)} className={box}>
                {flow.map((s) => <option key={s} value={s}>{labels[s]}</option>)}
              </select>
            </label>
            <p className="mt-2 text-[12px] leading-snug text-ink/60">The applicant sees the stage in their account. No email is sent when it changes.</p>
            <a href={`mailto:${app.fields.email || app.email}?subject=${encodeURIComponent("Your Velero Capital application")}`} className="pill pill-blue pill-wide mt-4">Email {person.split(" ")[0]}</a>
          </div>

          <div className="rounded-lg border border-rule bg-white p-5">
            <h2 className="text-[13px] font-semibold">Internal notes</h2>
            <p className="mt-1 text-[12px] text-ink/60">Seen by admins only.</p>
            {notes === null ? <p className="mt-4 text-[13px] text-ink/60">Loading…</p> : (
              <ul className="mt-4 space-y-3">
                {notes.map((n) => (
                  <li key={n.id} className="border-l-2 border-blue/40 pl-3">
                    <p className="whitespace-pre-wrap break-words text-[14px]">{n.body}</p>
                    <p className="mt-1 text-[11px] text-ink/55">{n.author} · {dayTime(n.created_at)}</p>
                  </li>
                ))}
                {!notes.length && <li className="text-[13px] text-ink/55">No notes yet.</li>}
              </ul>
            )}
            <form onSubmit={addNote} className="mt-4">
              <textarea name="note" required rows={3} maxLength={4000} aria-label="New note" placeholder="Add a note…" className={`${box} resize-y`} />
              <button type="submit" className="pill pill-small mt-2">Add note</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Accounts({ people, apps }: { people: Profile[]; apps: Application[] }) {
  const sent = (id: string) => apps.filter((a) => a.user_id === id).length;
  if (!people.length) return <p className="rounded-lg border border-rule bg-white p-8 text-center text-[14px] text-ink/65">Nobody has signed up yet.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-rule bg-white">
      <table className="w-full min-w-[560px] text-left text-[14px]">
        <thead className="border-b border-rule text-[11px] uppercase tracking-[0.12em] text-ink/55">
          <tr><th className="px-4 py-3 font-semibold">Email</th><th className="px-4 py-3 font-semibold">Name</th><th className="px-4 py-3 font-semibold">Joined</th><th className="px-4 py-3 font-semibold">Submitted</th></tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id} className="border-b border-rule last:border-0">
              <td className="px-4 py-3"><a href={`mailto:${p.email}`} className="textlink">{p.email}</a></td>
              <td className="px-4 py-3 text-ink/80">{p.full_name ?? ""}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink/70">{day(p.created_at)}</td>
              <td className="px-4 py-3 text-ink/80">{sent(p.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Admins({ me, admins, onChange }: { me: string; admins: AdminRow[]; onChange: (list: AdminRow[]) => void }) {
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState("");
  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const email = String(new FormData(el).get("email") ?? "").trim().toLowerCase();
    setError("");
    if (admins.some((a) => a.email === email)) { setError("That address is already an admin."); return; }
    const { data, error } = await supabase.from("admins").insert({ email }).select().single();
    if (error || !data) { setError("That address was not added. Check it and try again."); return; }
    onChange([...admins, data as AdminRow]);
    el.reset();
  };
  const remove = async (email: string) => {
    setError("");
    const { error } = await supabase.from("admins").delete().eq("email", email);
    setRemoving("");
    if (error) setError("That address was not removed. Please try again."); else onChange(admins.filter((a) => a.email !== email));
  };
  return (
    <div className="max-w-2xl">
      <p className="text-[14px] leading-relaxed text-ink/80">Anyone on this list can read submitted applications, change their status and manage this list. They log in here with the same address, by email code or with Google.</p>
      {error && <p className={`${warn} mt-4`} role="alert">{error}</p>}
      <ul className="mt-5 divide-y divide-rule rounded-lg border border-rule bg-white">
        {admins.map((a) => (
          <li key={a.email} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="break-all text-[14px] font-medium">{a.email}{a.email === me && <span className="ml-2 text-[12px] font-normal text-ink/55">(you)</span>}</div>
              <div className="text-[12px] text-ink/55">Added {day(a.added_at)}{a.added_by ? ` by ${a.added_by}` : ""}</div>
            </div>
            {a.email !== me && (removing === a.email ? (
              <span className="flex gap-2">
                <button type="button" onClick={() => void remove(a.email)} className="pill pill-small pill-danger">Remove</button>
                <button type="button" onClick={() => setRemoving("")} className="pill pill-small">Keep</button>
              </span>
            ) : (
              <button type="button" onClick={() => setRemoving(a.email)} className="text-[13px] text-ink/60 underline-offset-4 hover:text-ink hover:underline">Remove</button>
            ))}
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-5 flex flex-wrap items-end gap-3">
        <label className="block min-w-0 flex-1">
          <span className="mb-1.5 block text-[13px] font-semibold">Add an admin</span>
          <input name="email" type="email" required autoComplete="off" placeholder="name@velero.capital" className={`${box} bg-white`} />
        </label>
        <button type="submit" className="pill pill-blue">Add</button>
      </form>
    </div>
  );
}
