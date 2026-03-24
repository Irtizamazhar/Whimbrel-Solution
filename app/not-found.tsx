import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5">
      <div className="w-full max-w-xl rounded-3xl border border-navy-4 bg-navy-2 p-9 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-teal">404</p>
        <h1 className="mt-3 font-cormorant text-4xl text-text">Page Not Found</h1>
        <p className="mt-4 text-text-muted">
          The page you requested does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-teal/60 px-6 py-3 text-teal transition hover:bg-teal/10"
          data-cursor="link"
          data-magnetic="true"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
