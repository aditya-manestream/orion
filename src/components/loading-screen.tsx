"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Matches the trimmed video's natural runtime (it settles by ~2.5s) plus a
// short hold before fading into the site.
const VIDEO_DURATION_MS = 2600;
const MIN_VISIBLE_MS = VIDEO_DURATION_MS + 150;
const HARD_TIMEOUT_MS = 4500;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const start = Date.now();
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      // Try playing with sound first. Browsers never show a permission
      // prompt for this — autoplay-with-sound is either silently allowed
      // (rare, on returning visitors with high "media engagement") or
      // silently rejected, in which case we fall back to muted playback,
      // which is always allowed.
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

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
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#0f2537" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <video
            ref={videoRef}
            className="h-[clamp(220px,26vw,380px)] w-[clamp(220px,26vw,380px)] object-contain"
            playsInline
            preload="auto"
          >
            <source src="/loading/orion-build.webm" type="video/webm" />
            <source src="/loading/orion-build.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
