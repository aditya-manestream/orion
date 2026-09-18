"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type NavLink = { href: string; label: string };

const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-height slide-in navigation for viewports below `md`, where the
 * header's inline links are hidden. Owns its own focus trap and scroll
 * lock so the drawer never fights Lenis for the scroll position.
 */
export function MobileNav({
  links,
  open,
  onClose,
}: {
  links: NavLink[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Any navigation dismisses the drawer — Next keeps the layout mounted
  // across route changes, so it would otherwise stay open on arrival.
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Lenis reads body overflow, so locking here stops the page behind the
    // drawer from scrolling under the user's thumb.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close navigation"
            tabIndex={-1}
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col border-l border-white/[0.12] bg-navy-deep"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.36, ease: PANEL_EASE }}
          >
            <div className="flex h-[70px] flex-none items-center justify-between border-b border-white/[0.09] px-6">
              <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-ink-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
              {links.map((link, i) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-white/[0.09] py-5 font-display text-[26px] font-semibold tracking-[-0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
                      active ? "text-apricot" : "text-white hover:text-apricot"
                    }`}
                  >
                    <span className="mr-3 font-mono text-[11px] tracking-[0.2em] text-ink-900">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                className="mt-8 bg-rust px-6 py-4 text-center font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request a quote
              </Link>
            </nav>

            <div className="flex-none border-t border-white/[0.09] px-6 py-7">
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                Talk to us
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="tel:+917020475455"
                  className="text-[15px] text-white hover:text-apricot"
                >
                  +91 70204 75455
                </a>
                <a
                  href="mailto:orionpeb@gmail.com"
                  className="text-[15px] text-white hover:text-apricot"
                >
                  orionpeb@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
