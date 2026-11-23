"use client";

import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Matches the trimmed video's natural runtime (it settles by ~2.5s) plus a
// short hold before the logo lands in the header.
const VIDEO_DURATION_MS = 2600;
const MIN_VISIBLE_MS = VIDEO_DURATION_MS + 100;
const HARD_TIMEOUT_MS = 4500;
const LAND_S = 0.65;

// Between the decoded WebM (#102740) and MP4 (#13283e) backgrounds, so
// neither shows an edge; the CSS mask feathers what is left.
const VIDEO_BG = "#11283f";

// The oval sits at this share of the flying box's height while it travels.
const OVAL_SHARE = 0.62;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [scope, animate] = useAnimate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Reduced motion: the overlay is hidden by CSS, so skip playback and
    // the scroll lock entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const unmount = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(unmount);
    }

    const start = Date.now();
    const root = document.documentElement;
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      // Try with sound first; browsers silently refuse unless the visitor
      // has engaged before, in which case play muted.
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    let cancelled = false;
    let finished = false;
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      root.removeAttribute("data-logo-landing");
      document.body.style.overflow = "";
      setVisible(false);
    };

    // The finished logo shrinks into the header mark, crossfading from the
    // video's frame logo to the oval, while the navy field clears.
    const land = async () => {
      const fly = (scope.current as HTMLElement | null)?.querySelector<HTMLElement>("[data-fly]");
      const target = document.querySelector<HTMLElement>("[data-brand-mark]");
      if (!fly || !target) return finish();

      const box = fly.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const scale = t.height / (box.height * OVAL_SHARE);
      const x = t.left + t.width / 2 - (box.left + box.width / 2);
      const y = t.top + t.height / 2 - (box.top + box.height / 2);

      root.setAttribute("data-logo-landing", "");
      // If animation frames stall (a backgrounded tab), never leave the page
      // locked behind the overlay.
      window.setTimeout(finish, LAND_S * 1000 + 600);
      const ease = [0.65, 0, 0.35, 1] as const;
      await Promise.all([
        animate("[data-fly-video]", { opacity: 0 }, { duration: 0.3, ease: "easeOut" }),
        animate("[data-fly-oval]", { opacity: 1 }, { duration: 0.3, ease: "easeOut" }),
        animate(fly, { x, y, scale }, { duration: LAND_S, ease }),
        animate("[data-loader-bg]", { opacity: 0 }, { duration: 0.45, delay: 0.2, ease: "easeOut" }),
      ]).catch(() => {});
      finish();
    };

    const reveal = () => {
      if (started.current) return;
      started.current = true;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(land, remaining);
    };

    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal);
    }
    const fallback = window.setTimeout(reveal, HARD_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.removeEventListener("load", reveal);
      window.clearTimeout(fallback);
      root.removeAttribute("data-logo-landing");
      document.body.style.overflow = "";
    };
  }, [animate, scope]);

  if (!visible) return null;

  return (
    <div
      ref={scope}
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center motion-reduce:hidden"
      aria-hidden
    >
      <div
        data-loader-bg
        className="pointer-events-auto absolute inset-0"
        style={{ backgroundColor: VIDEO_BG }}
      />
      <div
        data-fly
        className="relative h-[clamp(220px,26vw,380px)] w-[clamp(220px,26vw,380px)]"
      >
        <video
          ref={videoRef}
          data-fly-video
          className="loader-video h-full w-full object-contain"
          playsInline
          preload="auto"
        >
          <source src="/loading/orion-build.webm" type="video/webm" />
          <source src="/loading/orion-build.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element -- same file the header preloads */}
        <img
          data-fly-oval
          src="/orion-logo.png"
          alt=""
          width={458}
          height={647}
          className="absolute top-1/2 left-1/2 w-auto -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{ height: `${OVAL_SHARE * 100}%` }}
        />
      </div>
    </div>
  );
}
