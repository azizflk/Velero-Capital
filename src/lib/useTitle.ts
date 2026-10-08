import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ORIGIN = "https://velero.capital";

/** Sets the document title, meta description and canonical URL for the current page. */
export function useTitle(title: string, description?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    let c = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
    c.href = ORIGIN + (path === "/" ? "/" : path);
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (og) og.content = c.href;
    document.title = title === "Home" ? "Velero Capital | Access is the edge." : `${title} | Velero Capital`;
    if (description) {
      let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
      m.content = description;
    }
  }, [title, description, pathname]);
}
