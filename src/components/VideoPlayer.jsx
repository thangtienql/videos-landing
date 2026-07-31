"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Download, Copy, X, ChevronLeft } from "lucide-react";

export function VideoPlayer({ video, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // Auto play on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
    // Hide controls after 3s
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "f") toggleFullscreen();
      if (e.key === "ArrowLeft") skip(-10);
      if (e.key === "ArrowRight") skip(10);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(!playing);
  }, [playing]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const skip = (secs) => {
    if (videoRef.current) {
      videoRef.current.currentTime += secs;
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else { videoRef.current.requestFullscreen(); }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pct * duration;
    }
  };

  const handleRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(video.videoUrl);
    alert("Đã copy link!");
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={() => setShowControls(!showControls)}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-zinc-800/80 rounded-full hover:bg-zinc-700 transition-colors"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Back button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1.5 bg-zinc-800/80 rounded-full text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={16} /> Quay lại
      </button>

      {/* Video */}
      <div className="relative w-full max-w-lg max-h-[90vh] flex items-center">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-auto max-h-[90vh] object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          playsInline
        />
      </div>

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 py-3 z-10">
          {/* Progress bar */}
          <div
            className="w-full h-1 bg-zinc-700 rounded-full cursor-pointer mb-3 group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-white rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="hover:opacity-80">
                {playing ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="hover:opacity-80">
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              <span className="text-sm text-zinc-400">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed */}
              <select
                value={playbackRate}
                onChange={(e) => { e.stopPropagation(); handleRate(Number(e.target.value)); }}
                className="bg-zinc-800 text-zinc-300 text-xs rounded px-2 py-1 border-none outline-none"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(r => (
                  <option key={r} value={r}>{r}x</option>
                ))}
              </select>

              <button onClick={(e) => { e.stopPropagation(); copyLink(); }} className="p-1.5 hover:bg-zinc-700 rounded" title="Copy link">
                <Copy size={18} />
              </button>
              <a
                href={video.videoUrl}
                download
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:bg-zinc-700 rounded"
                title="Download"
              >
                <Download size={18} />
              </a>
            </div>
          </div>

          {/* Title */}
          <p className="text-sm text-zinc-300 mt-2 truncate">{video.title}</p>
        </div>
      )}
    </div>
  );
}
