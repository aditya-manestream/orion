"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[72vh] items-center bg-navy-deep">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-[clamp(140px,15vw,180px)] pb-[clamp(64px,8vw,110px)] sm:px-8 lg:px-16">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-[clamp(28px,4vw,58px)] flex-none bg-rust" />
          <span className="font-mono text-[clamp(11px,1vw,13px)] tracking-[0.3em] text-apricot uppercase">
            Something went wrong
          </span>
        </div>
        <h1 className="mt-[clamp(14px,1.8vw,24px)] max-w-[20ch] text-balance font-display text-[clamp(34px,4.8vw,68px)] leading-[1.0] font-bold tracking-[-0.03em] text-white">
          A section of this page failed to load.
        </h1>
        <p className="mt-[clamp(18px,2vw,28px)] max-w-[56ch] text-pretty text-[clamp(16px,1.3vw,20px)] leading-[1.6] text-ink-600">
          This one is on us, not on you. Try again — and if it keeps
          happening, call the office on{" "}
          <a href="tel:+917020475455" className="text-apricot hover:text-white">
            +91 70204 75455
          </a>
          .
        </p>
        <div className="mt-[clamp(28px,3.2vw,44px)] flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="bg-rust px-7 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-white/[0.22] px-7 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-colors hover:border-apricot hover:text-apricot"
          >
            Back to home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-ink-900">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
