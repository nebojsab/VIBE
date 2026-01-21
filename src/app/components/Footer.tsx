export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} VIBE</span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}

