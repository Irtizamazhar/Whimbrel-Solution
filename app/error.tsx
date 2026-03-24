"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5">
      <div className="w-full max-w-xl rounded-3xl border border-navy-4 bg-navy-2 p-9 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-teal">Something went wrong</p>
        <h1 className="mt-3 font-cormorant text-2xl text-text sm:text-3xl">
          An error occurred
        </h1>
        <p className="mt-4 text-text-muted">
          We could not complete your request. Please try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:bg-teal-light"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex rounded-full border border-teal/60 px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal/10"
            data-cursor="link"
            data-magnetic="true"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
