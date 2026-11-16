// Prerenders every page of the site to static HTML, after `vite build`.
//
// The site is a single-page React app. Without this step every address serves the same empty shell, and a
// crawler that does not run JavaScript (most AI crawlers, link previews) sees no content, one title and one
// canonical URL for the whole site. This script renders each route on the server and writes
// dist/<route>/index.html with that page's own content, title, description, canonical URL, social tags and
// structured data. The browser then hydrates the same markup.
//
// It also writes, from the same route table and site data:
//   dist/404.html        the not-found page (served with a 404 status)
//   dist/app.html        the bare shell, for the walkthrough film, which is client-only
//   dist/sitemap.xml     every prerendered address
//   dist/llms.txt        a short map of the site for language models
//   dist/llms-full.txt   the full text of every page, as plain markdown
//
//   npm run build   (runs: tsc, vite build, vite build --ssr, then this file)
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const ORIGIN = "https://velero.capital";
const { render, routes, data } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);
const template = await readFile(`${DIST}/index.html`, "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("dist/index.html has no empty #root: was it already prerendered?");

const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Replacement text goes through a function, so a "$" in the copy ("$350M+") is never read as a pattern.
const swap = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`template is missing ${pattern}`);
  return html.replace(pattern, () => value);
};

function document(url, { shell = false } = {}) {
  const { html, head } = render(url);
  if (!head) throw new Error(`${url}: the page set no head (useTitle)`);
  let out = template;
  out = swap(out, /<title>[^<]*<\/title>/, `<title>${attr(head.title)}</title>`);
  for (const sel of ['name="description"', 'property="og:title"', 'property="og:description"', 'name="twitter:title"', 'name="twitter:description"']) {
    const value = sel.includes("title") ? head.title : head.description;
    out = swap(out, new RegExp(`<meta ${sel} content="[^"]*" />`), `<meta ${sel} content="${attr(value)}" />`);
  }
  if (head.noindex) {
    out = swap(out, /\s*<link rel="canonical" href="[^"]*" \/>/, "");
    out = swap(out, /\s*<meta property="og:url" content="[^"]*" \/>/, "");
  } else {
    out = swap(out, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${attr(head.canonical)}" />`);
    out = swap(out, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${attr(head.canonical)}" />`);
  }
  const extra = [
    head.noindex ? '<meta name="robots" content="noindex, follow" />' : "",
    `<script type="application/ld+json" data-page-ld>${JSON.stringify(head.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].filter(Boolean).join("\n    ");
  out = swap(out, /<\/head>/, `  ${extra}\n  </head>`);
  out = swap(out, /<div id="root"><\/div>/, shell ? '<div id="root"></div>' : `<div id="root" data-path="${attr(url)}">${html}</div>`);
  return { out, html, head };
}

/** The readable text of a rendered page as markdown: headings, paragraphs, lists and links; no chrome, art or forms. */
function toMarkdown(html) {
  const main = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"));
  const SKIP = new Set(["svg", "form", "script", "style", "noscript", "img", "input", "select", "textarea"]);
  const VOID = new Set(["img", "input", "br", "hr", "meta", "link", "wbr"]);
  const BLOCK = new Set(["p", "div", "section", "header", "footer", "li", "ul", "ol", "h1", "h2", "h3", "h4", "blockquote", "aside", "nav", "article", "tr"]);
  const lines = [];
  let cur = "";
  let skip = 0;            // depth inside something not worth reading
  const stack = [];        // open tags: { name, skipped, href }
  const flush = (prefix = "") => { const t = cur.replace(/\s+/g, " ").trim(); if (t) lines.push(prefix + t); cur = ""; };
  const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&nbsp;/g, " ");
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z0-9]+)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(main))) {
    if (m[4] !== undefined) { if (!skip) cur += decode(m[4]); continue; }
    if (!m[2]) continue;
    const name = m[2].toLowerCase(), attrs = m[3] || "", closing = m[1] === "/";
    if (!closing) {
      const selfClosed = VOID.has(name) || attrs.trimEnd().endsWith("/");
      const hide = SKIP.has(name) || /aria-hidden="true"/.test(attrs) || /aria-label="(On this page|Breadcrumb)"/.test(attrs);
      if (selfClosed) { if (name === "br" && !skip) cur += " "; continue; }
      if (!skip && BLOCK.has(name)) flush();
      const href = name === "a" ? (attrs.match(/href="([^"]*)"/) || [])[1] : undefined;
      stack.push({ name, skipped: hide, href, at: cur.length });
      if (hide) skip++;
    } else {
      const open = stack.pop();
      if (!open) continue;
      if (open.skipped) { skip--; continue; }
      if (skip) continue;
      if (name === "a" && open.href && !open.href.startsWith("#") && !open.href.startsWith("mailto:")) {
        const text = cur.slice(open.at).replace(/\s+/g, " ").trim();
        const url = open.href.startsWith("/") ? ORIGIN + open.href : open.href;
        if (text) cur = `${cur.slice(0, open.at)}[${text}](${url}) `;
      }
      if (/^h[1-4]$/.test(name)) { flush(`${"#".repeat(Number(name[1]))} `); lines.push(""); }
      else if (name === "li") flush("- ");
      else if (name === "button") { flush("**"); if (lines.length && lines.at(-1).startsWith("**")) lines[lines.length - 1] += "**"; }
      else if (BLOCK.has(name)) { flush(); if (name === "p" || name === "ul" || name === "ol" || name === "section") lines.push(""); }
    }
  }
  flush();
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// --- pages -------------------------------------------------------------------------------------------------
const pages = [];
for (const url of routes) {
  const { out, html, head } = document(url);
  const file = url === "/" ? `${DIST}/index.html` : `${DIST}${url}index.html`;
  await mkdir(path.dirname(file), { recursive: true });
  pages.push({ url, file, out, html, head });
}

// Checks that would otherwise only show up in a search console weeks later.
const problems = [];
const seen = { title: new Map(), description: new Map() };
for (const p of pages) {
  const h1 = (p.html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${p.url}: ${h1} <h1> elements`);
  for (const k of ["title", "description"]) {
    if (seen[k].has(p.head[k])) problems.push(`${p.url}: same ${k} as ${seen[k].get(p.head[k])}`);
    seen[k].set(p.head[k], p.url);
  }
  if (p.head.description.length < 70) problems.push(`${p.url}: description is only ${p.head.description.length} characters`);
  if (/<img(?![^>]*\salt=)[^>]*>/.test(p.html)) problems.push(`${p.url}: an image without alt text`);
}
if (problems.length) { console.error(`✗ prerender checks failed:\n  ${problems.join("\n  ")}`); process.exit(1); }

// The bare shell first (it needs the untouched template), then the pages over it.
const shell = template.replace("</head>", '  <meta name="robots" content="noindex, follow" />\n  </head>');
await writeFile(`${DIST}/app.html`, shell);
for (const p of pages) await writeFile(p.file, p.out);
await writeFile(`${DIST}/404.html`, document("/404/").out);

// --- sitemap -----------------------------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
await writeFile(`${DIST}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);

// --- llms.txt ----------------------------------------------------------------------------------------------
const { investments, services, groups, faqGroups, offices, social, stats, STATS_ASOF, CONTACT_EMAIL } = data;
const link = (title, p, note) => `- [${title}](${ORIGIN}${p})${note ? `: ${note}` : ""}`;
const firstSentence = (s) => (s.match(/^.*?[.!?](?=\s|$)/) || [s])[0];
const figure = (s) => `${s.prefix}${s.value.toLocaleString("en-US")}${s.suffix}`;
const llms = `# Velero Capital

> Velero Capital is an independent private-markets investment-access and advisory firm headquartered in Dubai, with an office in San Francisco. It connects family offices and institutional investors with select private-market opportunities across late-stage companies, secondary transactions and real estate, and advises founders, companies and sponsors on fundraising, M&A and corporate finance. Tagline: "Access is the edge."

Key facts, as stated on ${ORIGIN.replace("https://", "")}:

- What it is: an investment-access and advisory firm. Velero Capital does not manage a fund or invest its own balance sheet. Its role is to source, review and structure opportunities for eligible investors, and to advise companies on their own transactions.
- Who it works with: family offices, institutional investors, fund managers and other professional, qualified or accredited investors; and founders, companies, shareholders and real estate sponsors.
- How opportunities are shared: individually, with eligible investors whose mandate they fit, after review. There is no platform or public listing. Access and allocation are never guaranteed, and nothing on the website is an offer or solicitation.
- Offices: ${offices.map((o) => o.address).join("; ")}.
- Contact: ${CONTACT_EMAIL}, or the form at ${ORIGIN}/contact-us/
- Official email domain: velero.capital. An address can be checked at ${ORIGIN}/verification/
${social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

Firm figures (as of ${STATS_ASOF}):

${stats.map((s) => `- ${s.title}: ${figure(s)} (${s.note})`).join("\n")}

## Investment strategies

${link("Investment strategies overview", "/capital/", "the three strategies and how a transaction runs")}
${investments.map((i) => link(i.label, i.path, i.summary)).join("\n")}
${link("Investor Access", "/investor-access/", "the staged process for investors, from enquiry and eligibility to transaction engagement")}
${link("Portfolio", "/portfolio/", "where the firm works and the investor landscape it operates in")}

## Advisory services

${link("Services overview", "/services/", "corporate finance and cross-border advisory")}
${services.map((s) => link(s.title, s.path, firstSentence(s.text))).join("\n")}

## Sectors

${link("Solutions overview", "/solutions/", `the ${groups.reduce((n, g) => n + g.sectors.length, 0)} sectors the firm serves, in ${groups.length} groups`)}
${groups.map((g) => `\n### ${g.title}\n\n${g.sectors.map((s) => link(s.title, s.path, s.tagline)).join("\n")}`).join("\n")}

## Company

${link("About Velero Capital", "/company/", "who the firm is, what the name means, its values and what sets it apart")}
${link("FAQ", "/faq/", "frequently asked questions about what the firm does and does not do, investing, submitting and applying")}
${link("Submit an Opportunity", "/submit-an-opportunity/", "how companies, shareholders, sponsors and intermediaries introduce a transaction")}
${link("Contact", "/contact-us/", "enquiry form for investors, founders and sponsors")}
${link("Account Verification", "/verification/", "check whether an email address is officially Velero Capital's")}
${link("Legal & Disclosures", "/legal/", "no offer, eligibility, risk, access and allocations")}
${link("Privacy Policy", "/privacy/", "personal data and cookies")}

## Frequently asked questions

${link("All questions", "/faq/", "the full FAQ, grouped by audience")}

${faqGroups.map((g) => `### ${g.title}\n\n${g.items.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}`).join("\n\n")}

## Optional

- [Full text of every page](${ORIGIN}/llms-full.txt): the complete site as plain markdown
- [Sitemap](${ORIGIN}/sitemap.xml)
`;
await writeFile(`${DIST}/llms.txt`, llms);

const full = `# Velero Capital: full site text

> The complete text of ${ORIGIN.replace("https://", "")}, page by page, generated from the live pages on ${today}. A shorter map of the site is at ${ORIGIN}/llms.txt

${pages.map((p) => `---\n\nSource: ${ORIGIN}${p.url}\nTitle: ${p.head.title}\nSummary: ${p.head.description}\n\n${toMarkdown(p.html)}`).join("\n\n")}
`;
await writeFile(`${DIST}/llms-full.txt`, full);

await rm("dist-ssr", { recursive: true, force: true });
console.log(`✓ prerendered ${pages.length} pages, 404.html, app.html, sitemap.xml, llms.txt (${(llms.length / 1024).toFixed(1)} KB), llms-full.txt (${(full.length / 1024).toFixed(0)} KB)`);
