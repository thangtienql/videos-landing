export const GITHUB_REPO_OWNER = "thangtienql";
export const GITHUB_REPO_NAME = "videos-landing";
export const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}@main`;
export const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/main`;

// Parse slug "1743290000-messi-mls" -> { ts, title }
function parseSlug(slug) {
  const m = slug.match(/^(\d{10,13})-(.+)$/);
  if (m) {
    return { ts: parseInt(m[1]), title: m[2].split("-").join(" ") };
  }
  return { ts: 0, title: slug.split("-").join(" ") };
}

// Pretty duration "1:23"
export function formatDuration(sec) {
  if (!sec || isNaN(sec)) return "";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export async function listVideos() {
  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/videos`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "video-gallery" },
  });

  if (res.status === 404) return [];
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${t.slice(0, 200)}`);
  }

  const items = await res.json();
  const folders = items.filter((i) => i.type === "dir");

  const videos = await Promise.all(
    folders.map(async (folder) => {
      const slug = folder.name;
      const { ts, title } = parseSlug(slug);

      let meta = {};
      let durationSec = null;
      let dateStr = null;

      // Try meta.json (deployed alongside video)
      try {
        const metaUrl = `${CDN_BASE}/videos/${slug}/meta.json`;
        const metaRes = await fetch(metaUrl);
        if (metaRes.ok) {
          meta = await metaRes.json();
          if (meta.durationSec) durationSec = parseFloat(meta.durationSec);
          if (meta.date) dateStr = meta.date;
        }
      } catch {}

      // Fallback: probe video duration from the mp4 itself
      if (durationSec == null) {
        try {
          const probe = await fetch(`${CDN_BASE}/videos/${slug}/video.mp4`, {
            headers: { Range: "bytes=0-71" }, // just header
          });
          // Actually probing duration from mp4 is complex; skip
        } catch {}
      }

      if (!dateStr && ts) {
        const d = new Date(ts * (ts < 1e12 ? 1000 : 1));
        dateStr = d.toLocaleDateString("vi-VN");
      }

      return {
        id: slug,
        slug,
        title: meta.title || title,
        videoUrl: `${CDN_BASE}/videos/${slug}/video.mp4`,
        audioUrl: `${CDN_BASE}/videos/${slug}/voice.mp3`,
        script: meta.script || null,
        durationSec,
        duration: formatDuration(durationSec),
        date: dateStr || "",
        ts: ts || 0,
        sizeBytes: meta.sizeBytes || null,
      };
    })
  );

  return videos.sort((a, b) => b.ts - a.ts);
}

export async function getVideo(slug) {
  const all = await listVideos();
  return all.find((v) => v.slug === slug) || null;
}
