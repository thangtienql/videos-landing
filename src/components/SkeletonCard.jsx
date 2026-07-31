export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 animate-pulse">
      <div className="aspect-[9/16] bg-zinc-900" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-zinc-900 rounded w-3/4" />
        <div className="h-2.5 bg-zinc-900 rounded w-1/3" />
      </div>
    </div>
  );
}
