// TODO (you): point this at your actual repo before deploying the navbar.
const GITHUB_URL = "https://github.com/aimanfazal/dexter-lens";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.6 2.29 6.65 5.47 7.73.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.51-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.16-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.24 1.87.89 2.33.68.07-.53.28-.89.51-1.1-1.78-.2-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.84a7.4 7.4 0 0 1 2-.28c.68 0 1.36.09 2 .28 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.15.51.57.82 1.29.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.26.54.76.54 1.53 0 1.11-.01 2-.01 2.27 0 .21.15.48.55.39A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
    </svg>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-canvas/85 px-6 backdrop-blur-sm sm:px-10">
      <span className="font-mono text-sm font-medium uppercase tracking-console text-white">
        Dexter<span className="text-accent">Lens</span>
      </span>

      <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-console text-steel">
        <a
          href="#about"
          className="transition-colors hover:text-accent"
        >
          About
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </nav>
  );
}