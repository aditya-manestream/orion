"use client";

import { motion } from "motion/react";
import { PhotoPlaceholder } from "./photo-placeholder";

const STATS = [
  { label: "Scope", value: "Design · Supply · Erection" },
  { label: "Standard", value: "IS 800 · BIS verified" },
  { label: "Contract", value: "Single-vendor turnkey" },
  { label: "Fig. 01", value: "Completed shell, Nashik" },
];

const HERO_BASE_DELAY = 2.3;
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[clamp(620px,93vh,1000px)] flex-col justify-end overflow-hidden bg-navy-deep"
    >
      <PhotoPlaceholder
        src="/photos/site-sunset-completed.jpg"
        alt="Completed Orion pre-engineered building at dusk"
        className="absolute inset-0"
        corners={false}
        figLabel="Fig. 01 — Completed shell, Nashik"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(178deg, rgba(11,23,40,0.86) 0%, rgba(15,30,51,0.5) 34%, rgba(19,36,59,0.9) 78%, #13243b 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-[clamp(150px,16vw,210px)] pb-[clamp(30px,3vw,44px)] sm:px-8 lg:px-16">
        <motion.div
          className="flex items-center gap-4"
          initial="hidden"
          animate="visible"
          custom={HERO_BASE_DELAY}
          variants={fadeUp}
        >
          <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            Pre-Engineered Buildings
          </span>
        </motion.div>
        <motion.h1
          className="mt-[clamp(18px,2vw,28px)] max-w-[15ch] text-balance font-display text-[clamp(46px,7.6vw,124px)] leading-[0.9] font-bold tracking-[-0.035em] text-white"
          initial="hidden"
          animate="visible"
          custom={HERO_BASE_DELAY + 0.12}
          variants={fadeUp}
        >
          Built to rise. Engineered to last.
        </motion.h1>
        <motion.p
          className="mt-[clamp(20px,2vw,30px)] max-w-[60ch] text-pretty text-[clamp(17px,1.55vw,23px)] leading-[1.58] text-ink-600"
          initial="hidden"
          animate="visible"
          custom={HERO_BASE_DELAY + 0.26}
          variants={fadeUp}
        >
          Orion Developers designs, fabricates and erects steel structures —
          warehouses, factories and industrial sheds — planned to the last
          connection before a single beam is cut.
        </motion.p>
        <motion.div
          className="mt-[clamp(28px,3.2vw,46px)] flex flex-wrap gap-4"
          initial="hidden"
          animate="visible"
          custom={HERO_BASE_DELAY + 0.4}
          variants={fadeUp}
        >
          <a
            href="#contact"
            className="bg-rust px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
          >
            Request a quote
          </a>
          <a
            href="#projects"
            className="border border-white/[0.34] px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:border-apricot hover:bg-apricot/10"
          >
            See our projects
          </a>
        </motion.div>
      </div>

      <motion.div
        className="relative border-t border-white/[0.14] bg-navy-deep/42"
        initial="hidden"
        animate="visible"
        custom={HERO_BASE_DELAY + 0.55}
        variants={fadeUp}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] px-6 sm:px-8 lg:px-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-[22px] ${
                i < STATS.length - 1 ? "border-r border-white/10" : ""
              } ${
                i === 0
                  ? "pl-0 pr-[clamp(16px,2vw,30px)]"
                  : i === STATS.length - 1
                    ? "pl-[clamp(16px,2vw,30px)] pr-0"
                    : "px-[clamp(16px,2vw,30px)]"
              }`}
            >
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                {stat.label}
              </div>
              <div className="mt-[7px] font-display text-[clamp(15px,1.2vw,18px)] font-semibold text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
