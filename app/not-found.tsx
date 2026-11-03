import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
