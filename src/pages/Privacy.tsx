import { SidebarPage, Section, Prose, List } from "@/components/Layout";
import { CONTACT_EMAIL } from "@/data/site";
import { openCookieSettings } from "@/lib/consent";
import { useTitle } from "@/lib/useTitle";

const anchors = [
  { id: "collect", label: "What we collect" },
  { id: "cookies", label: "Cookies" },
  { id: "use", label: "How we use it" },
  { id: "rights", label: "Your rights" },
  { id: "contact", label: "Contact" },
];

export default function Privacy() {
  useTitle("Privacy Policy", "How Velero Capital handles personal data and cookies on this website.");
  return (
    <SidebarPage title="Privacy policy" intro="How Velero Capital handles personal data and cookies on this website. Last updated October 2026." anchors={anchors}>
      <Section id="collect" title="What we collect">
        <Prose>
          <p>We collect only what you choose to send us. When you submit an enquiry we receive the details you enter: who you are and your organisation, how to reach you, and what you tell us about your investment interests, your company or the opportunity you are introducing. We do not ask for bank, card or identity-document details on this website.</p>
          <p>The account verification tool runs entirely in your browser. The email address you enter there is not sent to us or stored.</p>
        </Prose>
      </Section>

      <Section id="cookies" title="Cookies">
        <Prose className="mb-6">
          <p>By default this website sets no tracking cookies. Optional features stay off until you choose, and you can change your choice at any time.</p>
        </Prose>
        <List items={[
          "Necessary — remembers your cookie choice in your browser. Always on.",
          "Analytics — anonymous measurement of how the site is used. Off until you accept.",
          "Embedded media — video and other content served by third parties, which may set their own cookies. Off until you accept.",
        ]} />
        <div className="mt-6"><button onClick={openCookieSettings} className="pill">Change cookie settings</button></div>
      </Section>

      <Section id="use" title="How we use it">
        <Prose>
          <p>We use the details you send us to respond to your enquiry and to assess whether we can work together. We do not sell personal data, and we share it only with service providers who help us run this website and our correspondence.</p>
          <p>We keep enquiry records for as long as needed to handle the enquiry and meet our legal obligations.</p>
        </Prose>
      </Section>

      <Section id="rights" title="Your rights">
        <Prose>
          <p>Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal data, to object to its processing, and to lodge a complaint with your local data protection authority.</p>
        </Prose>
      </Section>

      <Section id="contact" title="Contact">
        <Prose>
          <p>For any privacy request, write to <a href={`mailto:${CONTACT_EMAIL}`} className="textlink">{CONTACT_EMAIL}</a>.</p>
        </Prose>
      </Section>
    </SidebarPage>
  );
}
