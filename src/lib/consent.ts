/** Cookie consent. Nothing optional may load until the visitor has chosen. */
export type Consent = { analytics: boolean; media: boolean; decidedAt: string };

const KEY = "velero.consent.v1";
const EVENT = "velero:consent";
const OPEN = "velero:consent-open";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function setConsent(c: { analytics: boolean; media: boolean }) {
  const value: Consent = { ...c, decidedAt: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(value)); } catch { /* storage unavailable: choice lasts for this page view only */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/** Gate for optional scripts: `if (allowed("analytics")) loadAnalytics()`. */
export function allowed(category: "analytics" | "media"): boolean {
  return getConsent()?.[category] === true;
}

export function onConsentChange(fn: (c: Consent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export function openCookieSettings() { window.dispatchEvent(new Event(OPEN)); }
export function onOpenCookieSettings(fn: () => void) {
  window.addEventListener(OPEN, fn);
  return () => window.removeEventListener(OPEN, fn);
}
