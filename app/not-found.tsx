export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
