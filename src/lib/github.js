const GITHUB_REPO_OWNER = "thangtienql";
const GITHUB_REPO_NAME = "videos-landing";
const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}@main`;

export class RepoTreeFetcher {
  async listVideos() {
    // Lấy danh sách folder trong videos/ từ GitHub API (public, no token needed)
    const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/videos`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/vnd.github+json", "User-Agent": "video-gallery" },
    });

    if (res.status === 404) return []; // chưa có videos/
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`);
    }

    const items = await res.json();
    const folders = items.filter((i) => i.type === "dir");

    const videos = await Promise.all(
      folders.map(async (folder) => {
        const slug = folder.name; // e.g. "1743290000-messi-mls"
        const parts = slug.split("-");
        const ts = parseInt(parts[0]) || 0;
        const title = parts.slice(1).join("-") || slug;

        // Video URL qua jsDelivr CDN
        const videoUrl = `${CDN_BASE}/videos/${slug}/video.mp4`;

        // Thử lấy meta.json nếu có
        let duration = "";
        let date = "";
        try {
          const metaRes = await fetch(`${CDN_BASE}/videos/${slug}/meta.json`, {
            next: { revalidate: 120 },
          });
          if (metaRes.ok) {
            const meta = await metaRes.json();
            duration = meta.duration || "";
            date = meta.date || "";
          }
        } catch {}

        if (!date && ts) {
          date = new Date(ts).toLocaleDateString("vi-VN");
        }

        return { id: slug, title, videoUrl, duration, date };
      })
    );

    // Sort newest first
    return videos.sort((a, b) => {
      const ta = parseInt(a.id.split("-")[0]) || 0;
      const tb = parseInt(b.id.split("-")[0]) || 0;
      return tb - ta;
    });
  }
}
