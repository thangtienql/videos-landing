"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchVideoFolders } from "@/lib/github";

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const folders = await fetchVideoFolders();
      const withDuration = await Promise.all(
        folders.map(async (v) => {
          const dur = await getVideoDuration(v.videoUrl);
          return { ...v, seconds: dur };
        })
      );
      setVideos(withDuration);
    } catch (e) {
      setError(e.message || "Lỗi tải video");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { videos, loading, error, reload: load };
}

function getVideoDuration(url) {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = url;
    v.onloadedmetadata = () => resolve(v.duration);
    v.onerror = () => resolve(0);
    setTimeout(() => resolve(0), 8000);
  });
}
