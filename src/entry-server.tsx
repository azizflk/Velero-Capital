import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { collected, type Head } from "./lib/useTitle";
import { investments, process } from "./data/investments";
import { services } from "./data/services";
import { groups, sectors, commonFaqs } from "./data/solutions";
import { CONTACT_EMAIL, STATS_ASOF, faqGroups, faqs, offices, social, stats } from "./data/site";

/** Every address that is prerendered and listed in the sitemap. */
export const routes: string[] = [
  "/",
  "/capital/",
  ...investments.map((i) => i.path),
  "/investor-access/",
  "/submit-an-opportunity/",
  "/services/",
  ...services.map((s) => s.path),
  "/solutions/",
  ...sectors.map((s) => s.path),
  "/portfolio/",
  "/company/",
  "/faq/",
  "/contact-us/",
  "/verification/",
  "/privacy/",
  "/legal/",
];

export function render(url: string): { html: string; head: Head | null } {
  collected.head = null;
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: collected.head };
}

/** Site data, for the files written for language models (llms.txt). */
export const data = { investments, process, services, groups, sectors, commonFaqs, faqGroups, faqs, offices, social, stats, STATS_ASOF, CONTACT_EMAIL };
