import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/data/site";
import { DELIVERS, submitForm } from "@/lib/forms";
import { PORTAL_ON } from "@/lib/portal";
import { box } from "./EnquiryForm";

/** The topics a general enquiry can have. The database accepts exactly these. */
export const TOPICS = ["General question", "Partnership or introduction", "Press or media", "Other"] as const;

/**
 * A short general enquiry, for anything that is not an application: name, email, topic and a message.
 * It is stored for the admin panel and, where a delivery service is set up, also emailed to the team.
 * The database code loads only when the form is sent.
 */
export default function MessageForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // filled only by bots
    const msg = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      organisation: String(data.get("organisation") ?? "").trim() || null,
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    };
    setState("sending"); setError("");
    let stored = false, mailed = false;
    if (PORTAL_ON) {
      try {
        const { supabase } = await import("@/portal/client");
        const { error } = await supabase.from("enquiries").insert(msg);
        if (error) setError(error.message.includes("Too many") || error.message.includes("too many") ? error.message : "");
        stored = !error;
      } catch { stored = false; }
    }
    if (DELIVERS) {
      const r = await submitForm(`Website message: ${msg.topic}`, { name: msg.name, email: msg.email, organisation: msg.organisation ?? "", topic: msg.topic, message: msg.message });
      mailed = r.ok;
    }
    setState(stored || mailed ? "sent" : "error");
  };

  if (state === "sent") {
    return (
      <div className="rounded-md border border-rule bg-white/70 p-6 text-[15px]" role="status">
        <strong>Thank you.</strong> We have your message and will reply by email.
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">Name</span>
        <input name="name" required maxLength={200} autoComplete="name" className={box} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">Email</span>
        <input name="email" type="email" required maxLength={320} autoComplete="email" className={box} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">Organisation<span className="ml-1.5 font-normal text-ink/50">(optional)</span></span>
        <input name="organisation" maxLength={200} autoComplete="organization" className={box} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">Topic</span>
        <select name="topic" required defaultValue="" className={box}>
          <option value="" disabled>Select a topic…</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-[13px] font-semibold">Message</span>
        <textarea name="message" required rows={6} maxLength={5000} className={`${box} resize-y`} placeholder="How can we help?" />
      </label>
      <label className="flex items-start gap-3 text-[13px] sm:col-span-2">
        <input type="checkbox" name="confirm_privacy" value="yes" required className="mt-0.5 h-4 w-4 accent-[#023ccf]" />
        <span>I agree to the <Link to="/privacy/" className="textlink">privacy policy</Link>.</span>
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="pill pill-blue">{state === "sending" ? "Sending…" : "Send message"}</button>
        {state === "error" && <span className="text-[13px] text-red-700" role="alert">{error || `That didn’t send. Please email ${CONTACT_EMAIL}.`}</span>}
      </div>
    </form>
  );
}
