"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE_PRIMARY, whatsappUrl } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Phones: a bottom bar (Call, WhatsApp, Request a quote) that slides in once
 * the hero is passed. Tablet and desktop: a WhatsApp button in the corner.
 */
export function ContactDock() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Quick contact"
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.6fr] border-t border-white/[0.12] bg-navy-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`tel:${PHONE_PRIMARY.tel}`}
          className="flex h-16 flex-col items-center justify-center gap-1 font-mono text-[11px] tracking-[0.14em] text-ink-300 uppercase active:bg-white/5"
        >
          <PhoneIcon className="h-5 w-5" />
          Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 flex-col items-center justify-center gap-1 border-x border-white/[0.1] font-mono text-[11px] tracking-[0.14em] text-ink-300 uppercase active:bg-white/5"
        >
          <WhatsAppIcon className="h-5 w-5 text-[#25d366]" />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex h-16 items-center justify-center bg-rust px-3 font-mono text-xs tracking-[0.14em] text-white uppercase active:bg-rust-dark"
        >
          Request a quote
        </Link>
      </nav>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Orion on WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden h-14 items-center gap-2.5 bg-[#128c7e] pr-5 pl-4 font-mono text-xs tracking-[0.14em] text-white uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-[background-color,transform] duration-150 hover:bg-[#0e7368] active:scale-[0.97] md:flex"
      >
        <WhatsAppIcon className="h-6 w-6" />
        WhatsApp
      </a>
    </>
  );
}
