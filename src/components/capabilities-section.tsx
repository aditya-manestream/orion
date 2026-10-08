"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { CapabilitiesDrawing } from "./capabilities-drawing";
import { Reveal } from "./reveal";

type Capability = {
  code: string;
  title: string;
  body: string;
  items: { code?: string; label: string }[];
  fig: string;
};

const CAPABILITIES: Capability[] = [
  {
    code: "C.01",
    title: "Design",
    body: "Every layout begins with precision load mapping for wind, seismic zone and internal crane duty.",
    items: [
      { label: "Structural stress simulation modelling" },
      { label: "General Arrangement blueprints" },
      { label: "Statutory approval drawing packs" },
      { label: "Granular fabrication shop sheets" },
    ],
    fig: "Fig. 03 — GA elevation, portal frame",
  },
  {
    code: "C.02",
    title: "Supply",
    body: "Every component arrives precut, drilled and verified for high-velocity assembly on site.",
    items: [
      { code: "M.01", label: "Built-up tapered primary members" },
      { code: "M.02", label: "Cold-formed secondary purlins" },
      { code: "M.03", label: "Insulated roof cladding packs" },
      { code: "M.04", label: "High-strength structural fasteners" },
    ],
    fig: "Fig. 04 — Member schedule, separated",
  },
  {
    code: "C.03",
    title: "Erection",
    body: "Heavy cranes and trained rigging crews turn modular frames into finished structures.",
    items: [
      { label: "Crane hoisting rig safety procedure" },
      { label: "Laser-guided vertical alignment" },
      { label: "Leakproof roof panel stitching" },
      { label: "Complete turnkey site handover" },
    ],
    fig: "Fig. 05 — Erection sequence",
  },
];

const STAGES = CAPABILITIES.length;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Header({ kicker }: { kicker: string }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-7 border-b border-white/[0.14] pb-[clamp(24px,2.6vw,34px)]">
      <div>
        <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
          {kicker}
        </span>
        <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
          Engineered end to end
        </h2>
      </div>
      <p className="max-w-[38ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
        Three stages, one contract. Nothing handed off, nothing lost between
        vendors.
      </p>
    </Reveal>
  );
}

function StageBody({ cap }: { cap: Capability }) {
  return (
    <>
      <p className="text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
        {cap.body}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5 [@media(max-height:720px)]:max-lg:hidden">
        {cap.items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            {item.code ? (
              <span className="mt-[3px] w-10 flex-none font-mono text-[12px] tracking-[0.12em] text-apricot">
                {item.code}
              </span>
            ) : (
              <span className="mt-[9px] h-[5px] w-[5px] flex-none bg-rust" />
            )}
            <span className="text-[15px] leading-[1.5] text-ink-400 lg:text-[16px]">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CapabilitiesSection({
  kicker = "03 / Capabilities",
}: {
  kicker?: string;
}) {
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  );
  return reduce ? (
    <StaticCapabilities kicker={kicker} />
  ) : (
    <PinnedCapabilities kicker={kicker} />
  );
}

/** Pinned for three equal screens; the drawing follows the scroll. */
function PinnedCapabilities({ kicker }: { kicker: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const s = useTransform(scrollYProgress, (v) => v * STAGES);
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(s, "change", (v) => {
    setActive(Math.min(STAGES - 1, Math.floor(v)));
  });

  // Jump to the middle of a stage's screen.
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * ((i + 0.62) / STAGES) });
  };

  const cap = CAPABILITIES[active];

  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-[1400px] px-6 pt-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Header kicker={kicker} />
      </div>

      <div ref={trackRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-5 px-6 pt-[112px] pb-[84px] sm:px-8 md:pb-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-[clamp(40px,5vw,88px)] lg:px-16 lg:pt-[110px]">
            {/* Stage list. On phones: tabs under the drawing. */}
            <div className="order-2 lg:order-1">
              <div className="h-[3px] w-full bg-white/[0.12]" aria-hidden>
                <motion.div className="h-full bg-rust" style={{ width: fill }} />
              </div>
              <div
                aria-label="Capability stages"
                className="mt-4 grid grid-cols-3 gap-2 lg:mt-8 lg:flex lg:flex-col lg:gap-0"
              >
                {CAPABILITIES.map((c, i) => (
                  <button
                    key={c.code}
                    type="button"
                    aria-current={active === i ? "step" : undefined}
                    onClick={() => goTo(i)}
                    className={`flex min-h-11 items-center gap-2.5 text-left transition-colors duration-200 lg:gap-4 lg:border-t lg:border-white/[0.12] lg:py-4 ${
                      active === i ? "text-white" : "text-ink-700 hover:text-ink-300"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center border font-mono text-[12px] transition-colors duration-200 lg:h-10 lg:w-10 lg:text-sm ${
                        active === i
                          ? "border-rust-dark bg-rust-dark text-white"
                          : "border-white/[0.2] text-ink-600"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-display text-[16px] font-semibold tracking-[-0.01em] lg:text-[clamp(24px,2.2vw,34px)] lg:tracking-[-0.02em]">
                      {c.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 min-h-[180px] lg:mt-6 lg:min-h-[250px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <StageBody cap={cap} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* The drawing sheet. */}
            <div className="order-1 lg:order-2">
              <div className="relative border border-white/[0.12] bg-navy-deep p-3 sm:p-5">
                <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
                <div className="relative">
                  <CapabilitiesDrawing s={s} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-ink-700 uppercase">
                <span aria-live="polite">{cap.fig}</span>
                <span className="flex-none text-apricot">
                  {cap.code} / C.03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: the finished drawing and all three stages, no pinning. */
function StaticCapabilities({ kicker }: { kicker: string }) {
  const s = useMotionValue(0.99);
  return (
    <section id="capabilities" className="bg-navy">
      <div className="mx-auto max-w-[1400px] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:px-16">
        <Header kicker={kicker} />
        <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[clamp(40px,5vw,88px)]">
          <div className="flex flex-col gap-8">
            {CAPABILITIES.map((c, i) => (
              <div key={c.code} className="border-t border-white/[0.12] pt-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/[0.2] font-mono text-sm text-ink-600">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[clamp(24px,2.2vw,34px)] font-semibold tracking-[-0.02em] text-white">
                    {c.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <StageBody cap={c} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="relative border border-white/[0.12] bg-navy-deep p-3 sm:p-5 lg:sticky lg:top-[150px]">
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <CapabilitiesDrawing s={s} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
