import { CONTACT_EMAIL } from "@/data/site";

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
// Web3Forms access key (free tier, delivers to the address the key was issued for).
// The key is designed to be public, so it can live in the client bundle.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export type SubmitResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; error: string };

async function post(url: string, payload: Record<string, string>): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (data && data.success === false) throw new Error(data.message || "Request was rejected");
    return { ok: true, via: "endpoint" };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong" };
  }
}

/**
 * Delivery order: Web3Forms (VITE_WEB3FORMS_KEY) → generic JSON endpoint (VITE_FORM_ENDPOINT)
 * → prefilled email in the visitor's mail client.
 */
export async function submitForm(subject: string, fields: Record<string, string>): Promise<SubmitResult> {
  if (WEB3FORMS_KEY) {
    return post("https://api.web3forms.com/submit", {
      access_key: WEB3FORMS_KEY,
      subject,
      from_name: "Velero Capital website",
      ...fields,
    });
  }
  if (ENDPOINT) return post(ENDPOINT, { subject, ...fields });

  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: "mailto" };
}
