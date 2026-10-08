"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../reveal";

type Step = {
  label: string;
  title: string;
  system?: string;
  body: string;
};

// One entry per scene stage (see peb-scene.ts). Milestones 01-06 follow the
// erection sequence in Orion's brochure; systems D.01-D.04 follow its anatomy.
const STEPS: Step[] = [
  {
    label: "Milestone 01 of 06",
    title: "Anchor bolts",
    body: "High-tensile anchor bolts are embedded in concrete pedestals, locked into the sub-base exactly where each column will stand.",
  },
  {
    label: "Milestone 02 of 06",
    title: "Column positioning",
    system: "D.01 Primary frame",
    body: "Tapered main columns are hoisted onto the bolts by crane and checked plumb with laser levels.",
  },
  {
    label: "Milestone 03 of 06",
    title: "Rafter splicing",
    system: "D.01 Primary frame",
    body: "Rafters are bolted to the column heads and spliced at the ridge, closing each portal frame. These heavy tapered members carry every load to the foundation.",
  },
  {
    label: "Milestone 04 of 06",
    title: "Purlins and girts",
    system: "D.02 Secondary rows",
    body: "Z-purlins along the roof and C-girts along the walls tie the frames together, with cable bracing in the end bays holding global alignment.",
  },
  {
    label: "Milestone 05 of 06",
    title: "Roof sheets",
    system: "D.03 Cladding system",
    body: "Galvalume roof panels are sealed with fast-running screws, with skylight sheets and a ridge ventilator built into the run.",
  },
  {
    label: "Milestone 06 of 06",
    title: "Wall cladding",
    system: "D.03 Cladding system",
    body: "Interlocking wall panels close the shell around the dock shutters and personnel doors.",
  },
  {
    label: "Fit-out",
    title: "Structural utilities",
    system: "D.04 Structural utilities",
    body: "Crane runway brackets, an overhead crane, mezzanine platforms and dock canopies, planned into the frame from the first drawing.",
  },
  {
    label: "Handover",
    title: "One contract, anchor bolt to handover",
    body: "Every member you just watched go up is designed, supplied and erected by one accountable team.",
  },
];

type SceneApi = {
  update: (stage: number, dt: number) => boolean;
  resize: (w: number, h: number) => void;
  render: () => void;
  dispose: () => void;
};

export function AnatomyModel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const track = trackRef.current!;
    const stageEl = stageRef.current!;
    const canvas = canvasRef.current!;
    let api: SceneApi | null = null;
    let disposed = false;
    let loading = false;
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let lastStep = -1;
    let settling = true;
    let lastProgress = -1;
    let stageCount = STEPS.length;

    const resize = () => {
      if (!api) return;
      api.resize(stageEl.clientWidth, stageEl.clientHeight);
      settling = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stageEl);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!visible || !api) return;
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const stage = progress * stageCount;
      const index = Math.min(stageCount - 1, Math.floor(stage));
      if (index !== lastStep) {
        lastStep = index;
        setStep(index);
      }
      if (progress !== lastProgress || settling) {
        lastProgress = progress;
        settling = api.update(stage, dt);
        api.render();
      }
    };

    const load = async () => {
      loading = true;
      try {
        const mod = await import("./peb-scene");
        if (disposed) return;
        stageCount = mod.STAGE_COUNT;
        api = mod.createPebScene(canvas);
        resize();
        setReady(true);
        raf = requestAnimationFrame(loop);
      } catch {
        if (!disposed) setFailed(true);
      }
    };

    // Load three.js only when the section is close, render only in view.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) settling = true;
        if (visible && !api && !loading) load();
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(track);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      api?.dispose();
    };
  }, []);

  const current = STEPS[step];

  return (
    <section id="anatomy" className="relative bg-navy-mid">
      <div className="mx-auto max-w-[1400px] px-6 pt-[clamp(74px,9vw,140px)] pb-[clamp(28px,3vw,44px)] sm:px-8 lg:px-16">
        <Reveal className="max-w-[60ch]">
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            04 / Anatomy
          </span>
          <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
            What a pre-engineered building is made of
          </h2>
          <p className="mt-[18px] text-pretty text-[clamp(16px,1.25vw,19px)] leading-[1.62] text-ink-600">
            Six erection milestones and four structural systems. Follow one
            Orion building as it goes up, member by member.
          </p>
        </Reveal>
      </div>

      {/* Screen readers and search engines get the whole sequence as text. */}
      <ol className="sr-only">
        {STEPS.map((s) => (
          <li key={s.title}>
            {s.label}: {s.title}. {s.system ? `${s.system}. ` : ""}
            {s.body}
          </li>
        ))}
      </ol>

      <div ref={trackRef} className="relative h-[560vh] lg:h-[680vh]">
        <div
          ref={stageRef}
          className="sticky top-0 h-[100dvh] overflow-hidden border-y border-white/[0.08]"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="3D model of an Orion pre-engineered building being assembled, from anchor bolts to finished shell"
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
          {failed && (
            <Image
              src="/photos/anatomy-of-a-peb-diagram.jpg"
              alt="Labelled cutaway diagram of an Orion pre-engineered building"
              fill
              sizes="100vw"
              className="object-contain p-6"
            />
          )}
          {!ready && !failed && (
            <div className="blueprint-grid absolute inset-0 opacity-60" />
          )}

          {/* Caption: left column on desktop, bottom sheet on mobile. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-mid via-navy-mid/90 to-transparent px-6 pt-16 pb-[92px] sm:px-8 md:pb-8 lg:inset-y-0 lg:right-auto lg:flex lg:w-[min(44vw,560px)] lg:items-center lg:bg-gradient-to-r lg:from-navy-mid lg:via-navy-mid/85 lg:px-16 lg:pt-[120px] lg:pb-0">
            <div className="pointer-events-auto w-full max-w-[420px]">
              <div className="flex gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-[3px] flex-1 transition-colors duration-300 ${
                      i <= step ? "bg-rust" : "bg-white/[0.16]"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-5 lg:mt-7"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] uppercase">
                    <span className="text-ink-600">{current.label}</span>
                    {current.system && (
                      <span className="border border-rust/70 px-2 py-1 text-apricot">
                        {current.system}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-balance font-display text-[clamp(24px,2.4vw,36px)] leading-[1.05] font-semibold tracking-[-0.02em] text-white">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[clamp(15px,1.15vw,17px)] leading-[1.6] text-ink-400">
                    {current.body}
                  </p>
                  {step === STEPS.length - 1 && (
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex min-h-11 items-center bg-rust px-6 font-mono text-xs tracking-[0.16em] text-white uppercase transition-[background-color,transform] hover:bg-rust-dark active:scale-[0.97]"
                    >
                      Request a quote
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
