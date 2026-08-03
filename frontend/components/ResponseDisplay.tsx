"use client";

import { useState } from "react";

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  response: string | null;
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M2.5 10.5v-7a1 1 0 0 1 1-1h7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M8 2v8" />
      <path d="M4.5 6.5 8 10l3.5-3.5" />
      <path d="M2.5 12.5h11" />
    </svg>
  );
}

export function ResponseDisplay({
  isLoading,
  error,
  response,
}: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const hasResponse = !isLoading && !error && !!response;

  async function handleCopy() {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail in some contexts; nothing more to do.
    }
  }

  async function handleExportPdf() {
    if (!response) return;
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      const margin = 48;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      const lineHeight = 14;

      doc.setFont("courier", "normal");
      doc.setFontSize(11);

      const lines: string[] = doc.splitTextToSize(response, usableWidth);
      let cursorY = margin;

      lines.forEach((line) => {
        if (cursorY > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });

      doc.save("prompttube-response.pdf");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-2 border-l-2 border-border pl-4 sm:min-h-0">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-console text-steel">
          03 <span className="text-accent">Output</span>
        </span>

        {hasResponse && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-console text-steel transition-colors hover:border-accent hover:text-accent"
            >
              <CopyIcon />
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExporting}
              className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-console text-steel transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DownloadIcon />
              {isExporting ? "Exporting…" : "PDF"}
            </button>
          </div>
        )}
      </div>

      <div className="console-scroll min-h-[16rem] flex-1 overflow-y-auto whitespace-pre-wrap rounded-sm border border-border bg-surface px-4 py-4 text-sm text-white/90 sm:min-h-0">
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