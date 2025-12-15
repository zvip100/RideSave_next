import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center py-24 px-6 max-w-[600px] mx-auto">
      {/* 404 Icon/Visual */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
          <SearchX className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-bold tracking-tight leading-tight mb-6 opacity-0 animate-fade-in-delay-1">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-xl text-secondary-foreground max-w-[480px] mb-12 leading-relaxed opacity-0 animate-fade-in-delay-2">
        The page you're looking for doesn't exist. It might have been moved,
        deleted, or you entered the wrong URL.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center opacity-0 animate-fade-in-delay-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] transition-all"
        >
          Go Home
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          href="/trips"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-secondary text-foreground border border-border font-medium rounded-xl hover:bg-muted hover:border-muted-foreground transition-all"
        >
          View Trips
        </Link>
      </div>
    </main>
  );
}
