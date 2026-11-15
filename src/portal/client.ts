import { useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import type { Answers, Goal, Role } from "@/components/EnquiryForm";
import { SIGNED_IN_KEY } from "@/lib/portal";

/**
 * Why a sign-in did not complete, when the visitor arrives back with a reason in the address (an expired
 * link, a cancelled Google sign-in). Read once, before the database client tidies the address.
 */
export const arrivalError = (() => {
  const from = (s: string) => new URLSearchParams(s).get("error_description");
  return from(location.hash.slice(1)) ?? from(location.search) ?? "";
})();

// The address and the publishable key are public by design: what a visitor may read or change is
// decided by the row-level rules in supabase/migrations, not by keeping this key hidden.
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_KEY as string, {
  // "implicit" lets a sign-in link opened in another browser or on another device still work.
  auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
});

export type Status = "draft" | "submitted" | "in_review" | "call_scheduled" | "closed";
export type Application = {
  id: string;
  user_id: string;
  email: string;
  role: Role;
  goal: Goal | null;
  fields: Answers;
  status: Status;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};
export type Note = { id: number; application_id: string; author: string; body: string; created_at: string };
export type Profile = { id: string; email: string; full_name: string | null; created_at: string };
export type Admin = { email: string; added_by: string | null; added_at: string };

/** What an applicant is told about each stage. */
export const stages: Record<Status, { label: string; text: string }> = {
  draft: { label: "Draft", text: "Not sent yet. You can come back and finish it at any time." },
  submitted: { label: "Received", text: "We have your application. Each one is reviewed for fit before a first conversation is arranged." },
  in_review: { label: "Under review", text: "The team is looking at the objective, your authority, the jurisdiction, the timing, the size and how ready the information is." },
  call_scheduled: { label: "Call arranged", text: "A first conversation covers the commercial objective, the timetable and the information needed for a proper review." },
  closed: { label: "Closed", text: "This application is closed. If your circumstances change, you are welcome to start a new one." },
};
/** The order an application moves through once it has been sent. */
export const flow: Status[] = ["submitted", "in_review", "call_scheduled", "closed"];

export const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");
export const dayTime = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "");

const remember = (on: boolean) => { try { if (on) localStorage.setItem(SIGNED_IN_KEY, "1"); else localStorage.removeItem(SIGNED_IN_KEY); } catch { /* storage may be blocked; the header then just says “Log in” */ } };

/** The current sign-in: `undefined` while it is still being read, `null` when nobody is signed in. */
export function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    supabase.auth.getSession().then(({ data }) => { if (live) { setSession(data.session); remember(!!data.session); } });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => { setSession(s); remember(!!s); });
    return () => { live = false; data.subscription.unsubscribe(); };
  }, []);
  return session;
}

export const signOut = async () => { await supabase.auth.signOut(); remember(false); };

/** Sets the tab title for a page of the account area. */
export function usePageTitle(title: string) {
  useEffect(() => { document.title = `${title} | Velero Capital`; }, [title]);
}
