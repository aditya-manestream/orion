import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: "What Orion Developers collects through this website, why, and what you can ask us to do with it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What Orion Developers collects when you use this website, why, and what you can ask us to do with it. It follows India's Digital Personal Data Protection Act, 2023."
      sections={[
        {
          heading: "What we collect",
          items: [
            "What you type into our project enquiry form: usually your name, company, phone, site location and the details of your building.",
            "Messages you send us on WhatsApp or by phone.",
            "Basic technical data your browser sends to any website, such as device type and pages visited.",
          ],
        },
        { heading: "Why we use it", body: "Only to reply to your enquiry, prepare a design or quotation, and keep a record of the conversation. We do not sell your data or share it for advertising." },
        { heading: "Who else sees it", body: "Service providers that run this site for us, such as our hosting and messaging providers, process it on our behalf and only for these purposes." },
        { heading: "How long we keep it", body: "For as long as we need it to serve you, or as the law requires, and then we delete it." },
        { heading: "Your rights", body: "You can ask to see, correct or delete your data, or withdraw consent, by calling or messaging us on the number below. We reply within 30 days." },
      ]}
    />
  );
}
