"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import SearchBar from "@/components/SearchBar";
import StatsBar from "@/components/StatsBar";
import Pagination from "@/components/Pagination";

export default function Gallery({ videos }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase())
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StatsBar videos={videos} />
      <SearchBar value={query} onChange={setQuery} />

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-lg">Không tìm thấy video nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {visible.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      <Pagination
        hasMore={hasMore}
        onLoadMore={() => setVisibleCount((c) => c + 12)}
        remaining={filtered.length - visibleCount}
      />
    </div>
  );
}
