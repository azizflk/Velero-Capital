import { Link } from "react-router-dom";
import { SidebarPage, Section, Prose, List } from "@/components/Layout";
import { CONTACT_EMAIL } from "@/data/site";
import { useTitle } from "@/lib/useTitle";

/**
 * Important information and disclosures.
 *
 * LEGAL REVIEW REQUIRED. This page states only what is true of the website itself (nothing here is an offer, eligibility
 * is assessed case by case, no outcome is promised). It deliberately makes no statement about licences, registrations or
 * regulatory status, because none has been confirmed. Corporate identification (legal entity, registration number,
 * registered address, jurisdiction) is to be added once confirmed. Have qualified counsel in each relevant jurisdiction
 * review and complete this page before relying on it.
 */
const anchors = [
  { id: "no-offer", label: "No offer or solicitation" },
  { id: "eligibility", label: "Eligibility" },
  { id: "no-advice", label: "No advice" },
  { id: "risk", label: "Risk" },
  { id: "access", label: "Access and allocations" },
  { id: "statements", label: "Statements and figures" },
  { id: "third-parties", label: "Third parties" },
  { id: "identity", label: "Corporate identification" },
  { id: "contact", label: "Contact" },
];

export default function Legal() {
  useTitle("Legal & Disclosures", "Important information about this website, eligibility, risk and the basis on which Velero Capital shares private-market opportunities.");
  return (
    <SidebarPage title="Legal & disclosures" intro="Important information about this website and the basis on which Velero Capital works with investors, companies and counterparties. Please read it before using the site or contacting us." anchors={anchors}>
      <Section id="no-offer" title="No offer or solicitation">
        <Prose>
          <p>Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security, interest or other financial product, in any jurisdiction. Any opportunity that Velero Capital may share is made available only to eligible persons, on a case-by-case basis, through separate documentation that sets out its terms, and only where it is lawful to do so.</p>
          <p>The information on this website is general in nature. It is not directed at any person in a jurisdiction where its publication or availability would be contrary to local law or regulation.</p>
        </Prose>
      </Section>

      <Section id="eligibility" title="Eligibility">
        <Prose>
          <p>Velero Capital works with family offices, institutional investors and other professional, qualified or accredited investors as defined in the laws of their own jurisdiction. Private-market investments are not suitable for everyone, and we assess eligibility before any opportunity is shared.</p>
          <p>Submitting an enquiry does not make you a client of Velero Capital and does not create any obligation on either side.</p>
        </Prose>
      </Section>

      <Section id="no-advice" title="No advice">
        <Prose>
          <p>This website does not provide investment, legal, tax or accounting advice, and nothing on it should be relied upon as a recommendation to make, hold or dispose of any investment. You should take your own professional advice before making any investment decision.</p>
        </Prose>
      </Section>

      <Section id="risk" title="Risk">
        <Prose className="mb-6"><p>Investments in private companies, secondary interests and real estate carry significant risk, including:</p></Prose>
        <List items={[
          "The possible loss of all capital invested",
          "Illiquidity: there may be no market for an interest, and transfer may be restricted or require consent",
          "Limited information, and reliance on the company, sponsor or counterparty for reporting",
          "Valuation uncertainty, including the risk that a later round or sale is at a lower price",
          "Currency, legal, tax and jurisdictional risk in cross-border transactions",
          "The risk that an expected liquidity event, such as an IPO or sale, does not occur",
        ]} />
        <Prose className="mt-6"><p>Past activity is not a guide to future outcomes. No return, timing or outcome is promised.</p></Prose>
      </Section>

      <Section id="access" title="Access and allocations">
        <Prose>
          <p>Velero Capital does not guarantee access to any opportunity, allocation in any transaction, or a particular price or timing. Opportunities depend on counterparties, availability and the outcome of our review, and may be withdrawn at any time.</p>
        </Prose>
      </Section>

      <Section id="statements" title="Statements and figures">
        <Prose>
          <p>Figures on this website describing capital raised, placed or advised, and the size of our investor network, are stated by the firm from its own records as at the date shown with them. They are unaudited, aggregate several kinds of activity, and are not a measure of investment performance.</p>
          <p>Sector pages describe the kinds of mandate we take on and are written in general terms. Where an example is described as illustrative, it is not a record of a completed transaction.</p>
        </Prose>
      </Section>

      <Section id="third-parties" title="Third parties">
        <Prose>
          <p>Names and logos of investment firms shown on this website identify lead investors active in the markets we describe. They are the property of their owners and do not indicate any partnership, endorsement, sponsorship or affiliation with Velero Capital, nor that those firms have participated in any transaction with us.</p>
          <p>Links to third-party websites are provided for convenience. We are not responsible for their content.</p>
        </Prose>
      </Section>

      <Section id="identity" title="Corporate identification">
        <Prose>
          <p>Velero Capital operates from offices in Dubai, San Francisco, Los Angeles and Berlin. Details of the legal entities through which it contracts, their registration numbers and registered addresses, are provided in engagement and transaction documentation and are available on request.</p>
        </Prose>
      </Section>

      <Section id="contact" title="Contact">
        <Prose>
          <p>Questions about this information, or about how your personal data is handled, can be sent to <a href={`mailto:${CONTACT_EMAIL}`} className="textlink">{CONTACT_EMAIL}</a>. Our <Link to="/privacy/" className="textlink">privacy policy</Link> explains what we collect and why. To check that an email address is genuinely ours, use <Link to="/verification/" className="textlink">account verification</Link>.</p>
        </Prose>
      </Section>
    </SidebarPage>
  );
}
