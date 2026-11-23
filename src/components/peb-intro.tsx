import { Reveal } from "./reveal";

/**
 * Homepage header for the anatomy block: "What is a PEB" on the left,
 * the Anatomy heading on the right, sitting directly above the model.
 * DRAFT COPY: the PEB definition below is pending client review.
 */
export function PebIntro() {
  return (
    <div className="grid grid-cols-1 items-end gap-[clamp(40px,5vw,88px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <Reveal>
        <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
          01 / What is a PEB
        </span>
        <h2 className="mt-3 text-balance font-display text-[clamp(32px,4.2vw,64px)] leading-none font-semibold tracking-[-0.025em] text-white">
          What is a pre-engineered building?
        </h2>
        <div className="mt-[clamp(20px,2vw,28px)] flex max-w-[62ch] flex-col gap-4 text-pretty text-[clamp(16px,1.25vw,19px)] leading-[1.62] text-ink-600">
          <p>
            A pre-engineered building is a steel structure designed as one
            complete system before any steel is cut. Columns, rafters,
            purlins, cladding and fasteners are each sized for the loads on
            your site, fabricated in a factory and bolted together on site.
          </p>
          <p>
            Because the frame is designed around its loads, the main members
            are tapered: deep where the stress is high and lighter where it
            is not. That saves steel and gives wide clear spans without
            interior columns.
          </p>
          <p>
            Fabrication runs in the factory while the foundations are poured,
            so erection can start as soon as the site is ready.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="lg:border-l lg:border-white/[0.12] lg:pl-[clamp(28px,3vw,48px)]">
        <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
          02 / Anatomy
        </span>
        <h2 className="mt-3 text-balance font-display text-[clamp(26px,2.8vw,42px)] leading-[1.02] font-semibold tracking-[-0.02em] text-white">
          What a pre-engineered building is made of
        </h2>
        <p className="mt-[18px] max-w-[44ch] text-pretty text-[clamp(16px,1.25vw,19px)] leading-[1.62] text-ink-600">
          Six erection milestones and four structural systems. Follow one
          Orion building as it goes up, member by member.
        </p>
      </Reveal>
    </div>
  );
}
