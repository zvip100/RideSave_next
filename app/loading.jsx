export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center py-24 px-6 max-w-[600px] mx-auto">
      {/* Loading Icon/Visual */}
      <div className="mb-8">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

          {/* Inner ring for layered effect */}
          <div className="absolute inset-2 rounded-full border-2 border-accent/30 border-t-accent animate-reverse"></div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="text-[clamp(2rem,6vw,2.5rem)] font-bold tracking-tight leading-tight mb-6 opacity-0 animate-fade-in-delay-1">
        Loading...
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-secondary-foreground max-w-[400px] mb-8 leading-relaxed opacity-0 animate-fade-in-delay-2">
        Please wait while we fetch your data
      </p>

      {/* Progress indicator */}
      <div className="w-full max-w-[300px] opacity-0 animate-fade-in-delay-3">
        <div className="bg-secondary rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent h-full rounded-full animate-shimmer"></div>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-8 opacity-0 animate-fade-in-delay-4">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:100ms]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:200ms]"></div>
      </div>
    </main>
  );
}
