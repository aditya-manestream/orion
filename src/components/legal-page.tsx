import { PageHero } from "./page-hero";
import { PHONE_PRIMARY, whatsappUrl } from "@/lib/contact";

type Section = { heading: string; body?: string; items?: string[] };

// Privacy and terms: the Manestream kit's plain-language template (DPDP Act, 2023), in Orion's styles.
// A starting point, not legal advice; Orion's counsel should review it before launch.
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <>
      <PageHero kicker="Orion Developers" title={title} intro={intro} />
      <section className="bg-navy-deep pb-[clamp(72px,9vw,120px)]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
          <div className="max-w-[68ch] space-y-8 text-[17px] leading-[1.7] text-ink-400">
            {sections.map((s) => (
              <div key={s.heading} className="space-y-3">
                <h2 className="font-display text-[clamp(21px,1.8vw,26px)] font-semibold tracking-[-0.015em] text-white">
                  {s.heading}
                </h2>
                {s.body && <p>{s.body}</p>}
                {s.items && (
                  <ul className="list-disc space-y-2 pl-5">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <p className="border-t border-white/[0.12] pt-6 font-mono text-xs tracking-[0.1em] text-ink-600">
              Questions:{" "}
              <a href={`tel:${PHONE_PRIMARY.tel}`} className="underline underline-offset-4 hover:text-apricot">
                {PHONE_PRIMARY.display}
              </a>{" "}
              ·{" "}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-apricot">
                WhatsApp
              </a>{" "}
              · Last updated October 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
