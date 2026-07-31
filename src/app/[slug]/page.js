import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { getVideo, formatDuration } from "@/lib/videos";
import ShareButton from "@/components/ShareButton";

export const dynamic = "force-dynamic";

export default async function VideoDetailPage({ params }) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Video Gallery
        </Link>

        <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            loop
            playsInline
            className="w-full aspect-[9/16] object-cover bg-black"
          />
        </div>

        <div className="mt-5">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <p className="text-sm text-zinc-500 mt-1">{video.date}</p>

          <div className="flex gap-2 mt-5">
            <a
              href={video.videoUrl}
              download={`${video.id}.mp4`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-100 text-sm font-medium hover:bg-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <Download className="w-4 h-4" />
              Tải xuống
            </a>
            <ShareButton url={video.videoUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

