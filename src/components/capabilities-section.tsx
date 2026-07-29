import { Reveal } from "./reveal";

const CAPABILITIES = [
  {
    code: "C.01",
    title: "Design",
    body: "Every layout begins with precision load mapping for wind, seismic zone and internal crane duty.",
    items: [
      "Structural stress simulation modelling",
      "General Arrangement blueprints",
      "Statutory approval drawing packs",
      "Granular fabrication shop sheets",
    ],
  },
  {
    code: "C.02",
    title: "Supply",
    body: "Every component arrives precut, drilled and verified for high-velocity assembly on site.",
    items: [
      "Built-up tapered primary members",
      "Cold-formed secondary purlins",
      "Insulated roof cladding packs",
      "High-strength structural fasteners",
    ],
  },
  {
    code: "C.03",
    title: "Erection",
    body: "Heavy cranes and trained rigging crews turn modular frames into finished structures.",
    items: [
      "Crane hoisting rig safety procedure",
      "Laser-guided vertical alignment",
      "Leakproof roof panel stitching",
      "Complete turnkey site handover",
    ],
  },
];

export function CapabilitiesSection({
  kicker = "03 / Capabilities",
}: {
  kicker?: string;
}) {
  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-7 border-b border-white/[0.14] pb-[clamp(24px,2.6vw,34px)]">
          <div>
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              {kicker}
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
              Engineered end to end
            </h2>
          </div>
          <p className="max-w-[38ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
            Three stages, one contract. Nothing handed off, nothing lost
            between vendors.
          </p>
        </Reveal>
        <div className="relative mt-[clamp(36px,4vw,56px)] max-w-[760px]">
          <div className="absolute top-5 bottom-5 left-5 w-px bg-white/[0.14]" />
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.code}
              delay={i * 0.1}
              y={16}
              className={`relative flex gap-[clamp(20px,2.6vw,34px)] ${
                i === CAPABILITIES.length - 1 ? "" : "pb-[clamp(40px,4.4vw,60px)]"
              }`}
            >
              <div className="relative z-10 flex-none">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-rust bg-navy font-mono text-sm text-rust">
                  0{i + 1}
                </div>
              </div>
              <div className="flex-1 pt-1.5">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-[13px] tracking-[0.18em] text-rust">
                    {cap.code}
                  </span>
                  <h3 className="font-display text-[clamp(26px,2.4vw,36px)] font-semibold tracking-[-0.02em] text-white">
                    {cap.title}
                  </h3>
                </div>
                <p className="mt-3.5 text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.62] text-ink-600">
                  {cap.body}
                </p>
                <div className="mt-[22px] flex flex-col gap-3">
                  {cap.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[9px] h-[5px] w-[5px] flex-none bg-rust" />
                      <span className="text-[clamp(14px,1.1vw,16px)] leading-[1.55] text-ink-400">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
