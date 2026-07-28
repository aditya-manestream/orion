import { PhotoPlaceholder } from "./photo-placeholder";
import { Reveal } from "./reveal";

const SYSTEMS = [
  {
    code: "D.01",
    title: "Primary frame",
    body: "Heavy tapered columns and rafter splices engineered to accept maximum load distribution.",
  },
  {
    code: "D.02",
    title: "Secondary rows",
    body: "Interlocking longitudinal Z-purlins and C-girts holding global structural alignment.",
  },
  {
    code: "D.03",
    title: "Cladding system",
    body: "Coated galvalume protective panels fitted with engineered sky-lighting sheets.",
  },
  {
    code: "D.04",
    title: "Structural utilities",
    body: "Mezzanine platforms, crane runway brackets and weather-sealed entrance canopies.",
  },
];

export function AnatomySection() {
  return (
    <section id="anatomy" className="relative bg-navy-mid">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="max-w-[60ch]">
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            04 / Anatomy
          </span>
          <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
            What a pre-engineered building is made of
          </h2>
          <p className="mt-[18px] text-pretty text-[clamp(15px,1.25vw,19px)] leading-[1.62] text-ink-600">
            Four systems, each dimensioned before it is cut, combining under
            calculated tension and load to produce a rigid industrial space.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <PhotoPlaceholder
            src="/photos/anatomy-of-a-peb-diagram.jpg"
            alt="Labelled cutaway diagram of an Orion pre-engineered building showing primary frame, purlins, cladding and structural utilities"
            fit="contain"
            background="#eef1f4"
            overlay={false}
            corners={false}
            className="mx-auto mt-[clamp(38px,4.4vw,62px)] aspect-[922/615] w-full max-w-[1180px]"
          />
        </Reveal>

        <div className="mt-[clamp(28px,3.2vw,44px)] grid grid-cols-1 gap-px bg-white/[0.11] sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((system, i) => (
            <Reveal
              key={system.code}
              delay={0.15 + i * 0.06}
              className="bg-navy p-[clamp(24px,2.4vw,34px)] transition-colors duration-300 hover:bg-navy-card-hover"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-rust">
                {system.code}
              </span>
              <h3 className="mt-3.5 font-display text-[clamp(19px,1.6vw,24px)] font-semibold tracking-[-0.015em] text-white">
                {system.title}
              </h3>
              <p className="mt-2.5 text-pretty text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-ink-600">
                {system.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
