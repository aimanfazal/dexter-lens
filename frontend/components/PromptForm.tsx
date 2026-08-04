"use client";

import { useState } from "react";
import { extractYouTubeId } from "@/lib/youtube";

interface PromptFormProps {
  youtubeUrl: string;
  prompt: string;
  isLoading: boolean;
  hasResponse: boolean;
  onYoutubeUrlChange: (value: string) => void;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
}

export function PromptForm({
  youtubeUrl,
  prompt,
  isLoading,
  hasResponse,
  onYoutubeUrlChange,
  onPromptChange,
  onSubmit,
}: PromptFormProps) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  const videoId = hasResponse ? extractYouTubeId(youtubeUrl) : null;
  const showThumbnail = hasResponse && !!videoId && !thumbnailFailed;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-1.5 border-l-2 border-border pl-4">
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
          className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 font-mono text-sm text-white placeholder:text-white/30 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1.5 border-l-2 border-border pl-4">
        <label
          htmlFor="prompt"
          className="font-mono text-[11px] uppercase tracking-console text-steel"
        >
          02 <span className="text-accent">Query</span>{" "}
          <span className="normal-case text-white/30">(optional)</span>
        </label>
        <textarea
          id="prompt"
          rows={2}
          placeholder="Generate a concise summary of this video."
          value={prompt}
          disabled={isLoading}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full resize-y rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-2.5 py-2 font-mono text-sm font-medium uppercase tracking-console text-canvas transition-colors hover:bg-accent-hover hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit sm:px-3"
        >
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            ▶
          </span>
          {isLoading ? "Decoding…" : "Decode signal"}
        </button>

        {showThumbnail && (
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Source video thumbnail"
            loading="lazy"
            onError={() => setThumbnailFailed(true)}
            className="aspect-video h-14 rounded-sm border border-border object-cover sm:h-16"
          />
        )}
      </div>
    </form>
  );
}