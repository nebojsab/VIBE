export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow">
        <h1 className="text-3xl font-semibold tracking-tight">VIBE</h1>
        <p className="mt-2 text-zinc-300">
          Next.js + TypeScript + Tailwind is live.
        </p>

        <div className="mt-6 flex gap-3">
          <a
            className="rounded-xl bg-white text-zinc-900 px-4 py-2 font-medium hover:bg-zinc-200 transition"
            href="#"
          >
            Primary action
          </a>
          <a
            className="rounded-xl border border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-800 transition"
            href="#"
          >
            Secondary
          </a>
        </div>
      </div>
    </main>
  );
}
