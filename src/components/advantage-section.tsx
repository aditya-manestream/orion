import { Reveal } from "./reveal";

const ADVANTAGES = [
  {
    code: "A.01",
    title: "Fast execution",
    body: "Factory fabrication runs in parallel with civil foundation work, cutting deployment time well below a conventional concrete frame.",
  },
  {
    code: "A.02",
    title: "Optimised design",
    body: "Frame drafting strips out dead weight — better seismic performance, wider usable floor, and less steel to pay for.",
  },
  {
    code: "A.03",
    title: "Cost control",
    body: "Millimetric cutting lines eliminate offcut waste, and single-contract delivery keeps the budget clear of local labour markups.",
  },
  {
    code: "A.04",
    title: "Quality materials",
    body: "Members are cold-rolled and finished in controlled plant conditions, conforming to Indian Standard structural criteria.",
  },
  {
    code: "A.05",
    title: "Safety first",
    body: "Fall-arrest harness rigging, overhead line discipline and strict PPE enforcement on every erection front, every day.",
  },
  {
    code: "A.06",
    title: "End to end",
    body: "Structural design, plate supply, sequenced shipment and crane assembly — handled by one accountable team.",
  },
];

export function AdvantageSection() {
  return (
    <section id="advantage" className="relative bg-navy-mid">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(224,145,106,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(90deg, rgba(224,145,106,0.05) 0 1px, transparent 1px 56px)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-7 border-b border-white/[0.14] pb-[clamp(24px,2.6vw,34px)]">
          <div>
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              02 / The advantage
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
              Why steel, why Orion
            </h2>
          </div>
          <p className="max-w-[42ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
            Pre-engineered steel halves the conventional build lifecycle.
            Doing it properly is what separates a shed from a structure.
          </p>
        </Reveal>
        <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-1 gap-px bg-white/[0.11] sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item, i) => (
            <Reveal
              key={item.code}
              delay={(i % 3) * 0.08}
              className="border-t-[3px] border-rust bg-navy px-[clamp(26px,2.6vw,38px)] py-[clamp(30px,3vw,44px)] transition-colors duration-300 hover:bg-navy-card-hover"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-apricot">
                {item.code}
              </span>
              <h3 className="mt-4 font-display text-[clamp(22px,1.9vw,29px)] font-semibold tracking-[-0.015em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-[clamp(15px,1.15vw,17px)] leading-[1.62] text-ink-600">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
