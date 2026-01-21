export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <span className="text-lg font-semibold tracking-tight">VIBE</span>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <a href="#" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}

