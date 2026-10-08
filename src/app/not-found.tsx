import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center bg-navy">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-[160px] pb-24 sm:px-8 lg:px-16">
        <span className="font-mono text-[13px] tracking-[0.3em] text-apricot uppercase">
          Error 404
        </span>
        <h1 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(40px,6vw,88px)] leading-[0.95] font-bold tracking-[-0.03em] text-white">
          This page isn&apos;t on the drawing.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-ink-600">
          The link may be old or mistyped. Start from the homepage, see
          completed projects, or send us your project details.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center bg-rust px-8 py-4 font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-[background-color,transform] hover:bg-rust-dark active:scale-[0.97]"
          >
            Go to homepage
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center border border-white/[0.34] px-8 py-4 font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-[background-color,border-color,transform] hover:border-apricot hover:bg-apricot/10 active:scale-[0.97]"
          >
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
