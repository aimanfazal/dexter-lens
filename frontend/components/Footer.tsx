// TODO (you): same repo URL as components/Navbar.tsx — worth centralizing
// into one constant once you have a real repo to point at.
const GITHUB_URL = "https://github.com/aimanfazal/prompt-tube";
const LINKEDIN_URL = "https://www.linkedin.com/in/aimanfazal";
const EMAIL_ID = "voidaiman.dev@gmail.com";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl border-t border-border px-6 py-8 sm:px-10">
      <div className="flex flex-col items-center gap-3 text-center font-mono text-[11px] uppercase tracking-console text-steel">

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${EMAIL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn

          </a>
          <a
            href={`${GITHUB_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Report Issue
          </a>
        </div>

        <p className="normal-case text-white/40 hover:text-white">Made by Aiman Fazal</p>
      </div>
    </footer>
  );
}