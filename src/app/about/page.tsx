import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Orion Developers is an engineering-led pre-engineered building practice in Nashik, Maharashtra, holding design, fabrication and erection under one contract.",
  path: "/about",
});

const PRINCIPLES = [
  {
    code: "01",
    title: "One contract, one team",
    body: "Design, fabrication and erection sit under a single point of accountability. There is no vendor to chase and no drawing that changes hands between disconnected teams.",
  },
  {
    code: "02",
    title: "Nothing improvised on site",
    body: "Every connection, load path and clearance is resolved on paper before a beam is cut. Site work becomes assembly, not problem-solving.",
  },
  {
    code: "03",
    title: "Built for the buyer's use case",
    body: "A warehouse, a manufacturing plant and an institutional block don't share a brief. Each structure is configured to its own spans, loads and occupancy from the first drawing.",
  },
];

const COMMITMENTS = [
  {
    code: "Q.01",
    title: "Zero-incident culture",
    body: "Daily risk briefings, crane tackle capacity logs and double-point static line protection on every erection front.",
  },
  {
    code: "Q.02",
    title: "Rigid IS code compliance",
    body: "Every beam modelled, detailed and check-verified against Bureau of Indian Standards criteria before fabrication.",
  },
  {
    code: "Q.03",
    title: "Elite sourced material",
    body: "High-tensile plate from world-class mills, uniform in density under the wind and seismic loads Maharashtra sites see.",
  },
  {
    code: "Q.04",
    title: "Single point of accountability",
    body: "One contract covers structural design, plate supply, sequenced shipment and final crane assembly — no handoffs, no finger-pointing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Orion"
        title="Engineering-led, site-tested."
        intro="Orion Developers is a pre-engineered building practice built around a simple idea: the drawing that leaves our office should be the exact building that goes up on your site. No surprises, no improvisation, no second vendor to blame."
        photo="/photos/site-teal-completed-aerial.jpg"
        photoAlt="Completed Orion pre-engineered building, aerial view"
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-[1400px] px-6 py-[clamp(64px,8vw,120px)] sm:px-8 lg:px-16">
          <Reveal className="max-w-[70ch]">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              Who we are
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(28px,3.4vw,48px)] leading-[1.05] font-semibold tracking-[-0.02em] text-white">
              An engineering practice, not a materials broker.
            </h2>
            <p className="mt-[22px] text-pretty text-[clamp(16px,1.3vw,19px)] leading-[1.65] text-ink-600">
              Orion Developers designs, fabricates and erects pre-engineered
              steel structures across Maharashtra — warehouses, manufacturing
              plants, agricultural infrastructure and institutional blocks.
              We hold design, fabrication and erection under one contract, so
              accountability never gets split across a chain of
              subcontractors.
            </p>
            <p className="mt-4 text-pretty text-[clamp(16px,1.3vw,19px)] leading-[1.65] text-ink-600">
              That structure exists for one reason: pre-engineered steel only
              delivers on its promise — speed, cost control, long structural
              life — when the design, the plate, and the crew putting it up
              are all answering to the same team.
            </p>
          </Reveal>

          <div className="mt-[clamp(48px,5.4vw,80px)] grid grid-cols-1 gap-px bg-white/[0.11] sm:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <Reveal
                key={item.code}
                delay={i * 0.08}
                className="border-t-[3px] border-rust bg-navy-mid px-[clamp(24px,2.4vw,34px)] py-[clamp(28px,3vw,40px)]"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-apricot">
                  {item.code}
                </span>
                <h3 className="mt-4 font-display text-[clamp(20px,1.7vw,25px)] font-semibold tracking-[-0.015em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-pretty text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-ink-600">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-rust">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px), repeating-linear-gradient(90deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-[clamp(64px,8vw,120px)] sm:px-8 lg:px-16">
          <Reveal className="max-w-[60ch]">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-navy uppercase">
              What clients can expect
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(28px,3.4vw,48px)] leading-[1.05] font-bold tracking-[-0.02em] text-white">
              Zero compromise on quality or safety.
            </h2>
          </Reveal>
          <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-1 gap-x-[clamp(36px,4.4vw,72px)] gap-y-0 sm:grid-cols-2">
            {COMMITMENTS.map((item, i) => (
              <Reveal
                key={item.code}
                delay={(i % 2) * 0.1}
                className="grid grid-cols-[64px_1fr] items-start gap-[18px] border-t border-white/[0.32] py-[clamp(22px,2.4vw,30px)]"
              >
                <span className="pt-[5px] font-mono text-[13px] text-navy">
                  {item.code}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(19px,1.7vw,26px)] font-semibold tracking-[-0.015em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[clamp(14px,1.1vw,16px)] leading-[1.58] text-apricot-pale">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-[1400px] px-6 py-[clamp(64px,8vw,110px)] sm:px-8 lg:px-16">
          <Reveal className="flex flex-col items-start gap-6 border border-white/[0.12] bg-navy-mid p-[clamp(32px,4vw,56px)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-balance font-display text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.02em] text-white">
                Have a site and a use case in mind?
              </h2>
              <p className="mt-2 max-w-[52ch] text-pretty text-[clamp(15px,1.15vw,17px)] leading-[1.6] text-ink-600">
                Tell us the span, the location and the timeline — we&apos;ll
                come back with a preliminary design and a schedule.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-none bg-rust px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
