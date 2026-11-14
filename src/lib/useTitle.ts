import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ORIGIN = "https://velero.capital";
export const ORG_ID = `${ORIGIN}/#organization`;
export const SITE_ID = `${ORIGIN}/#website`;
export const HOME_TITLE = "Velero Capital | Private-Market Investment Access & Advisory";
export const DEFAULT_DESCRIPTION = "Velero Capital connects family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions, and real estate.";

export type Crumb = { name: string; path: string };
export type HeadOptions = {
  /** the whole <title>, when the short page name alone says too little to a search engine */
  full?: string;
  /** the trail above this page, without Home and without the page itself */
  crumbs?: Crumb[];
  /** extra schema.org nodes for this page (Service, FAQPage …) */
  jsonLd?: object[];
  /** schema.org type of the page node */
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  noindex?: boolean;
};
export type Head = { title: string; description: string; canonical: string; jsonLd: object; noindex: boolean };

/** While the site is prerendered, the page being rendered leaves its head here for the build script. */
export const collected: { head: Head | null } = { head: null };

/** Meta descriptions are cut by search engines near 160 characters; end on a whole word instead. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}

function buildHead(name: string, description: string | undefined, pathname: string, o: HeadOptions): Head {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const canonical = ORIGIN + path;
  const home = name === "Home";
  const title = o.full ?? (home ? HOME_TITLE : `${name} | Velero Capital`);
  const desc = clip(description || DEFAULT_DESCRIPTION);
  const trail: Crumb[] = home ? [] : [{ name: "Home", path: "/" }, ...(o.crumbs ?? []), { name, path }];
  const graph: object[] = [
    {
      "@type": o.pageType ?? "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: desc,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      ...(trail.length ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } } : {}),
    },
  ];
  if (trail.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: ORIGIN + c.path })),
    });
  }
  graph.push(...(o.jsonLd ?? []));
  return { title, description: desc, canonical, jsonLd: { "@context": "https://schema.org", "@graph": graph }, noindex: !!o.noindex };
}

function meta(selector: string, create: () => HTMLMetaElement) {
  let m = document.querySelector<HTMLMetaElement>(selector);
  if (!m) { m = create(); document.head.appendChild(m); }
  return m;
}
const named = (name: string) => meta(`meta[name="${name}"]`, () => Object.assign(document.createElement("meta"), { name }));
const property = (p: string) => meta(`meta[property="${p}"]`, () => { const m = document.createElement("meta"); m.setAttribute("property", p); return m; });

function applyHead(h: Head) {
  document.title = h.title;
  named("description").content = h.description;
  let c = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
  c.href = h.canonical;
  property("og:url").content = h.canonical;
  property("og:title").content = h.title;
  property("og:description").content = h.description;
  named("twitter:title").content = h.title;
  named("twitter:description").content = h.description;
  const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (h.noindex) named("robots").content = "noindex, follow";
  else robots?.remove();
  let ld = document.querySelector<HTMLScriptElement>("script[data-page-ld]");
  if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page-ld", ""); document.head.appendChild(ld); }
  ld.textContent = JSON.stringify(h.jsonLd);
}

/**
 * Sets the document title, meta description, canonical URL, social tags and structured data for the current page.
 * In the browser it updates the head on navigation; during prerender it hands the same head to the build script,
 * which writes it into the static HTML of that page.
 */
export function useTitle(title: string, description?: string, options: HeadOptions = {}) {
  const { pathname } = useLocation();
  const head = buildHead(title, description, pathname, options);
  if (typeof document === "undefined") collected.head = head;
  const key = JSON.stringify(head);
  useEffect(() => { applyHead(JSON.parse(key) as Head); }, [key]);
}

/** schema.org helpers shared by the pages. */
export const faqPage = (path: string, items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${ORIGIN}${path}#faq`,
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceNode = (s: { path: string; name: string; description: string; serviceType: string; audience?: string; offers?: string[] }) => ({
  "@type": "Service",
  "@id": `${ORIGIN}${s.path}#service`,
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  url: ORIGIN + s.path,
  provider: { "@id": ORG_ID },
  ...(s.audience ? { audience: { "@type": "Audience", audienceType: s.audience } } : {}),
  ...(s.offers?.length ? { hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })) } } : {}),
});
