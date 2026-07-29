import { PhotoPlaceholder } from "./photo-placeholder";
import { Reveal } from "./reveal";

type PageHeroProps = {
  kicker: string;
  title: string;
  intro?: string;
  photo?: string;
  photoAlt?: string;
};

export function PageHero({ kicker, title, intro, photo, photoAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-[clamp(140px,15vw,180px)] pb-[clamp(56px,7vw,88px)]">
      {photo ? (
        <>
          <PhotoPlaceholder
            src={photo}
            alt={photoAlt ?? ""}
            className="absolute inset-0"
            corners={false}
            overlay={false}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(178deg, rgba(11,23,40,0.9) 0%, rgba(15,30,51,0.62) 45%, #0b1728 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(224,145,106,0.07) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(224,145,106,0.07) 0 1px, transparent 1px 48px)",
          }}
        />
      )}
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
            <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
              {kicker}
            </span>
          </div>
          <h1 className="mt-[clamp(14px,1.8vw,24px)] max-w-[20ch] text-balance font-display text-[clamp(38px,5.6vw,80px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
            {title}
          </h1>
          {intro && (
            <p className="mt-[clamp(18px,2vw,28px)] max-w-[60ch] text-pretty text-[clamp(16px,1.3vw,20px)] leading-[1.6] text-ink-600">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
