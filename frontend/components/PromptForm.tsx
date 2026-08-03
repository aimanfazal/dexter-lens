"use client";

interface PromptFormProps {
  youtubeUrl: string;
  prompt: string;
  isLoading: boolean;
  onYoutubeUrlChange: (value: string) => void;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
}

export function PromptForm({
  youtubeUrl,
  prompt,
  isLoading,
  onYoutubeUrlChange,
  onPromptChange,
  onSubmit,
}: PromptFormProps) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
        <label
          htmlFor="youtube-url"
          className="font-mono text-[11px] uppercase tracking-console text-steel"
        >
          01 <span className="text-accent">Source signal</span>
        </label>
        <input
          id="youtube-url"
          type="url"
          required
          placeholder="https://www.youtube.com/watch?v=..."
          value={youtubeUrl}
          disabled={isLoading}
          onChange={(e) => onYoutubeUrlChange(e.target.value)}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
        <label
          htmlFor="prompt"
          className="font-mono text-[11px] uppercase tracking-console text-steel"
        >
          02 <span className="text-accent">Query</span>{" "}
          <span className="normal-case text-white/30">(optional)</span>
        </label>
        <textarea
          id="prompt"
          rows={4}
          placeholder="Generate a concise summary of this video."
          value={prompt}
          disabled={isLoading}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full resize-y rounded-sm border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-white/30 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-4 py-3 font-mono text-sm font-medium uppercase tracking-console text-canvas transition-colors hover:bg-accent-hover hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit sm:px-8"
      >
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
          ▶
        </span>
        {isLoading ? "Decoding…" : "Decode signal"}
      </button>
    </form>
  );
}
