import { Button } from "./components/Button";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-5xl flex-col justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow">
        <h1 className="text-3xl font-semibold tracking-tight">VIBE</h1>
        <p className="mt-2 text-zinc-300">
          Next.js + TypeScript + Tailwind is live.
        </p>

        <div className="mt-6 flex gap-3">
          <Button variant="primary">
            Primary action
          </Button>
          <Button variant="secondary" className="text-zinc-100">
            Secondary
          </Button>
        </div>
      </div>
    </section>
  );
}
