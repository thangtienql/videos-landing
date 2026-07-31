import { listVideos } from "@/lib/videos";
import HomePage from "./HomePage";

export const revalidate = 60;

export default async function Home() {
  let videos = null;
  let error = null;

  try {
    videos = await listVideos();
  } catch (e) {
    error = e.message;
  }

  return <HomePage videos={videos} error={error} />;
}
