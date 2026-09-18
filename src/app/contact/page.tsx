import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Send Orion Developers your site, span and use case for a preliminary pre-engineered building design and schedule.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Get started"
        title="Let's engineer your next building."
        intro="Send us the site, the span and the use case. We'll come back with a budget, a schedule and a preliminary design."
      />

      <section className="bg-navy">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-[clamp(40px,5vw,80px)] px-6 py-[clamp(56px,7vw,100px)] sm:px-8 lg:px-16">
          <Reveal className="border border-white/[0.12] bg-navy-mid p-[clamp(28px,3.2vw,44px)]">
            <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
              Project enquiry
            </span>
            <h2 className="mt-3 text-balance font-display text-[clamp(22px,2vw,30px)] font-semibold tracking-[-0.02em] text-white">
              Tell us what you&apos;re building
            </h2>
            <div className="mt-7">
              <EnquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-8">
            <div className="border border-white/[0.12] bg-navy-mid p-[clamp(28px,3.2vw,44px)]">
              <span className="font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
                Orion Developers
              </span>
              <div className="mt-6 flex flex-col gap-6">
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
            </div>

            <div className="border-t-[3px] border-rust bg-navy-mid p-[clamp(28px,3.2vw,44px)]">
              <h3 className="font-display text-[clamp(19px,1.6vw,23px)] font-semibold tracking-[-0.015em] text-white">
                Prefer to call directly?
              </h3>
              <p className="mt-3 text-pretty text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-ink-600">
                Site visits and on-ground conversations move faster by phone
                — call the office and we&apos;ll get an engineer on the line.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
