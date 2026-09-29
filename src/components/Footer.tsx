import { Link } from "react-router-dom";
import { CONTACT_EMAIL, offices, social } from "@/data/site";

const cols = [
  {
    title: "Web3",
    links: [
      { label: "Overview", to: "/web3-services/" },
      { label: "OTC Investment", to: "/otc-investment/" },
      { label: "Strategic Investments", to: "/strategic-investments/" },
      { label: "Tech", to: "/tech-investments-part/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about-us/" },
      { label: "Team", to: "/team/" },
      { label: "Account Verification", to: "/verification/" },
      { label: "Contact Us", to: "/contact-us/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink">
      <div className="container-x py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src="/images/logo.png" alt="Velero Capital" className="h-12 w-auto" />
            <p className="mt-4 text-sm text-muted">Guiding Bold Ideas to Safe Harbours</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm text-white/80 hover:text-cyan">{CONTACT_EMAIL}</a>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <h3 className="mb-4 text-sm font-medium">{c.title}</h3>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="text-sm text-muted hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-medium">Follow us</h3>
            <ul className="space-y-2">
              {social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 lg:col-span-2">
            {offices.map((o) => (
              <div key={o.region}>
                <h3 className="mb-2 text-sm font-medium">{o.region}</h3>
                <p className="text-sm text-muted">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>©{new Date().getFullYear()} Velero Capital. All rights reserved.</span>
          <span>*Cumulative figures across partner deals.</span>
        </div>
      </div>
    </footer>
  );
}
