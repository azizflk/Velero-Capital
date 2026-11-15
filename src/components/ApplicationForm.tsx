import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/data/site";
import { submitForm } from "@/lib/forms";
import { Confirmations, GoalPick, Questions, RolePick, about, chosen, collect, type Goal, type Role } from "./EnquiryForm";

/**
 * The public application form, usable without an account: the profile choice, the questions for it,
 * the confirmations and the send. Delivered by email exactly as the contact page always has.
 * `role`, `goal` and `service` pre-select answers (from a link such as /contact-us/?role=investor).
 */
export default function ApplicationForm({ role: role0 = null, goal: goal0 = null, service = "", submitLabel = "Submit application" }: { role?: Role | null; goal?: Goal | null; service?: string; submitLabel?: string }) {
  const [role, setRole] = useState<Role | null>(role0);
  const [goal, setGoal] = useState<Goal | null>(goal0);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // A new link can arrive while the page is already open; follow it.
  useEffect(() => { if (role0) setRole(role0); }, [role0]);
  useEffect(() => { if (goal0) setGoal(goal0); }, [goal0]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (new FormData(e.currentTarget).get("website")) return; // filled only by bots
    const fields = collect(e.currentTarget);
    setState("sending");
    const r = await submitForm(`Website enquiry: ${about(role, goal)}`, fields);
    setState(r.ok ? "sent" : "error");
  };

  if (state === "sent") {
    return (
      <div className="rounded-md border border-rule bg-white/70 p-6 text-[15px]" role="status">
        <strong>Thank you.</strong> We have your application and will come back to you once we have reviewed it.
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <RolePick value={role} onChange={setRole} />
      {role === "founder" && <GoalPick value={goal} onChange={setGoal} />}
      <Questions role={role} goal={goal} values={service ? { service } : undefined} />
      {chosen(role, goal) && (
        <>
          <Confirmations role={role} />
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button type="submit" disabled={state === "sending"} className="pill pill-blue">{state === "sending" ? "Sending…" : submitLabel}</button>
            {state === "error" && <span className="text-[13px] text-red-700">That didn’t send. Please email {CONTACT_EMAIL}.</span>}
          </div>
        </>
      )}
    </form>
  );
}
