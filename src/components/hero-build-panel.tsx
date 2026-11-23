"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIGURATIONS, SECTORS } from "./build-section";

/**
 * "What we build" in the hero: the five configurations are always listed;
 * hovering (or tapping, or focusing) a row shows its full description in
 * the readout below, so the panel never changes height.
 */
export function HeroBuildPanel() {
  const [active, setActive] = useState(0);
  const current = CONFIGURATIONS[active];

  return (
    <div
      id="build"
      className="border border-white/[0.14] bg-navy-deep/90"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.12] px-5 py-3.5">
        <h2 className="font-mono text-[11px] font-normal tracking-[0.24em] text-apricot uppercase">
          What we build
        </h2>
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-800">
          {current.code} / B.05
        </span>
      </div>

      <ul>
        {CONFIGURATIONS.map((config, i) => {
          const isActive = active === i;
          return (
            <li key={config.code} className="border-b border-white/[0.08]">
              <button
                type="button"
                aria-pressed={isActive}
                aria-controls="hero-build-readout"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex min-h-12 w-full items-center gap-4 px-5 py-2.5 text-left transition-colors duration-200 ${
                  isActive ? "bg-white/[0.05] text-white" : "text-ink-400 hover:text-white"
                }`}
              >
                <span className="w-9 flex-none font-mono text-[11px] tracking-[0.16em] text-apricot">
                  {config.code}
                </span>
                <span className="flex-1 font-display text-[16px] font-semibold tracking-[-0.01em] lg:text-[17px]">
                  {config.title}
                </span>
                <span className="relative h-3 w-3 flex-none" aria-hidden>
                  <span className="absolute top-[5px] left-0 h-0.5 w-3 bg-rust" />
                  <span
                    className="absolute top-0 left-[5px] h-3 w-0.5 bg-rust transition-opacity duration-200"
                    style={{ opacity: isActive ? 0 : 1 }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id="hero-build-readout"
        aria-live="polite"
        className="min-h-[136px] px-5 pt-4 pb-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-pretty text-[15px] leading-[1.6] text-ink-600"
          >
            {current.body}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="border-t border-white/[0.12] px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.22em] text-ink-800 uppercase">
          Sectors served
        </span>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-400">
          {SECTORS.join(" · ")}
        </p>
      </div>
    </div>
  );
}
