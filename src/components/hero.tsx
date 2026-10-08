"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { PhotoPlaceholder } from "./photo-placeholder";

const STATS = [
  { label: "Scope", value: "Design · Supply · Erection" },
  { label: "Standard", value: "IS 800 · BIS verified" },
  { label: "Contract", value: "Single-vendor turnkey" },
  { label: "Fig. 01", value: "Completed shell, Nashik" },
];

const HERO_BASE_DELAY = 2.7;
const EASE = [0.16, 1, 0.3, 1] as const;

// A negative delay means reduced motion: show the final state immediately
// (no loading screen to wait for, no fade).
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition:
      delay < 0 ? { duration: 0 } : { duration: 0.8, delay, ease: EASE },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const at = (offset: number) => (reduce ? -1 : HERO_BASE_DELAY + offset);

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
        preload
        sizes="100vw"
        figLabel="Fig. 01 — Completed shell, Nashik"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(178deg, rgba(11,23,40,0.86) 0%, rgba(15,30,51,0.5) 34%, rgba(19,36,59,0.9) 78%, #13243b 100%)",
        }}
      />
      {/* Brand "structure on grid": photography under the blueprint grid. */}
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-[clamp(150px,16vw,210px)] pb-[clamp(30px,3vw,44px)] sm:px-8 lg:px-16">
        {/* One H1: the search phrase as the label line, the brand line below. */}
        <h1>
          <motion.span
            className="flex items-center gap-4"
            initial="hidden"
            animate="visible"
            custom={at(0)}
            variants={fadeUp}
          >
            <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
            <span className="font-mono text-[clamp(11px,1vw,13px)] font-normal tracking-[0.3em] text-apricot uppercase">
              Pre-engineered buildings, Nashik
            </span>
          </motion.span>
          <motion.span
            className="mt-[clamp(18px,2vw,28px)] block max-w-[15ch] text-balance font-display text-[clamp(46px,7.6vw,124px)] leading-[0.9] font-bold tracking-[-0.035em] text-white"
            initial="hidden"
            animate="visible"
            custom={at(0.12)}
            variants={fadeUp}
          >
            Built to rise. Engineered to last.
          </motion.span>
        </h1>
        <motion.p
          className="mt-[clamp(20px,2vw,30px)] max-w-[60ch] text-pretty text-[clamp(17px,1.55vw,23px)] leading-[1.58] text-ink-600"
          initial="hidden"
          animate="visible"
          custom={at(0.26)}
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
          custom={at(0.4)}
          variants={fadeUp}
        >
          <Link
            href="/contact"
            className="bg-rust px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-[background-color,border-color,transform] active:scale-[0.97] hover:bg-rust-dark"
          >
            Request a quote
          </Link>
          <a
            href="#projects"
            className="border border-white/[0.34] px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-[background-color,border-color,transform] active:scale-[0.97] hover:border-apricot hover:bg-apricot/10"
          >
            See our projects
          </a>
        </motion.div>
      </div>

      <motion.div
        className="relative border-t border-white/[0.14] bg-navy-deep/42"
        initial="hidden"
        animate="visible"
        custom={at(0.55)}
        variants={fadeUp}
      >
        {/* 2x2 on phones and tablets, one ruled row on desktop. */}
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 px-6 sm:px-8 lg:grid-cols-4 lg:px-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-4 pr-4 lg:py-[22px] ${
                i % 2 === 1 ? "pl-4 lg:pl-0" : ""
              } ${i % 2 === 0 ? "border-r border-white/10 lg:border-r-0" : ""} ${
                i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${
                i < STATS.length - 1 ? "lg:border-r lg:border-white/10" : ""
              } ${i > 0 ? "lg:pl-[clamp(16px,2vw,30px)]" : ""} ${
                i === STATS.length - 1 ? "lg:pr-0" : "lg:pr-[clamp(16px,2vw,30px)]"
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
