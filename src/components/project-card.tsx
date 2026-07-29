import Link from "next/link";
import type { Project } from "@/lib/projects";
import { PhotoPlaceholder } from "./photo-placeholder";

export function ProjectCard({
  project,
  large,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block overflow-hidden bg-navy-deep text-white transition-shadow duration-500 ease-out hover:shadow-[0_30px_70px_-25px_rgba(194,98,46,0.55)] ${
        large ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      <PhotoPlaceholder
        src={project.photo}
        alt={`${project.name} — ${project.category}`}
        corners={false}
        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/10 via-transparent to-navy-deep/90" />
      <div
        className={`pointer-events-none absolute inset-3 border-2 border-rust opacity-0 transition-all duration-500 ease-out group-hover:inset-0 group-hover:opacity-100`}
      />
      <div
        className={`pointer-events-none absolute right-[clamp(18px,2vw,30px)] bottom-[clamp(18px,2vw,28px)] left-[clamp(18px,2vw,30px)] transition-transform duration-500 ease-out group-hover:-translate-y-1`}
      >
        <span
          className={`block font-mono tracking-[0.2em] text-apricot uppercase ${large ? "text-[11px]" : "text-[10px]"}`}
        >
          {project.category}
        </span>
        <span
          className={`block font-display leading-[1.05] font-bold tracking-[-0.02em] text-white ${
            large
              ? "mt-2 text-[clamp(24px,2.2vw,34px)]"
              : "mt-[7px] text-[clamp(20px,1.6vw,25px)]"
          }`}
        >
          {project.name}
        </span>
        {project.scope && (
          <span className="mt-2.5 block font-mono text-[11px] tracking-[0.14em] text-ink-700">
            {project.scope}
          </span>
        )}
      </div>
      <span
        className={`pointer-events-none absolute font-mono tracking-[0.2em] text-white transition-opacity duration-300 group-hover:opacity-60 ${
          large
            ? "top-[clamp(18px,1.8vw,26px)] left-[clamp(20px,2vw,30px)] text-[11px]"
            : "top-5 left-[22px] text-[10px]"
        }`}
      >
        {project.tag}
      </span>
    </Link>
  );
}
