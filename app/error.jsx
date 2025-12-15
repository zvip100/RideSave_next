"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center py-24 px-6 max-w-[600px] mx-auto">
      {/* Error Icon/Visual */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-bold tracking-tight leading-tight mb-6 opacity-0 animate-fade-in-delay-1">
        Something Went Wrong
      </h1>

      {/* Description */}
      <p className="text-xl text-secondary-foreground max-w-[480px] mb-12 leading-relaxed opacity-0 animate-fade-in-delay-2">
        We encountered an unexpected error. Our team has been notified and is
        working to fix the issue.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center opacity-0 animate-fade-in-delay-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] transition-all"
        >
          Try Again
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C7.06812 13 6.18495 12.7596 5.41421 12.3284"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 13V15M8 13L6 11M8 13L10 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-secondary text-foreground border border-border font-medium rounded-xl hover:bg-muted hover:border-muted-foreground transition-all"
        >
          Go Home
        </a>
      </div>

      {/* Error Details */}
      <div className="mt-16 p-6 bg-card border border-border rounded-xl max-w-[500px] w-full opacity-0 animate-fade-in-delay-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Error Details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-foreground">Error:</span>
            <span className="text-muted-foreground font-mono text-xs">
              {error?.name || "Unknown Error"}
            </span>
          </div>
          {process.env.NODE_ENV === "development" && error?.message && (
            <div className="flex justify-between">
              <span className="text-secondary-foreground">Message:</span>
              <span className="text-muted-foreground font-mono text-xs max-w-[200px] truncate">
                {error.message}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-secondary-foreground">Time:</span>
            <span className="text-muted-foreground font-mono text-xs">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            If this problem persists, please contact our support team with the
            error details above.
          </p>
        </div>
      </div>
    </main>
  );
}
