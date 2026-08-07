import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Paste a YouTube URL",
    body: "DexterLens retrieves the video's transcript.",
  },
  {
    number: "02",
    title: "Transcript processing",
    body: "The transcript is cleaned and prepared.",
  },
  {
    number: "03",
    title: "AI analysis",
    body: "Groq's Llama model analyzes the transcript.",
  },
  {
    number: "04",
    title: "Receive your answer",
    body: "Ask for summaries, notes, explanations, interview questions, or any custom prompt.",
  },
];

const STACK = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { name: "Supadata", href: "https://supadata.ai" },
  { name: "Groq API", href: "https://x.ai" },
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto mt-10 w-full max-w-5xl scroll-mt-14 px-6 py-10 sm:mt-10 sm:px-10 sm:py-10"
    >
      <span className="font-mono text-[11px] uppercase tracking-console text-steel">
        <span className="text-accent">//</span> How it works
      </span>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
        {STEPS.map((step) => (
          <div key={step.number} className="border-l-2 border-border pl-4">
            <span className="font-mono text-[11px] uppercase tracking-console text-steel">
              {step.number} <span className="text-accent">{step.title}</span>
            </span>
            <p className="mt-1.5 text-sm text-white/70">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-10 border-border pt-6 items-center">
        <span className="font-mono text-[11px] uppercase tracking-console text-steel">
          Built with
        </span>
        <div className="mt-3 flex flex-wrap gap-6">
          {STACK.map((tech) => (
            <Link
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-white/70 hover:text-accent"
            >
              {tech.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}