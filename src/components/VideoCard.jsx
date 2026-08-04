"use client";

import { useState } from "react";
import { Play, Clock3 } from "lucide-react";

export default function VideoCard({ video, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => onClick(video)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group text-left bg-white rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-400 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-500 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
        {/* Poster: video tải metadata trước, mute */}
        <video
          src={video.videoUrl}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hover ? "scale-105" : ""
          }`}
          loading="lazy"
          muted
          playsInline
          preload="metadata"
          onMouseEnter={(e) => {
            e.target.play().catch(() => {});
          }}
          onMouseLeave={(e) => {
            e.target.pause();
            e.target.currentTime = 0;
          }}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[11px] font-medium flex items-center gap-1">
            <Clock3 className="w-3 h-3" />
            {video.duration}
          </div>
        )}
      </div>

      <div className="p-2.5">
        <h3 className="font-semibold text-[13px] leading-snug line-clamp-1 text-zinc-900 group-hover:text-zinc-900 dark:text-zinc-100 dark:group-hover:text-white transition-colors">
          {video.title}
        </h3>
        <p className="text-[11px] text-zinc-500 mt-1">{video.date}</p>
      </div>
    </button>
  );
}
