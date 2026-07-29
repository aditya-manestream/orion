import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectsGallery } from "@/components/projects-gallery";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Orion Developers",
  description:
    "Recent pre-engineered building projects from Orion Developers across Maharashtra — agro processing, textile manufacturing, warehousing and institutional structures.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Projects"
        title="Built, clad and handed over."
        intro="Recent structures delivered end to end — design through final panel stitching. Filter by sector to see structures closest to your own brief."
        photo="/photos/site-sunset-completed.jpg"
        photoAlt="Completed Orion pre-engineered building at dusk"
      />
      <section className="bg-navy">
        <div className="mx-auto max-w-[1400px] px-6 py-[clamp(56px,7vw,96px)] sm:px-8 lg:px-16">
          <ProjectsGallery projects={PROJECTS} />
        </div>
      </section>
    </>
  );
}
