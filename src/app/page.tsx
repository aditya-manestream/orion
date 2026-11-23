import { Hero } from "@/components/hero";
import { ClientsStrip } from "@/components/clients-strip";
import { PebIntro } from "@/components/peb-intro";
import { AnatomySection } from "@/components/anatomy-section";
import { AnatomyModel } from "@/components/anatomy/anatomy-model";
import { PracticeSection } from "@/components/practice-section";
import { CapabilitiesAssuranceSection } from "@/components/assurance-section";
import { ProjectsSection } from "@/components/projects-section";
import { ProcessSection } from "@/components/process-section";

// Order follows the client's sketch: hero with what we build, what is a PEB
// beside its anatomy, practice beside advantages, capabilities beside
// assurance, then projects, and process beside get started.
export default function Home() {
  return (
    <>
      <Hero />
      <ClientsStrip />
      {/* Reduced motion gets the static labelled diagram instead of the 3D build. */}
      <div className="motion-reduce:hidden">
        <AnatomyModel header={<PebIntro />} />
      </div>
      <div className="hidden motion-reduce:block">
        <AnatomySection id="anatomy-static" header={<PebIntro />} />
      </div>
      <PracticeSection />
      <CapabilitiesAssuranceSection />
      <ProjectsSection />
      <ProcessSection />
    </>
  );
}
