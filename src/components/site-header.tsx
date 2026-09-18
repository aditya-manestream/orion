"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MobileNav } from "@/components/mobile-nav";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects", label: "Projects" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setScrolled(y > 40);
      setProgress(Math.min(100, (y / max) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/[0.07] bg-navy-deep">
        <div className="mx-auto flex h-[38px] max-w-[1400px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-14">
          <span className="truncate font-mono text-[11px] tracking-[0.2em] text-uppercase text-ink-800 uppercase">
            Nashik, Maharashtra &middot; Turnkey PEB design, supply &amp;
            erection
          </span>
          <div className="hidden flex-none items-center gap-4 sm:flex sm:gap-7">
            <a
              href="tel:+917020475455"
              className="font-mono text-[11px] tracking-[0.14em] text-ink-600 hover:text-apricot"
            >
              +91 70204 75455
            </a>
            <a
              href="mailto:orionpeb@gmail.com"
              className="font-mono text-[11px] tracking-[0.14em] text-ink-600 hover:text-apricot"
            >
              orionpeb@gmail.com
            </a>
          </div>
        </div>
      </div>

      <header className="relative">
        <div
          className="absolute inset-0 border-b border-white/[0.09] bg-navy-deep/92 backdrop-blur-md transition-opacity duration-300"
          style={{ opacity: scrolled ? 1 : 0 }}
        />
        <div className="relative mx-auto flex h-[clamp(70px,6vw,88px)] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
          <Link href="/" className="flex flex-none items-center gap-3">
            <Image
              src="/orion-logo.png"
              alt="Orion Developers"
              width={48}
              height={68}
              className="h-[clamp(38px,3.4vw,48px)] w-auto"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[clamp(20px,1.7vw,25px)] font-bold tracking-tight text-white">
                ORION
              </span>
              <span className="mt-[5px] font-mono text-[9px] tracking-[0.34em] text-apricot uppercase">
                Developers
              </span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-4 sm:gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hidden font-mono text-xs tracking-[0.14em] text-ink-400 uppercase hover:text-white md:inline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-rust px-[22px] py-[13px] font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
            >
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink-300 transition-colors hover:text-white md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M3 6h16M3 11h16M3 16h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
          </nav>
        </div>
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-rust transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </header>

      <MobileNav links={NAV_LINKS} open={menuOpen} onClose={closeMenu} />
    </div>
  );
}
