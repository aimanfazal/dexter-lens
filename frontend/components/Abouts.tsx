const STEPS = [
  {
    number: "01",
    title: "Paste a YouTube URL",
    body: "PromptTube retrieves the video's transcript.",
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

const STACK = ["Next.js", "FastAPI", "Supadata", "Groq API", "Vercel"];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto mt-10 w-full max-w-5xl scroll-mt-14 px-6 py-10 sm:mt-16 sm:px-10 sm:py-14"
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

      <div className="mt-10 border-t border-border pt-6">
        <span className="font-mono text-[11px] uppercase tracking-console text-steel">
          Built with
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}