import { Hero } from "@/components/hero";
import { ClientsStrip } from "@/components/clients-strip";
import { PracticeSection } from "@/components/practice-section";
import { AdvantageSection } from "@/components/advantage-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { AnatomySection } from "@/components/anatomy-section";
import { AnatomyScrolly } from "@/components/anatomy-scrolly";
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
      {/* Reduced motion gets the static anatomy at every width. */}
      <div className="hidden lg:block motion-reduce:lg:hidden">
        <AnatomyScrolly />
      </div>
      <div className="lg:hidden motion-reduce:lg:block">
        <AnatomySection id="anatomy-mobile" />
      </div>
      <ProjectsSection />
      <ProcessSection />
      <BuildSection />
      <AssuranceSection />
      <ContactSection />
    </>
  );
}
