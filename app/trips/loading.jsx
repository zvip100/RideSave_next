export default function TripsLoading() {
  return (
    <main className="min-h-screen">
      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="w-32 h-9 rounded-lg bg-secondary animate-pulse mb-2" />
            <div className="w-24 h-5 rounded bg-secondary animate-pulse" />
          </div>
          <div className="w-28 h-10 rounded-lg bg-secondary animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-border px-6 py-4 flex gap-6">
            {["w-16", "w-40", "w-20", "w-24", "w-24", "w-32"].map(
              (width, i) => (
                <div
                  key={i}
                  className={`${width} h-4 rounded bg-muted animate-pulse`}
                />
              )
            )}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="px-6 py-4 flex items-center gap-6"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Date */}
                <div className="flex flex-col gap-1.5 min-w-[64px]">
                  <div className="w-14 h-4 rounded bg-secondary/80 animate-shimmer" />
                  <div className="w-12 h-3 rounded bg-muted animate-shimmer" />
                </div>

                {/* Route */}
                <div className="flex flex-col gap-2 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                    <div className="w-36 h-3 rounded bg-secondary/80 animate-shimmer" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" />
                    <div className="w-28 h-3 rounded bg-secondary/80 animate-shimmer" />
                  </div>
                </div>

                {/* Type */}
                <div className="min-w-[80px]">
                  <div className="w-16 h-6 rounded-md bg-primary/10 animate-shimmer" />
                </div>

                {/* Payment */}
                <div className="min-w-[96px]">
                  <div className="w-16 h-4 rounded bg-secondary/80 animate-shimmer" />
                </div>

                {/* Extras */}
                <div className="min-w-[96px]">
                  <div className="w-20 h-4 rounded bg-muted animate-shimmer" />
                </div>

                {/* Notes */}
                <div className="min-w-[128px]">
                  <div className="w-24 h-4 rounded bg-muted animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats Skeleton */}
        <div className="mt-6 flex gap-6">
          <div className="w-24 h-4 rounded bg-secondary animate-pulse" />
          <div className="w-20 h-4 rounded bg-secondary animate-pulse" />
        </div>
      </div>
    </main>
  );
}
