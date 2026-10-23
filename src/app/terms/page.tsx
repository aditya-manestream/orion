import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
  description: "The terms that apply when you use the Orion Developers website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="By using this website you agree to these terms. If you don't agree, please don't use the site."
      sections={[
        { heading: "Information on this site", body: "We keep specifications, photographs and descriptions as accurate as we can, but they can change without notice. A signed quotation or contract from Orion Developers is what counts." },
        { heading: "Enquiries and quotations", body: "Sending an enquiry does not create a contract. Any design, supply or erection work is governed by the quotation and terms we share with you at that point." },
        { heading: "Content", body: "The text, drawings and photographs on this site belong to Orion Developers or are used with permission." },
        { heading: "Liability", body: "To the extent Indian law allows, we are not liable for losses that arise from relying on this website." },
        { heading: "Governing law", body: "These terms are governed by the laws of India, with courts at Nashik having jurisdiction." },
      ]}
    />
  );
}
