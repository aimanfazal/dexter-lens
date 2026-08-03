"use client";

import { useState } from "react";
import { PromptForm } from "@/components/PromptForm";
import { ResponseDisplay } from "@/components/ResponseDisplay";
import { ApiError, generate } from "@/lib/api";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await generate({ youtubeUrl, prompt });
      setResponse(result.response);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something unexpected went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12 sm:py-16">
      {/* Status bar */}
      <div className="mb-6 flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] uppercase tracking-console text-steel">
        <span className="flex items-center gap-2">
          <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" />
          Rec
        </span>
        <span>Signal console // model pt&#8209;7</span>
      </div>

      <div className="console-frame border border-border bg-surface/40 px-6 py-8 sm:px-10 sm:py-10">
        <span className="bracket-tr" aria-hidden="true" />
        <span className="bracket-bl" aria-hidden="true" />

        <header className="mb-10 flex flex-col gap-2">
          <h1 className="phosphor-glow text-3xl font-bold tracking-tight text-white">
            PROMPT<span className="text-accent">[TUBE]</span>
          </h1>
          <p className="max-w-md font-mono text-sm text-steel">
            Paste a broadcast URL. Ask it anything. It answers from the transcript.
          </p>
        </header>

        <PromptForm
          youtubeUrl={youtubeUrl}
          prompt={prompt}
          isLoading={isLoading}
          onYoutubeUrlChange={setYoutubeUrl}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
        />

        <div className="mt-10">
          <ResponseDisplay isLoading={isLoading} error={error} response={response} />
        </div>
      </div>
    </main>
  );
}
