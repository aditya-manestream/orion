"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PhotoPlaceholder } from "./photo-placeholder";
import { Reveal } from "./reveal";

const CONFIGURATIONS = [
  {
    code: "B.01",
    title: "Pre-Engineered Buildings",
    body: "Optimally designed clear-span layouts that eliminate interior column arrays entirely, so the full floor plate stays available for plant and racking.",
  },
  {
    code: "B.02",
    title: "Industrial warehouses",
    body: "Secure, weathertight logistical complexes built to heavy storage metrics, with dock canopies and ridge ventilation designed in from the start.",
  },
  {
    code: "B.03",
    title: "Manufacturing facilities",
    body: "Machine-resilient steel structures engineered with heavy crane gantry rails, mezzanine platforms and vibration-tolerant connections.",
  },
  {
    code: "B.04",
    title: "Commercial steel hubs",
    body: "Multi-storey structural commercial layouts, custom configured — showrooms, institutional blocks and mixed-use frames.",
  },
  {
    code: "B.05",
    title: "Roofing & cladding profiles",
    body: "Insulated sandwich panel shells built for premium thermal insulation values, with engineered skylights and leakproof stitched seams.",
  },
];

const SECTORS = [
  "Manufacturing plants",
  "Logistics & warehousing",
  "Agricultural infrastructure",
  "FMCG & cold chain",
  "Automobile showrooms",
  "Heavy engineering",
];

export function BuildSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="build" className="bg-navy">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-[clamp(36px,4.4vw,72px)]">
          <Reveal>
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              07 / What we build
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
              Five configurations, one engineering method
            </h2>
            <p className="mt-[18px] max-w-[46ch] text-pretty text-[clamp(15px,1.25vw,19px)] leading-[1.62] text-ink-600">
              Every Orion structure starts from the same discipline and is
              configured to the use case in front of it.
            </p>
            <PhotoPlaceholder
              src="/photos/site-purlins-interior.jpg"
              alt="Interior purlin and frame rows during Orion site erection"
              className="mt-[clamp(30px,3.4vw,46px)] aspect-square"
              figLabel="Fig. 04 — Purlin rows, laser-aligned"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              {CONFIGURATIONS.map((config, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={config.code}
                    className={`border-t border-white/[0.14] ${
                      i === CONFIGURATIONS.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-[clamp(14px,1.6vw,22px)] py-[clamp(22px,2.2vw,30px)] text-left font-display text-[clamp(19px,1.8vw,27px)] font-semibold tracking-[-0.018em] text-white"
                    >
                      <span className="flex-none font-mono text-xs tracking-[0.18em] text-rust">
                        {config.code}
                      </span>
                      <span className="flex-1">{config.title}</span>
                      <span className="relative h-4 w-4 flex-none">
                        <span className="absolute top-[7px] left-0 h-0.5 w-4 bg-rust" />
                        <span
                          className="absolute top-0 left-[7px] h-4 w-0.5 bg-rust transition-opacity duration-200"
                          style={{ opacity: isOpen ? 0 : 1 }}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[56ch] text-pretty px-0.5 pb-7 pl-[clamp(46px,4vw,66px)] text-[clamp(15px,1.2vw,18px)] leading-[1.65] text-ink-600">
                            {config.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-[clamp(34px,3.6vw,52px)]">
              <span className="font-mono text-[11px] tracking-[0.24em] text-ink-800 uppercase">
                Sectors served
              </span>
              <div className="mt-4 grid grid-cols-1 gap-px bg-white/[0.11] sm:grid-cols-2 lg:grid-cols-3">
                {SECTORS.map((sector) => (
                  <div
                    key={sector}
                    className="bg-navy-card px-5 py-[18px] font-display text-[clamp(14px,1.1vw,16px)] font-medium text-ink-300 transition-colors duration-300 hover:bg-rust"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
