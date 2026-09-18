import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] items-center bg-navy-deep">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-[clamp(140px,15vw,180px)] pb-[clamp(64px,8vw,110px)] sm:px-8 lg:px-16">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            Error 404
          </span>
        </div>
        <h1 className="mt-[clamp(14px,1.8vw,24px)] max-w-[18ch] text-balance font-display text-[clamp(38px,5.6vw,80px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
          This span doesn&apos;t exist.
        </h1>
        <p className="mt-[clamp(18px,2vw,28px)] max-w-[56ch] text-pretty text-[clamp(16px,1.3vw,20px)] leading-[1.6] text-ink-600">
          The page you were looking for has been moved or never stood here.
          Head back to the site, or tell us what you&apos;re building and
          we&apos;ll take it from there.
        </p>
        <div className="mt-[clamp(28px,3.2vw,44px)] flex flex-wrap gap-4">
          <Link
            href="/"
            className="bg-rust px-7 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="border border-white/[0.22] px-7 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:border-apricot hover:text-apricot"
          >
            View projects
          </Link>
        </div>
      </div>
    </section>
  );
}
