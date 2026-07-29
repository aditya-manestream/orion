import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

const FEATURED_PROJECTS = PROJECTS.slice(0, 2);
const SMALL_PROJECTS = PROJECTS.slice(2);

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-navy">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-7 border-b border-white/[0.14] pb-[clamp(24px,2.6vw,34px)]">
          <div>
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              05 / Projects
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
              Built, clad and handed over
            </h2>
          </div>
          <p className="max-w-[38ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
            Recent structures delivered end to end — design through final
            panel stitching.
          </p>
        </Reveal>

        <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-[clamp(20px,2.2vw,30px)]">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} large />
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(20px,2.2vw,30px)] grid grid-cols-1 gap-[clamp(20px,2.2vw,30px)] sm:grid-cols-2 lg:grid-cols-4">
          {SMALL_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 4) * 0.07}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-[clamp(36px,4vw,56px)] flex justify-center">
          <Link
            href="/projects"
            className="border border-white/[0.34] px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:border-apricot hover:bg-apricot/10"
          >
            View all projects
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
