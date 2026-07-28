import { PhotoPlaceholder } from "./photo-placeholder";
import { Reveal } from "./reveal";

const FEATURED_PROJECTS = [
  {
    tag: "P.01",
    category: "Agro processing facility",
    name: "Rajendra Agro",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-blue-warehouse-aerial.jpg",
  },
  {
    tag: "P.02",
    category: "Textile manufacturing plant",
    name: "Suryakiran Textile",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-grey-warehouse-aerial.jpg",
  },
];

const SMALL_PROJECTS = [
  {
    tag: "P.03",
    category: "Poultry infrastructure",
    name: "Akash Poultry",
    photo: "/photos/site-frame-erection-aerial.jpg",
  },
  {
    tag: "P.04",
    category: "Industrial warehouse",
    name: "Starwalk Pvt Ltd",
    photo: "/photos/site-interior-frame-1.jpg",
  },
  {
    tag: "P.05",
    category: "Weaving shed",
    name: "Vimal Textile Industries",
    photo: "/photos/site-interior-frame-2.jpg",
  },
  {
    tag: "P.06",
    category: "Institutional block",
    name: "VKD School & Jr. College",
    photo: "/photos/site-frame-excavator.jpg",
  },
];

type Project = {
  tag: string;
  category: string;
  name: string;
  scope?: string;
  photo: string;
};

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <a
      href="#contact"
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
    </a>
  );
}

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
            <Reveal key={project.tag} delay={i * 0.08}>
              <ProjectCard project={project} large />
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(20px,2.2vw,30px)] grid grid-cols-1 gap-[clamp(20px,2.2vw,30px)] sm:grid-cols-2 lg:grid-cols-4">
          {SMALL_PROJECTS.map((project, i) => (
            <Reveal key={project.tag} delay={(i % 4) * 0.07}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
