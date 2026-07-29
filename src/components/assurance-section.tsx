import Image from "next/image";
import { Reveal } from "./reveal";

const ASSURANCES = [
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

export function AssuranceSection() {
  return (
    <section id="assurance" className="bg-rust">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,132px)] sm:px-8 lg:px-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[clamp(36px,4.4vw,72px)]">
          <Reveal className="flex h-full flex-col">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-navy uppercase">
              08 / Assurance
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,62px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
              Zero compromise on quality or safety
            </h2>
            <p className="mt-[clamp(26px,3vw,40px)] max-w-[34ch] text-pretty font-display text-[clamp(20px,2.1vw,32px)] leading-[1.22] font-medium tracking-[-0.02em] text-navy">
              &ldquo;Fast delivery metrics mean nothing without high-precision
              execution.&rdquo;
            </p>
            <span className="mt-[18px] block font-mono text-[11px] tracking-[0.22em] text-apricot-pale uppercase">
              Orion Developers — operational commitment
            </span>
            <div className="mt-10 flex flex-1 items-end justify-center opacity-[0.16] sm:justify-start">
              <Image
                src="/orion-logo.png"
                alt=""
                width={230}
                height={324}
                className="h-[clamp(120px,16vw,230px)] w-auto"
              />
            </div>
          </Reveal>
          <div className="flex flex-col">
            {ASSURANCES.map((item, i) => (
              <Reveal
                key={item.code}
                delay={i * 0.08}
                className={`grid grid-cols-[64px_1fr] items-start gap-[18px] border-t border-white/[0.32] py-[clamp(22px,2.4vw,30px)] ${
                  i === ASSURANCES.length - 1 ? "border-b" : ""
                }`}
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
      </div>
    </section>
  );
}
