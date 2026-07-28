"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Member = { d: string; delay: number; tone: "primary" | "secondary" };

const MEMBERS: Member[] = [
  // ground line
  { d: "M20 200 H380", delay: 0, tone: "secondary" },
  // base plates
  { d: "M98 200 H122", delay: 0.12, tone: "secondary" },
  { d: "M278 200 H302", delay: 0.12, tone: "secondary" },
  // columns
  { d: "M110 200 V90", delay: 0.32, tone: "primary" },
  { d: "M290 200 V90", delay: 0.32, tone: "primary" },
  // rafters
  { d: "M110 90 L200 40", delay: 0.78, tone: "primary" },
  { d: "M290 90 L200 40", delay: 0.78, tone: "primary" },
  // purlins, left
  { d: "M129.1 71.4 L135.9 83.6", delay: 1.16, tone: "secondary" },
  { d: "M151.6 58.9 L158.4 71.1", delay: 1.24, tone: "secondary" },
  { d: "M174.1 46.4 L180.9 58.6", delay: 1.32, tone: "secondary" },
  // purlins, right
  { d: "M270.9 71.4 L264.1 83.6", delay: 1.16, tone: "secondary" },
  { d: "M248.4 58.9 L241.6 71.1", delay: 1.24, tone: "secondary" },
  { d: "M225.9 46.4 L219.1 58.6", delay: 1.32, tone: "secondary" },
  // ridge cap
  { d: "M195 40 L205 40", delay: 1.5, tone: "primary" },
];

const MIN_VISIBLE_MS = 2200;
const HARD_TIMEOUT_MS = 4500;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();
    document.body.style.overflow = "hidden";

    const reveal = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, remaining);
    };

    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal);
    }
    const fallback = window.setTimeout(reveal, HARD_TIMEOUT_MS);

    return () => {
      window.removeEventListener("load", reveal);
      window.clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg
            viewBox="0 0 400 240"
            className="h-[clamp(150px,20vw,240px)] w-auto"
            fill="none"
          >
            {MEMBERS.map((member, i) => (
              <motion.path
                key={i}
                d={member.d}
                stroke={member.tone === "primary" ? "#C2622E" : "#E0916A"}
                strokeWidth={member.tone === "primary" ? 3 : 2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: member.tone === "primary" ? 0.5 : 0.28,
                  delay: member.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              ORION
            </span>
            <span className="font-mono text-[10px] tracking-[0.34em] text-apricot uppercase">
              Developers
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
