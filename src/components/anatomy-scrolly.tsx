"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "./reveal";

type Stage = {
  code: string;
  title: string;
  body: string;
  focal: [number, number];
};

const STAGES: Stage[] = [
  {
    code: "D.01",
    title: "Primary frame",
    body: "Heavy tapered columns and rafter splices engineered to accept maximum load distribution.",
    focal: [80, 35],
  },
  {
    code: "D.02",
    title: "Secondary rows",
    body: "Interlocking longitudinal Z-purlins and C-girts holding global structural alignment.",
    focal: [72, 20],
  },
  {
    code: "D.03",
    title: "Cladding system",
    body: "Coated galvalume protective panels fitted with engineered sky-lighting sheets.",
    focal: [14, 35],
  },
  {
    code: "D.04",
    title: "Structural utilities",
    body: "Mezzanine platforms, crane runway brackets and weather-sealed entrance canopies.",
    focal: [46, 35],
  },
];

// Progress keyframes: each stage holds for most of its 1/4 segment, with a
// short transition into it. Points must be strictly ascending for useTransform.
const INPUT = [0, 0.23, 0.27, 0.48, 0.52, 0.73, 0.77, 1];
const SCALES = [1.9, 1.9, 2.1, 2.1, 2.1, 2.1, 1.9, 1.9];
const ORIGIN_X = STAGES.flatMap((s) => [s.focal[0], s.focal[0]]);
const ORIGIN_Y = STAGES.flatMap((s) => [s.focal[1], s.focal[1]]);

function stageFromProgress(v: number) {
  return Math.min(3, Math.floor(v * 4));
}

export function AnatomyScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, INPUT, SCALES);
  const originX = useTransform(scrollYProgress, INPUT, ORIGIN_X);
  const originY = useTransform(scrollYProgress, INPUT, ORIGIN_Y);
  const transformOrigin = useMotionTemplate`${originX}% ${originY}%`;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStage(stageFromProgress(v));
  });

  return (
    <section id="anatomy" className="relative bg-navy-mid">
      <div className="mx-auto max-w-[1400px] px-6 pt-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Reveal className="max-w-[60ch]">
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            04 / Anatomy
          </span>
          <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
            What a pre-engineered building is made of
          </h2>
          <p className="mt-[18px] text-pretty text-[clamp(15px,1.25vw,19px)] leading-[1.62] text-ink-600">
            Four systems, each dimensioned before it is cut. Scroll to see
            where each one sits on the structure.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} style={{ height: "400vh" }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-[clamp(32px,4vw,64px)] px-6 sm:px-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:px-16">
            <div>
              <div className="flex gap-2">
                {STAGES.map((stage, i) => (
                  <span
                    key={stage.code}
                    className={`h-[3px] flex-1 transition-colors duration-500 ${
                      i === activeStage ? "bg-rust" : "bg-white/[0.14]"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6"
                >
                  <span className="font-mono text-xs tracking-[0.18em] text-rust">
                    {STAGES[activeStage].code}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(24px,2.2vw,34px)] font-semibold tracking-[-0.02em] text-white">
                    {STAGES[activeStage].title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
                    {STAGES[activeStage].body}
                  </p>
                </motion.div>
              </AnimatePresence>
              <span className="mt-8 hidden font-mono text-[11px] tracking-[0.16em] text-ink-800 uppercase lg:block">
                Keep scrolling
              </span>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#eef1f4]">
              <motion.div
                className="absolute inset-0"
                style={{ scale, transformOrigin }}
              >
                <Image
                  src="/photos/anatomy-of-a-peb-diagram.jpg"
                  alt="Labelled cutaway diagram of an Orion pre-engineered building showing primary frame, purlins, cladding and structural utilities"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="pointer-events-none absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-rust" />
              <div className="pointer-events-none absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2 border-rust" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
