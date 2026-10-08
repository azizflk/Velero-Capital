import { Link } from "react-router-dom";
import { SidebarPage, Section, Cols, Prose, List } from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "who", label: "Who this is for" },
  { id: "include", label: "What to include" },
  { id: "screening", label: "Screening" },
  { id: "engagement", label: "Engagement" },
  { id: "start", label: "Start" },
];

export default function SubmitOpportunity() {
  useTitle("Submit an Opportunity", "How companies, shareholders, real estate sponsors and intermediaries introduce an opportunity to Velero Capital: what to include, how we screen it, and how an engagement is agreed.");
  return (
    <SidebarPage title="Submit an opportunity: for companies, shareholders and sponsors" intro="If you are raising capital, selling a position or bringing a transaction to market, this is how to introduce it to us. We review every submission; we take on only those that fit our strategies and our investors’ mandates." anchors={anchors}>
      <Section id="who" title="Who this is for">
        <Cols cols={2} items={[
          { title: "Companies raising capital", text: "Established private companies planning a late-stage or pre-IPO round, or a structured liquidity programme for existing holders." },
          { title: "Shareholders seeking liquidity", text: "Founders, employees, early investors and limited partners who hold a position in a private company or fund and want to sell some or all of it." },
          { title: "Real estate sponsors", text: "Developers, operators and owners with a single asset, a portfolio or a joint venture that needs equity or a recapitalisation." },
          { title: "Intermediaries", text: "Advisers, placement agents and introducers acting with the written authority of a principal." },
        ]} />
      </Section>

      <Section id="include" title="What to include">
        <Prose className="mb-6"><p>A short summary is enough to start. The more of the following you can give us, the faster the first review.</p></Prose>
        <List items={[
          "What the opportunity is: a primary round, a secondary block, a real estate transaction or a fund interest",
          "The company or asset, its stage or status, and where it is based",
          "The size sought and the timing you are working to",
          "The information available now: a summary, historical financials, a model, a data room",
          "Your role and your authority to introduce it",
          "Any restrictions on transfer, consents required or confidentiality already in place",
        ]} />
        <Prose className="mt-6 text-[13px]"><p>Please do not send confidential documents through the website. Once we have agreed confidentiality terms we will tell you how to share them.</p></Prose>
      </Section>

      <Section id="screening" title="Screening">
        <Prose className="mb-6"><p>Each submission is reviewed by a senior member of the team against a short set of questions:</p></Prose>
        <Cols cols={2} items={[
          { title: "Fit", text: "Does it sit within late-stage and pre-IPO, secondaries or institutional real estate, and does it match a mandate among our investors?" },
          { title: "Counterparties", text: "Who is the company, sponsor or seller, who else is involved, and is the authority to transact clear?" },
          { title: "Information", text: "Is there enough reliable information to review it properly, and is it available on acceptable terms?" },
          { title: "Terms and timing", text: "Are the proposed terms and timetable realistic for the investors who would consider it?" },
        ]} />
        <Prose className="mt-6 text-[13px]"><p>We decline most of what we see, and we say so promptly. A decline is not a judgement on the business, only on fit with what we do.</p></Prose>
      </Section>

      <Section id="engagement" title="Engagement">
        <Prose>
          <p>Where an opportunity passes screening, the next step is a conversation and, usually, a non-disclosure agreement. If we go on to work together, the scope, responsibilities and commercial terms are set out in writing before any work starts or any investor is approached. Nothing on this website, and no submission through it, creates an engagement or an obligation on either side.</p>
          <p>Companies looking for advisory support rather than an introduction to investors can read about our <Link to="/services/" className="textlink">services</Link>.</p>
        </Prose>
      </Section>

      <Section id="start" title="Start">
        <Prose><p>Introduce the opportunity in a few lines. We come back to every submission.</p></Prose>
        <div className="mt-6 flex flex-wrap gap-3"><Button to="/contact-us/?role=sponsor" variant="blue">Submit an opportunity</Button><Button to="/contact-us/?role=founder&goal=raise">I’m a founder raising capital</Button></div>
      </Section>
    </SidebarPage>
  );
}
