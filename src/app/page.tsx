import { Hero } from "@/components/hero";
import { ClientsStrip } from "@/components/clients-strip";
import { PracticeSection } from "@/components/practice-section";
import { AdvantageSection } from "@/components/advantage-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { AnatomySection } from "@/components/anatomy-section";
import { ProjectsSection } from "@/components/projects-section";
import { ProcessSection } from "@/components/process-section";
import { BuildSection } from "@/components/build-section";
import { AssuranceSection } from "@/components/assurance-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientsStrip />
      <PracticeSection />
      <AdvantageSection />
      <CapabilitiesSection />
      <AnatomySection />
      <ProjectsSection />
      <ProcessSection />
      <BuildSection />
      <AssuranceSection />
      <ContactSection />
    </>
  );
}
