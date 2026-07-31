export function VideoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-zinc-200 animate-pulse dark:bg-zinc-900 dark:border-zinc-800">
      <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800/60" />
      <div className="p-2.5 space-y-2">
        <div className="h-3.5 bg-zinc-200 rounded w-3/4 dark:bg-zinc-800" />
        <div className="h-3 bg-zinc-200 rounded w-1/2 dark:bg-zinc-800" />
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
