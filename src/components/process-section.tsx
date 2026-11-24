import Link from "next/link";
import {
  EMAIL,
  LANDLINE,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  whatsappUrl,
} from "@/lib/contact";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

export const STEPS = [
  {
    n: "01",
    title: "Enquiry & scoping",
    body: "Span clearances, seismic zone and operational utility factors, evaluated before anything is drawn.",
  },
  {
    n: "02",
    title: "CAD & structural design",
    body: "Frame simulations in global modelling engines to minimise unnecessary building mass.",
  },
  {
    n: "03",
    title: "Shop drawing detailing",
    body: "Component cut files and itemised bills of materials for zero-error factory execution.",
  },
  {
    n: "04",
    title: "Precision fabrication",
    body: "Multi-pass submerged arc welding, clean metal trimming and protective primer coatings.",
  },
  {
    n: "05",
    title: "Sequenced logistics",
    body: "Shipments itemised to match the exact physical assembly order on site.",
  },
  {
    n: "06",
    title: "Erection & handover",
    body: "Alignment checks, high-torque anchoring, leakproof panel stitching and official sign-off.",
  },
];

const detailLabel =
  "font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase";
const detailLink =
  "inline-flex min-h-11 items-center text-[16px] text-white hover:text-apricot";

/** Homepage: the six-step process on the left, get started on the right. */
export function ProcessSection() {
  return (
    <section id="process" className="relative bg-rust">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px), repeating-linear-gradient(90deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 56px)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-[clamp(48px,5vw,80px)] px-6 py-[clamp(74px,9vw,140px)] sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.7fr)] lg:px-16">
        <div>
          <Reveal className="border-b border-white/[0.34] pb-[clamp(22px,2.4vw,32px)]">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-navy uppercase">
              08 / Process
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(32px,3.8vw,58px)] leading-none font-bold tracking-[-0.03em] text-white">
              Scoping to commissioning
            </h2>
            <p className="mt-4 max-w-[44ch] text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-apricot-pale">
              Six milestones. Each one signed off before the next begins.
            </p>
          </Reveal>
          <ol className="mt-[clamp(30px,3.4vw,48px)] grid grid-cols-1 gap-x-[clamp(22px,2.4vw,36px)] gap-y-[clamp(26px,2.8vw,40px)] sm:grid-cols-2 xl:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.n}>
                <Reveal
                  delay={(i % 3) * 0.08}
                  className="h-full border-t-2 border-white/[0.34] pt-5"
                >
                  <span className="font-mono text-[clamp(26px,2.4vw,38px)] leading-none text-navy/42">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(19px,1.5vw,23px)] font-semibold tracking-[-0.015em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] leading-[1.6] text-apricot-pale">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal
          delay={0.12}
          className="self-start bg-navy p-[clamp(28px,3vw,44px)]"
        >
          <div id="contact">
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              09 / Get started
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(30px,3vw,46px)] leading-[0.96] font-bold tracking-[-0.03em] text-white">
              Let&apos;s engineer your next building.
            </h2>
            <p className="mt-4 text-pretty text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-ink-600">
              Send us the site, the span and the use case. We&apos;ll come back
              with a budget, a schedule and a preliminary design.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                className="flex min-h-14 items-center justify-center bg-rust px-6 font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-[background-color,transform] hover:bg-rust-dark active:scale-[0.97]"
              >
                Start a project
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 border border-white/[0.3] font-mono text-xs tracking-[0.14em] text-white uppercase transition-[background-color,border-color,transform] hover:border-apricot hover:bg-apricot/10 active:scale-[0.97]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_PRIMARY.tel}`}
                  className="flex min-h-14 items-center justify-center border border-white/[0.3] font-mono text-xs tracking-[0.14em] text-white uppercase transition-[background-color,border-color,transform] hover:border-apricot hover:bg-apricot/10 active:scale-[0.97]"
                >
                  Call us
                </a>
              </div>
            </div>
          </div>

          <dl className="mt-7 flex flex-col gap-5 border-t border-white/[0.12] pt-6">
            <div>
              <dt className={detailLabel}>Office</dt>
              <dd className="mt-2 text-[16px] leading-[1.6] text-white">
                1st Floor, Rushiraj Annex, D&apos;Souza Colony,
                <br />
                College Road, Nashik — 422005
              </dd>
            </div>
            <div>
              <dt className={detailLabel}>Mobile</dt>
              <dd className="flex flex-wrap gap-x-5">
                <a href={`tel:${PHONE_PRIMARY.tel}`} className={detailLink}>
                  {PHONE_PRIMARY.display}
                </a>
                <a href={`tel:${PHONE_SECONDARY.tel}`} className={detailLink}>
                  {PHONE_SECONDARY.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className={detailLabel}>Landline</dt>
              <dd>
                <a href={`tel:${LANDLINE.tel}`} className={detailLink}>
                  {LANDLINE.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className={detailLabel}>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className={detailLink}>
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
