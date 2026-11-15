/** Small facts about the account area that the public site may read without loading any of it. */

/** The account area exists only where a database has been configured for the build. */
export const PORTAL_ON = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_KEY);

/** The admin panel answers only on its own address (admin.velero.capital, or admin.localhost while developing). */
export const isAdminHost = () => typeof location !== "undefined" && /^admin\./.test(location.hostname);

/** Set while someone is signed in on this browser, so the header can say “My account” instead of “Log in”. */
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
