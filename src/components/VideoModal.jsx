"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Link2,
  Check,
} from "lucide-react";

export default function VideoModal({ video, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = speed;
  }, [speed]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(video.videoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/80 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[70vh] overflow-hidden bg-black flex items-center">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full max-h-[70vh] object-contain"
            autoPlay
            loop
            playsInline
            onTimeUpdate={(e) =>
              setProgress(
                e.target.duration ? e.target.currentTime / e.target.duration : 0
              )
            }
            onClick={togglePlay}
          />
        </div>

        <div className="h-1 bg-zinc-800">
          <div
            className="h-full bg-red-500 transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm truncate">{video.title}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{video.date}</p>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors"
              aria-label="Phát/Tạm dừng"
            >
              {playing ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                const v = videoRef.current;
                if (v) v.muted = !v.muted;
                setMuted(!muted);
              }}
              className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Âm thanh"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="flex rounded-full bg-zinc-800 overflow-hidden">
              {speeds.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-2 text-[11px] font-medium transition-colors ${
                    speed === s
                      ? "bg-zinc-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <div className="flex-1" />

            <button
              onClick={copyLink}
              className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Link2 className="w-5 h-5" />
              )}
            </button>

            <a
              href={video.videoUrl}
              download={`${video.id}.mp4`}
              className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Tải xuống"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
