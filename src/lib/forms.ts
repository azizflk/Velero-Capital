import { CONTACT_EMAIL } from "@/data/site";

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export type SubmitResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; error: string };

/** Posts to VITE_FORM_ENDPOINT when configured, otherwise opens a prefilled email. */
export async function submitForm(subject: string, fields: Record<string, string>): Promise<SubmitResult> {
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ subject, ...fields }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { ok: true, via: "endpoint" };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Something went wrong" };
    }
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: "mailto" };
}
