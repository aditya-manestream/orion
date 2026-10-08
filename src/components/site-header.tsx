"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  EMAIL_PRIMARY,
  PHONE_PRIMARY,
  whatsappUrl,
} from "@/lib/contact";
import { MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects", label: "Projects" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

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

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // While open: lock page scroll, close on Escape and return focus.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/[0.07] bg-navy-deep">
        <div className="mx-auto flex h-[38px] max-w-[1400px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-14">
          <span className="min-w-0 truncate font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
            Nashik, Maharashtra &middot; Turnkey PEB design, supply &amp;
            erection
          </span>
          <div className="hidden flex-none items-center gap-4 sm:flex sm:gap-7">
            <a
              href={`tel:${PHONE_PRIMARY.tel}`}
              className="font-mono text-[11px] tracking-[0.14em] text-ink-600 hover:text-apricot"
            >
              {PHONE_PRIMARY.display}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.14em] text-ink-600 hover:text-apricot"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL_PRIMARY}`}
              className="hidden font-mono text-[11px] tracking-[0.14em] text-ink-600 hover:text-apricot md:inline"
            >
              {EMAIL_PRIMARY}
            </a>
          </div>
        </div>
      </div>

      <header className="relative">
        <div
          className="absolute inset-0 border-b border-white/[0.09] bg-navy-deep/92 backdrop-blur-md transition-opacity duration-300"
          style={{ opacity: scrolled || menuOpen ? 1 : 0 }}
        />
        <div className="relative mx-auto flex h-[clamp(70px,6vw,88px)] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
          <Link href="/" className="flex min-h-11 flex-none items-center gap-3">
            <Image
              src="/orion-logo.png"
              alt="Orion Developers"
              width={48}
              height={68}
              className="h-[clamp(38px,3.4vw,48px)] w-auto"
              preload
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
          <nav
            aria-label="Main"
            className="flex items-center justify-end gap-4 sm:gap-6 lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="hidden min-h-11 items-center font-mono text-xs tracking-[0.14em] text-ink-400 uppercase hover:text-white aria-[current=page]:text-white md:inline-flex"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="hidden min-h-11 items-center bg-rust px-[22px] font-mono text-xs tracking-[0.16em] text-white uppercase transition-[background-color,transform] hover:bg-rust-dark active:scale-[0.97] sm:inline-flex"
            >
              Request a quote
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-white md:hidden"
            >
              <MenuIcon open={menuOpen} className="h-6 w-6" />
            </button>
          </nav>
        </div>
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-rust transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[108px] bottom-0 overflow-y-auto bg-navy-deep md:hidden"
          data-lenis-prevent
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 pt-4 pb-10">
            {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex min-h-16 items-center border-b border-white/[0.09] font-display text-[30px] font-semibold tracking-[-0.02em] text-white aria-[current=page]:text-apricot"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 flex min-h-14 items-center justify-center bg-rust font-mono text-[13px] tracking-[0.16em] text-white uppercase active:bg-rust-dark"
            >
              Request a quote
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={`tel:${PHONE_PRIMARY.tel}`}
                className="flex min-h-14 items-center justify-center gap-2 border border-white/[0.2] font-mono text-xs tracking-[0.14em] text-white uppercase"
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 border border-white/[0.2] font-mono text-xs tracking-[0.14em] text-white uppercase"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
                WhatsApp
              </a>
            </div>
            <a
              href={`mailto:${EMAIL_PRIMARY}`}
              className="mt-6 inline-flex min-h-11 items-center font-mono text-xs tracking-[0.14em] text-ink-600"
            >
              {EMAIL_PRIMARY}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
