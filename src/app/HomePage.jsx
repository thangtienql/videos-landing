"use client";

import { useMemo, useState } from "react";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import SearchBar from "@/components/SearchBar";
import DateFilter from "@/components/DateFilter";
import StatsBar from "@/components/StatsBar";
import ThemeToggle from "@/components/ThemeToggle";
import { VideoGridSkeleton } from "@/components/Skeleton";
import { Film } from "lucide-react";

const PAGE_SIZE = 12;

export default function HomePage({ videos, error }) {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("all");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = videos || [];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(q));
    }
    if (range === "week") {
      const weekAgo = Date.now() - 7 * 864e5;
      list = list.filter((v) => v.ts * 1000 > weekAgo);
    } else if (range === "month") {
      const monthAgo = Date.now() - 30 * 864e5;
      list = list.filter((v) => v.ts * 1000 > monthAgo);
    }
    return list;
  }, [videos, query, range]);

  const totalSeconds = useMemo(
    () => (videos || []).reduce((a, v) => a + (v.durationSec || 0), 0),
    [videos]
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20 shrink-0">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-lg leading-none tracking-tight">
                Video Gallery
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">AI Coding VN · Video tự động</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2">
            <SearchBar value={query} onChange={setQuery} />
            <DateFilter value={range} onChange={setRange} />
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <StatsBar count={videos?.length || 0} totalSeconds={totalSeconds} />
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {error ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-sm">Không tải được video: {error}</p>
          </div>
        ) : videos === null ? (
          <VideoGridSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-sm">
              {query ? "Không tìm thấy video phù hợp" : "Chưa có video nào"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.slice(0, visible).map((v) => (
                <VideoCard key={v.id} video={v} onClick={setSelected} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisible((n) => n + PAGE_SIZE)}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
                >
                  Xem thêm ({filtered.length - visible} video)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 mt-10">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-zinc-600">
          Video Gallery — made with ❤️
        </div>
      </footer>

      {/* Lightbox */}
      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
