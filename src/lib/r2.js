import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY;
const R2_SECRET_KEY = process.env.R2_SECRET_KEY;
const R2_BUCKET = process.env.R2_BUCKET || "videos";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

let client;

function getClient() {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY,
      },
    });
  }
  return client;
}

export async function listVideos() {
  const c = getClient();
  const result = await c.send(
    new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: "videos/", Delimiter: "/" })
  );
  
  const videos = [];
  for (const prefix of result.CommonPrefixes || []) {
    const folder = prefix.Prefix.replace("videos/", "").replace("/", "");
    const [timestamp, ...titleParts] = folder.split("-");
    const title = titleParts.join("-");
    
    // List files in this folder
    const files = await c.send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: prefix.Prefix })
    );
    
    const hasVideo = files.Contents?.some((f) => f.Key.endsWith(".mp4"));
    if (!hasVideo) continue;
    
    const videoFile = files.Contents?.find((f) => f.Key.endsWith("video.mp4"));
    
    videos.push({
      id: folder,
      title: title || "Không có tiêu đề",
      timestamp: parseInt(timestamp) || Date.now(),
      videoUrl: videoFile
        ? `${R2_PUBLIC_URL}/${videoFile.Key}`
        : null,
      durationSec: null, // could be parsed from metadata
    });
  }
  
  return videos.sort((a, b) => b.timestamp - a.timestamp);
}
