"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const sectors = useMemo(
    () => Array.from(new Set(projects.map((p) => p.sector))),
    [projects],
  );
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.sector === active);

  return (
    <div>
      <Reveal className="flex flex-wrap gap-3">
        {["All", ...sectors].map((sector) => (
          <button
            key={sector}
            type="button"
            onClick={() => setActive(sector)}
            className={`border px-5 py-2.5 font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-300 ${
              active === sector
                ? "border-rust bg-rust text-white"
                : "border-white/[0.2] text-ink-500 hover:border-apricot hover:text-white"
            }`}
          >
            {sector}
          </button>
        ))}
      </Reveal>

      <div className="mt-[clamp(32px,3.6vw,48px)] grid grid-cols-1 gap-[clamp(20px,2.2vw,30px)] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.07}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono text-sm text-ink-700">
          No projects in this sector yet.
        </p>
      )}
    </div>
  );
}
