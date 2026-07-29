import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { AdvantageSection } from "@/components/advantage-section";
import { AnatomySection } from "@/components/anatomy-section";
import { BuildSection } from "@/components/build-section";

export const metadata: Metadata = {
  title: "Capabilities & Systems — Orion Developers",
  description:
    "Orion Developers' PEB systems showcase: design, supply and erection capabilities, structural anatomy, configurations and sectors served.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        kicker="Systems showcase"
        title="Engineered end to end, for the people who have to sign off on it."
        intro="Spans, materials and structural highlights, written for the procurement and project teams evaluating a PEB partner — not a general audience."
        photo="/photos/site-frame-erection-aerial.jpg"
        photoAlt="Aerial view of an Orion pre-engineered building frame during erection"
      />
      <CapabilitiesSection kicker="01 / Design, supply, erection" />
      <AdvantageSection kicker="02 / Why steel, why Orion" />
      <AnatomySection kicker="03 / Anatomy" />
      <BuildSection kicker="04 / Configurations & sectors" />
    </>
  );
}
