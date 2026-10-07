"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Fixed header (utility bar + nav) is 108-126px tall; land anchors below it.
const HEADER_OFFSET = -130;

export function SmoothScroll() {
  useEffect(() => {
    // Reduced motion keeps native scrolling; CSS scroll-margin handles anchors.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      anchors: { offset: HEADER_OFFSET },
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
