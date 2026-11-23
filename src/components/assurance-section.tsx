import { CapabilitiesTabs } from "./capabilities-section";
import { Reveal } from "./reveal";

export const ASSURANCES = [
  {
    code: "Q.01",
    title: "Zero-incident culture",
    body: "Daily risk briefings, crane tackle capacity logs and double-point static line protection.",
  },
  {
    code: "Q.02",
    title: "Rigid IS code compliance",
    body: "Every beam modelled, detailed and check-verified against Bureau of Indian Standards criteria.",
  },
  {
    code: "Q.03",
    title: "Elite sourced material",
    body: "High-tensile plate from world-class mills, uniform in density under challenging wind loads.",
  },
  {
    code: "Q.04",
    title: "Expert rigger crews",
    body: "Field staff cleared on safety evaluation and machine operation before frames leave the ground.",
  },
];

/** Homepage: capabilities drawing on the left, assurance on the right. */
export function CapabilitiesAssuranceSection() {
  return (
    <section className="bg-navy-mid">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-[clamp(48px,5vw,80px)] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:px-16">
        <CapabilitiesTabs kicker="05 / Capabilities" />

        <Reveal
          delay={0.12}
          className="self-start bg-rust p-[clamp(28px,3vw,44px)]"
        >
          <div id="assurance">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-navy uppercase">
              06 / Assurance
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(28px,2.8vw,44px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
              Zero compromise on quality or safety
            </h2>
            <p className="mt-[clamp(18px,2vw,26px)] max-w-[34ch] text-pretty font-display text-[clamp(19px,1.6vw,24px)] leading-[1.25] font-medium tracking-[-0.02em] text-navy">
              &ldquo;Fast delivery metrics mean nothing without high-precision
              execution.&rdquo;
            </p>
            <span className="mt-3 block font-mono text-[11px] tracking-[0.22em] text-apricot-pale uppercase">
              Orion Developers — operational commitment
            </span>
          </div>
          <div className="mt-[clamp(24px,2.6vw,34px)] flex flex-col">
            {ASSURANCES.map((item, i) => (
              <div
                key={item.code}
                className={`grid grid-cols-[52px_1fr] items-start gap-3 border-t border-white/[0.32] py-[clamp(16px,1.6vw,22px)] ${
                  i === ASSURANCES.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="pt-[4px] font-mono text-[13px] text-navy">
                  {item.code}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(18px,1.4vw,22px)] font-semibold tracking-[-0.015em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[15px] leading-[1.55] text-apricot-pale">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
