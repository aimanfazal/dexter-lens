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

  const hasResponse = !isLoading && !error && !!response;

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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:h-[calc(100vh-3.5rem)] sm:overflow-hidden sm:py-8">
      {/* Status bar */}
      <div className="mb-3 flex shrink-0 items-center justify-between border-b border-border pb-2 font-mono text-[11px] uppercase tracking-console text-steel">
        <span className="flex items-center gap-2">
          <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" />
          Rec
        </span>
        <span>Signal console // model pt&#8209;7</span>
      </div>

      <div className="console-frame flex flex-1 flex-col border border-border bg-surface/40 px-6 py-5 sm:min-h-0 sm:px-10 sm:py-6">
        <span className="bracket-tr" aria-hidden="true" />
        <span className="bracket-bl" aria-hidden="true" />

       <header className="mb-4 flex shrink-0 flex-col items-center gap-1">
        <h1 className="phosphor-glow text-2xl font-bold tracking-tight text-white sm:text-3xl">
          PROMPT<span className="text-accent">[TUBE]</span>
        </h1>

        <p className="font-mono text-[10px] uppercase tracking-console text-steel/60 sm:text-[11px]">
          Decode any broadcast into a queryable signal.
        </p>

        <p className="w-full whitespace-nowrap text-center font-mono text-[11px] text-steel sm:text-sm">
          Paste a broadcast URL. Ask it anything. It answers from the transcript.
        </p>
      </header>

        <div className="shrink-0">
          <PromptForm
            youtubeUrl={youtubeUrl}
            prompt={prompt}
            isLoading={isLoading}
            hasResponse={hasResponse}
            onYoutubeUrlChange={setYoutubeUrl}
            onPromptChange={setPrompt}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="mt-4 flex flex-1 flex-col sm:min-h-0">
          <ResponseDisplay isLoading={isLoading} error={error} response={response} />
        </div>
      </div>
    </main>
  );
}