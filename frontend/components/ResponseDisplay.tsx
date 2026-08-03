interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  response: string | null;
}

export function ResponseDisplay({
  isLoading,
  error,
  response,
}: ResponseDisplayProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 border-l-2 border-border pl-4 sm:min-h-0">
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-console text-steel">
        03 <span className="text-accent">Output</span>
      </span>

      <div className="console-scroll min-h-[10rem] flex-1 overflow-y-auto whitespace-pre-wrap rounded-sm border border-border bg-surface px-4 py-4 text-sm text-white/90 sm:min-h-0">
        {isLoading && (
          <div className="flex items-center gap-3 text-steel">
            <span className="signal-meter" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="font-mono text-xs uppercase tracking-console">
              Decoding signal — extracting transcript and generating a response
            </span>
          </div>
        )}

        {!isLoading && error && (
          <span className="font-mono text-sm text-signal">! {error}</span>
        )}

        {!isLoading && !error && response && response}

        {!isLoading && !error && !response && (
          <span className="font-mono text-xs uppercase tracking-console text-white/30">
            Standby — paste a broadcast URL above to receive a transmission.
          </span>
        )}
      </div>
    </div>
  );
}