import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbSchema, ProjectSchema } from "@/components/structured-data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${project.category}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <ProjectSchema project={project} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
      />
      <section className="relative overflow-hidden bg-navy-deep pt-[clamp(140px,15vw,180px)] pb-[clamp(56px,7vw,88px)]">
        <PhotoPlaceholder
          src={project.photo}
          alt={`${project.name} — ${project.category}`}
          className="absolute inset-0"
          corners={false}
          overlay={false}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(178deg, rgba(11,23,40,0.92) 0%, rgba(15,30,51,0.66) 45%, #0b1728 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16">
          <Reveal>
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-[0.2em] text-apricot uppercase hover:text-white"
            >
              ← All projects
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
              <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
                {project.tag} · {project.category}
              </span>
            </div>
            <h1 className="mt-[clamp(14px,1.8vw,24px)] max-w-[20ch] text-balance font-display text-[clamp(38px,5.6vw,80px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
              {project.name}
            </h1>
            <p className="mt-[clamp(18px,2vw,28px)] max-w-[60ch] text-pretty text-[clamp(16px,1.3vw,20px)] leading-[1.6] text-ink-600">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-[clamp(40px,5vw,80px)] px-6 py-[clamp(64px,8vw,120px)] sm:px-8 lg:px-16">
          <Reveal className="lg:col-span-2">
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 max-w-[68ch] text-pretty text-[clamp(16px,1.25vw,19px)] leading-[1.65] text-ink-600 first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.12} className="border border-white/[0.12] bg-navy-mid p-[clamp(28px,3vw,40px)]">
            <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
              Project details
            </span>
            <div className="mt-6 flex flex-col gap-5">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                  Client
                </div>
                <div className="mt-1.5 text-[clamp(15px,1.1vw,17px)] text-white">
                  {project.name}
                </div>
              </div>
              <div className="border-t border-white/[0.12] pt-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                  Sector
                </div>
                <div className="mt-1.5 text-[clamp(15px,1.1vw,17px)] text-white">
                  {project.sector}
                </div>
              </div>
              <div className="border-t border-white/[0.12] pt-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                  Scope
                </div>
                <div className="mt-1.5 text-[clamp(15px,1.1vw,17px)] text-white">
                  {project.scope}
                </div>
              </div>
              <div className="border-t border-white/[0.12] pt-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                  Region
                </div>
                <div className="mt-1.5 text-[clamp(15px,1.1vw,17px)] text-white">
                  Maharashtra, India
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-7 block bg-rust px-6 py-3.5 text-center font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
            >
              Start a similar project
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/[0.07] bg-navy-mid">
          <div className="mx-auto max-w-[1400px] px-6 py-[clamp(56px,7vw,96px)] sm:px-8 lg:px-16">
            <Reveal>
              <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
                More projects
              </span>
              <h2 className="mt-3 text-balance font-display text-[clamp(26px,2.8vw,40px)] font-semibold tracking-[-0.02em] text-white">
                Other structures we&apos;ve delivered
              </h2>
            </Reveal>
            <div className="mt-[clamp(28px,3.2vw,44px)] grid grid-cols-1 gap-[clamp(20px,2.2vw,30px)] sm:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
