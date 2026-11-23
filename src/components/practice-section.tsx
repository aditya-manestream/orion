import Link from "next/link";
import { ADVANTAGES } from "./advantage-section";
import { Reveal } from "./reveal";

export const POINTS = [
  "IS 800 & BIS-compliant structural detailing on every member",
  "Single-contract turnkey delivery — one vendor, one handshake",
  "Zero-incident site protocol with daily risk briefings",
];

/** Homepage: the practice on the left, the six advantages on the right. */
export function PracticeSection() {
  return (
    <section id="practice" className="relative bg-navy">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-[clamp(48px,5vw,88px)] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-16">
        <Reveal className="lg:sticky lg:top-[150px] lg:self-start">
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            03 / The practice
          </span>
          <h2 className="mt-[clamp(14px,1.4vw,22px)] text-balance font-display text-[clamp(32px,3.8vw,58px)] leading-[0.98] font-semibold tracking-[-0.025em] text-white">
            One team, from the first drawing to the final bolt.
          </h2>
          <p className="mt-[clamp(20px,2vw,30px)] max-w-[56ch] text-pretty text-[clamp(16px,1.3vw,19px)] leading-[1.62] text-ink-600">
            Orion Developers is an engineering-led practice building
            pre-engineered steel structures across Maharashtra and beyond. We
            hold design, fabrication and erection under one contract — so the
            drawing that leaves our office is the building that goes up on
            your site.
          </p>
          <p className="mt-[18px] max-w-[56ch] text-pretty text-[clamp(16px,1.3vw,19px)] leading-[1.62] text-ink-600">
            High-tensile members, rapid erection sequencing and a single
            point of accountability. Nothing is improvised on site, because
            nothing was left unresolved on paper.
          </p>
          <div className="mt-[clamp(28px,3vw,40px)] flex flex-col border-b border-white/[0.13]">
            {POINTS.map((point, i) => (
              <div
                key={point}
                className="grid grid-cols-[56px_1fr] gap-4 border-t border-white/[0.13] py-4"
              >
                <span className="font-mono text-xs tracking-[0.16em] text-apricot">
                  0{i + 1}
                </span>
                <span className="text-[clamp(15px,1.15vw,17px)] text-ink-300">
                  {point}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-4 inline-flex min-h-11 items-center font-mono text-xs tracking-[0.16em] text-apricot uppercase hover:text-white"
          >
            More about Orion →
          </Link>
        </Reveal>

        <div id="advantage">
          <Reveal className="border-b border-white/[0.14] pb-[clamp(20px,2.2vw,28px)]">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              04 / The advantage
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(28px,3vw,46px)] leading-none font-semibold tracking-[-0.025em] text-white">
              Why steel, why Orion
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
              Pre-engineered steel halves the conventional build lifecycle.
              Doing it properly is what separates a shed from a structure.
            </p>
          </Reveal>
          <div className="mt-[clamp(24px,2.6vw,36px)] grid grid-cols-1 gap-px bg-white/[0.11] sm:grid-cols-2">
            {ADVANTAGES.map((item, i) => (
              <Reveal
                key={item.code}
                delay={(i % 2) * 0.08}
                className="border-t-[3px] border-rust bg-navy-mid px-[clamp(22px,2.2vw,32px)] py-[clamp(24px,2.4vw,34px)] transition-colors duration-300 hover:bg-navy-card-hover"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-apricot">
                  {item.code}
                </span>
                <h3 className="mt-3 font-display text-[clamp(20px,1.6vw,25px)] font-semibold tracking-[-0.015em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[clamp(15px,1.1vw,16px)] leading-[1.6] text-ink-600">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
