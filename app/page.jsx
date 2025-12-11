import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="w-full max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚕</span>
            <span className="text-2xl font-bold tracking-tight">RideSave</span>
          </div>
          <nav className="flex gap-8 items-center">
            <Link
              href="/trips"
              className="text-secondary-foreground text-[0.9375rem] hover:text-foreground transition-colors"
            >
              Trips
            </Link>
            <Link
              href="/api"
              className="bg-secondary text-foreground border border-border py-2 px-4 text-sm rounded-xl hover:bg-muted hover:border-muted-foreground transition-all"
            >
              API Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center py-24 px-6 max-w-[1400px] mx-auto min-h-[calc(100vh-100px)] max-h-[900px]">

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold tracking-tight leading-tight mb-6 max-w-[800px] opacity-0 animate-fade-in-delay-1">
          Track Your Trips,<br />
          <span className="text-primary">Save Time.</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-secondary-foreground max-w-[600px] mb-12 leading-relaxed opacity-0 animate-fade-in-delay-2">
          RideSave helps you manage and track your trips effortlessly.
          Send an SMS, get it logged. Simple as that.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap justify-center opacity-0 animate-fade-in-delay-3">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] transition-all"
          >
            View Trips
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/api"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-secondary text-foreground border border-border font-medium rounded-xl hover:bg-muted hover:border-muted-foreground transition-all"
          >
            API Documentation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-border">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 text-2xl">
                📱
              </div>
              <h3 className="text-lg font-semibold mb-2">SMS Integration</h3>
              <p className="text-secondary-foreground text-[0.9375rem] leading-relaxed">
                Log trips by sending a simple text message. No app needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h3 className="text-lg font-semibold mb-2">Weekly Reports</h3>
              <p className="text-secondary-foreground text-[0.9375rem] leading-relaxed">
                Get beautiful email reports summarizing your weekly trips.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast API</h3>
              <p className="text-secondary-foreground text-[0.9375rem] leading-relaxed">
                RESTful API for all your trip management needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 RideSave. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
