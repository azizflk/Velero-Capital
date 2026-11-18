/** Small facts about the account area that the public site may read without loading any of it. */

/** The account area exists only where a database has been configured for the build. */
export const PORTAL_ON = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_KEY);

/** The admin panel answers only on its own address (admin.velero.capital, or admin.localhost while developing). */
export const isAdminHost = () => typeof location !== "undefined" && /^admin\./.test(location.hostname);

/** The signed-in address, kept on this browser while someone is signed in, so the header can show it instead of “Login”. */
export const SIGNED_IN_KEY = "velero-signed-in";

/**
 * Where to send someone once they have signed in: a path on this site taken from `?next=`, or the home page.
 * Anything that is not a plain local path (another site, "//host", a portal page that would loop) is ignored.
 */
export function nextPath(search: string): string {
  const want = new URLSearchParams(search).get("next") ?? "";
  return /^\/(?![/\\])/.test(want) && !/^\/login(\/|$|\?)/.test(want) ? want : "/";
}

/** The login page, set to bring the visitor back to `to` afterwards. */
export const loginFor = (to: string) => (to === "/" ? "/login/" : `/login/?next=${encodeURIComponent(to)}`);

/** Addresses that belong to the account area and the admin panel rather than to the public pages. */
export const isPortalPath = (pathname: string) => /^\/(login|account|admin)(\/|$)/.test(pathname);

/** Where every “apply” link goes: the login page, then the application. Without accounts, the contact page. */
export const APPLY_HREF = PORTAL_ON ? loginFor("/account/") : "/contact-us/";

/**
 * A link straight into a new application from a service page: a founder who wants advisory services,
 * with the service already chosen when there is one. Signed out, it goes through the login page first.
 * Without accounts, the contact page.
 */
export const applyForService = (service?: string) =>
  PORTAL_ON ? `/account/apply/?for=services${service ? `&service=${encodeURIComponent(service)}` : ""}` : "/contact-us/";
