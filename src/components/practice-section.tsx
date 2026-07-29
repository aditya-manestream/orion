import Link from "next/link";
import { PhotoPlaceholder } from "./photo-placeholder";
import { Reveal } from "./reveal";

const POINTS = [
  "IS 800 & BIS-compliant structural detailing on every member",
  "Single-contract turnkey delivery — one vendor, one handshake",
  "Zero-incident site protocol with daily risk briefings",
];

export function PracticeSection() {
  return (
    <section id="practice" className="relative bg-navy">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-[clamp(40px,5vw,80px)] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            01 / The practice
          </span>
          <h2 className="mt-[clamp(14px,1.4vw,22px)] text-balance font-display text-[clamp(34px,4.4vw,68px)] leading-[0.98] font-semibold tracking-[-0.025em] text-white">
            One team, from the first drawing to the final bolt.
          </h2>
          <p className="mt-[clamp(20px,2vw,30px)] max-w-[56ch] text-pretty text-[clamp(16px,1.35vw,20px)] leading-[1.62] text-ink-600">
            Orion Developers is an engineering-led practice building
            pre-engineered steel structures across Maharashtra and beyond. We
            hold design, fabrication and erection under one contract — so the
            drawing that leaves our office is the building that goes up on
            your site.
          </p>
          <p className="mt-[18px] max-w-[56ch] text-pretty text-[clamp(16px,1.35vw,20px)] leading-[1.62] text-ink-600">
            High-tensile members, rapid erection sequencing and a single
            point of accountability. Nothing is improvised on site, because
            nothing was left unresolved on paper.
          </p>
          <div className="mt-[clamp(30px,3.4vw,46px)] flex flex-col border-b border-white/[0.13]">
            {POINTS.map((point, i) => (
              <div
                key={point}
                className="grid grid-cols-[78px_1fr] gap-5 border-t border-white/[0.13] py-[18px]"
              >
                <span className="font-mono text-xs tracking-[0.16em] text-rust">
                  0{i + 1}
                </span>
                <span className="text-[clamp(15px,1.2vw,17px)] text-ink-300">
                  {point}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-7 inline-block font-mono text-xs tracking-[0.16em] text-apricot uppercase hover:text-white"
          >
            More about Orion →
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="relative p-3.5">
          <div className="pointer-events-none absolute inset-0 border-2 border-rust" />
          <PhotoPlaceholder
            src="/photos/site-teal-completed-aerial.jpg"
            alt="Completed Orion pre-engineered building, aerial view"
            className="relative aspect-[4/5]"
            figLabel="Fig. 02 — Completed shell"
            subcaption="Clear-span · galvalume clad"
          />
        </Reveal>
      </div>
    </section>
  );
}
