import Image from "next/image";

type PhotoPlaceholderProps = {
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
  figLabel?: string;
  tag?: string;
  caption?: string;
  subcaption?: string;
  corners?: boolean;
  overlay?: boolean;
  background?: string;
  className?: string;
};

/**
 * Renders real site/project photography when `src` is supplied; otherwise
 * falls back to a generated stand-in (grid texture, corner marks, fig
 * captions) so unphotographed sections still read as intentional.
 *
 * `className` controls the outer layout box (size/position/aspect-ratio) so
 * it never collides with the fixed `relative` positioning the inner content
 * box needs for the `fill`-mode image and its overlays.
 */
export function PhotoPlaceholder({
  src,
  alt = "",
  fit = "cover",
  figLabel,
  tag,
  caption,
  subcaption,
  corners = true,
  overlay = true,
  background,
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div className={className}>
      <div
        className="relative h-full w-full overflow-hidden bg-navy-deep"
        style={
          background
            ? { background }
            : src
              ? undefined
              : {
                  backgroundImage:
                    "linear-gradient(155deg, #16283f 0%, #0b1728 55%, #0e1d31 100%)",
                }
        }
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(224,145,106,0.09) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(224,145,106,0.09) 0 1px, transparent 1px 48px)",
            }}
          />
        )}
        {overlay && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/10 via-transparent to-navy-deep/85" />
        )}

        {corners && (
          <>
            <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-rust" />
            <div className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2 border-rust" />
          </>
        )}

        {tag && (
          <span className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.2em] text-white/90">
            {tag}
          </span>
        )}

        {figLabel && (
          <span className="absolute top-8 left-9 font-mono text-[11px] tracking-[0.22em] uppercase text-apricot">
            {figLabel}
          </span>
        )}

        {(caption || subcaption) && (
          <div className="absolute right-8 bottom-8 left-9">
            {caption && (
              <span className="block font-display text-[clamp(19px,1.7vw,26px)] leading-tight font-semibold tracking-tight text-white">
                {caption}
              </span>
            )}
            {subcaption && (
              <span className="mt-2 block font-mono text-[11px] tracking-[0.14em] text-ink-700">
                {subcaption}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
