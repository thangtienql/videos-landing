import { listVideos } from "@/lib/r2";

export const revalidate = 60;

export default async function Home() {
  let videos = [];
  let error = null;

  try {
    videos = await listVideos();
  } catch (e) {
    error = e.message;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Video Gallery</h1>
          <span className="text-sm text-zinc-400">{videos.length} videos</span>
        </div>
      </header>

      {error && (
        <div className="max-w-xl mx-auto mt-8 p-4 bg-red-900/50 rounded-lg text-red-200 text-sm text-center">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {videos.length === 0 && !error && (
          <div className="text-center py-20 text-zinc-500">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-lg">Chưa có video nào</p>
            <p className="text-sm mt-2">Video sẽ hiển thị ở đây sau khi pipeline chạy</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl || "#"}
              target="_blank"
              className="group block bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all"
            >
              <video
                src={video.videoUrl}
                className="w-full aspect-[9/16] object-cover bg-zinc-800"
                muted
                preload="metadata"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{video.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(video.timestamp).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
