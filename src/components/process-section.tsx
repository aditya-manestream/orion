import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "01",
    title: "Enquiry & scoping",
    body: "Span clearances, seismic zone and operational utility factors, evaluated before anything is drawn.",
  },
  {
    n: "02",
    title: "CAD & structural design",
    body: "Frame simulations in global modelling engines to minimise unnecessary building mass.",
  },
  {
    n: "03",
    title: "Shop drawing detailing",
    body: "Component cut files and itemised bills of materials for zero-error factory execution.",
  },
  {
    n: "04",
    title: "Precision fabrication",
    body: "Multi-pass submerged arc welding, clean metal trimming and protective primer coatings.",
  },
  {
    n: "05",
    title: "Sequenced logistics",
    body: "Shipments itemised to match the exact physical assembly order on site.",
  },
  {
    n: "06",
    title: "Erection & handover",
    body: "Alignment checks, high-torque anchoring, leakproof panel stitching and official sign-off.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative bg-rust">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px), repeating-linear-gradient(90deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-7 border-b border-white/[0.34] pb-[clamp(24px,2.6vw,34px)]">
          <div>
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-navy uppercase">
              06 / Process
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-bold tracking-[-0.03em] text-white">
              Scoping to commissioning
            </h2>
          </div>
          <p className="max-w-[38ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-apricot-pale">
            Six milestones. Each one signed off before the next begins.
          </p>
        </Reveal>
        <div className="mt-[clamp(36px,4vw,60px)] grid grid-cols-1 gap-[clamp(26px,2.8vw,44px)] sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={(i % 3) * 0.08}
              className="border-t-2 border-white/[0.34] pt-[22px]"
            >
              <span className="font-mono text-[clamp(28px,2.8vw,42px)] leading-none text-navy/42">
                {step.n}
              </span>
              <h3 className="mt-3.5 font-display text-[clamp(20px,1.7vw,26px)] font-semibold tracking-[-0.015em] text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-pretty text-[clamp(14px,1.15vw,17px)] leading-[1.62] text-apricot-pale">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
