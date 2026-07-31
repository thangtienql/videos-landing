export function VideoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="aspect-[9/16] bg-zinc-800/60" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function VideoGridSkeleton({ n = 6 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: n }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
