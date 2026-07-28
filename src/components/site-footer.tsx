import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.09] bg-navy-deep">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-[clamp(32px,4vw,64px)] px-6 pt-[clamp(52px,6vw,86px)] pb-[clamp(36px,4vw,54px)] sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/orion-logo.png"
              alt="Orion Developers"
              width={44}
              height={62}
              className="h-11 w-auto"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[23px] font-bold tracking-tight text-white">
                ORION
              </span>
              <span className="mt-[5px] font-mono text-[9px] tracking-[0.34em] text-apricot uppercase">
                Developers
              </span>
            </span>
          </div>
          <p className="mt-[22px] max-w-[22ch] font-display text-[clamp(17px,1.4vw,21px)] leading-[1.3] font-medium tracking-[-0.015em] text-ink-300">
            Built to rise. Engineered to last.
          </p>
          <p className="mt-3.5 max-w-[34ch] text-pretty text-sm leading-[1.6] text-ink-800">
            Turnkey pre-engineered buildings and steel infrastructure, from
            Nashik, Maharashtra.
          </p>
        </div>
        <div>
          <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
            Explore
          </span>
          <div className="mt-5 flex flex-col gap-3">
            <a href="#practice" className="text-[15px] text-ink-400">
              About Orion
            </a>
            <a href="#capabilities" className="text-[15px] text-ink-400">
              Capabilities
            </a>
            <a href="#anatomy" className="text-[15px] text-ink-400">
              PEB anatomy
            </a>
            <a href="#projects" className="text-[15px] text-ink-400">
              Projects
            </a>
            <a href="#process" className="text-[15px] text-ink-400">
              Process
            </a>
          </div>
        </div>
        <div>
          <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
            We build
          </span>
          <div className="mt-5 flex flex-col gap-3">
            <a href="#build" className="text-[15px] text-ink-400">
              Pre-engineered buildings
            </a>
            <a href="#build" className="text-[15px] text-ink-400">
              Industrial warehouses
            </a>
            <a href="#build" className="text-[15px] text-ink-400">
              Manufacturing facilities
            </a>
            <a href="#build" className="text-[15px] text-ink-400">
              Commercial steel hubs
            </a>
            <a href="#build" className="text-[15px] text-ink-400">
              Roofing &amp; cladding
            </a>
          </div>
        </div>
        <div>
          <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
            Contact
          </span>
          <div className="mt-5 flex flex-col gap-3.5">
            <span className="text-[15px] leading-[1.55] text-ink-400">
              1st Floor, Rushiraj Annex,
              <br />
              D&apos;Souza Colony, College Road,
              <br />
              Nashik — 422005
            </span>
            <a href="tel:+917020475455" className="text-[15px] text-ink-400">
              +91 70204 75455
            </a>
            <a
              href="mailto:orionpeb@gmail.com"
              className="text-[15px] text-ink-400"
            >
              orionpeb@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3.5 border-t border-white/[0.09] px-6 py-[22px] sm:px-8 lg:px-16">
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-900">
          &copy; 2026 Orion Developers. All rights reserved.
        </span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-900">
          Nashik · Maharashtra · India
        </span>
      </div>
      <div className="h-2.5 bg-rust" />
    </footer>
  );
}
