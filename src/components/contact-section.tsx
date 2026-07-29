import Link from "next/link";
import { Reveal } from "./reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(224,145,106,0.07) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(224,145,106,0.07) 0 1px, transparent 1px 48px)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-[clamp(40px,5vw,80px)] px-6 py-[clamp(80px,10vw,150px)] sm:px-8 lg:px-16">
        <Reveal>
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            09 / Get started
          </span>
          <h2 className="mt-[clamp(14px,1.6vw,22px)] text-balance font-display text-[clamp(36px,5.4vw,86px)] leading-[0.92] font-bold tracking-[-0.035em] text-white">
            Let&apos;s engineer your next building.
          </h2>
          <p className="mt-[clamp(20px,2.2vw,30px)] max-w-[52ch] text-pretty text-[clamp(16px,1.35vw,21px)] leading-[1.6] text-ink-600">
            Send us the site, the span and the use case. We&apos;ll come back
            with a budget, a schedule and a preliminary design.
          </p>
          <div className="mt-[clamp(28px,3.2vw,44px)] flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-rust px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
            >
              Start a project
            </Link>
            <a
              href="tel:+917020475455"
              className="border border-white/[0.34] px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:border-apricot hover:bg-apricot/10"
            >
              Call the office
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="border border-white/[0.12] bg-navy-mid p-[clamp(30px,3.4vw,48px)]">
          <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
            Orion Developers
          </span>
          <div className="mt-[26px] flex flex-col gap-6">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                Office
              </div>
              <div className="mt-2 text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-white">
                1st Floor, Rushiraj Annex, D&apos;Souza Colony,
                <br />
                College Road, Nashik — 422005
              </div>
            </div>
            <div className="border-t border-white/[0.12] pt-[22px]">
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                Mobile
              </div>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="tel:+917020475455"
                  className="text-[clamp(15px,1.2vw,18px)] text-white"
                >
                  +91 70204 75455
                </a>
                <a
                  href="tel:+918530122776"
                  className="text-[clamp(15px,1.2vw,18px)] text-white"
                >
                  +91 85301 22776
                </a>
              </div>
            </div>
            <div className="border-t border-white/[0.12] pt-[22px]">
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                Landline
              </div>
              <a
                href="tel:02536911208"
                className="mt-2 block text-[clamp(15px,1.2vw,18px)] text-white"
              >
                0253 691 1208
              </a>
            </div>
            <div className="border-t border-white/[0.12] pt-[22px]">
              <div className="font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase">
                Email
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <a
                  href="mailto:orionpeb@gmail.com"
                  className="text-[clamp(15px,1.2vw,18px)] text-white"
                >
                  orionpeb@gmail.com
                </a>
                <a
                  href="mailto:mayur.orion@gmail.com"
                  className="text-[clamp(15px,1.2vw,18px)] text-white"
                >
                  mayur.orion@gmail.com
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
