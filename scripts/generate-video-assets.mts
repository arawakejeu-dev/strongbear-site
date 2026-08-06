import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const input = resolve(root, "assets/source/home-hero-video-master.mp4");
const outputDir = resolve(root, "public/media");
const manifestPath = resolve(root, "app/seo/generated-video.json");

try {
  await access(input);
} catch {
  const currentManifest = JSON.parse(await readFile(manifestPath, "utf8")) as { ready?: boolean };
  if (!currentManifest.ready) await writeFile(manifestPath, JSON.stringify({ ready: false, slotId: "home.hero-video" }, null, 2) + "\n");
  console.log(currentManifest.ready
    ? "Hero video master absent: existing verified renditions remain active."
    : "Hero video master absent: the optimized backup image remains active.");
  process.exit(0);
}

await mkdir(outputDir, { recursive: true });
const ffmpeg = process.env.MEDIA_FFMPEG ?? "ffmpeg";

async function run(args: string[]) {
  await new Promise<void>((resolvePromise, reject) => {
    const process = spawn(ffmpeg, args, { stdio: "inherit" });
    process.on("error", () => reject(new Error("FFmpeg est requis lorsque le master vidéo est présent. Définissez MEDIA_FFMPEG ou installez ffmpeg.")));
    process.on("exit", (code) => code === 0 ? resolvePromise() : reject(new Error(`FFmpeg a terminé avec le code ${code}`)));
  });
}

const renditions = [
  { name: "desktop", width: 640, media: "(min-width: 48rem)", mp4Crf: "24", webmCrf: "36" },
  { name: "mobile", width: 480, media: "(max-width: 47.99rem)", mp4Crf: "26", webmCrf: "38" },
];

for (const rendition of renditions) {
  const videoFilter = `fps=24,scale='min(${rendition.width},iw)':-2`;
  await run(["-y", "-i", input, "-an", "-vf", videoFilter, "-c:v", "libx264", "-preset", "slow", "-crf", rendition.mp4Crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", resolve(outputDir, `home-hero-video-${rendition.name}.mp4`)]);
  await run(["-y", "-i", input, "-an", "-vf", videoFilter, "-c:v", "libvpx-vp9", "-crf", rendition.webmCrf, "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "3", resolve(outputDir, `home-hero-video-${rendition.name}.webm`)]);
}

await run(["-y", "-ss", "00:00:04", "-i", input, "-frames:v", "1", "-vf", "scale='min(640,iw)':-2", "-c:v", "libwebp", "-quality", "84", "-update", "1", resolve(outputDir, "home-hero-video-thumbnail.webp")]);

await writeFile(manifestPath, JSON.stringify({
  ready: true,
  slotId: "home.hero-video",
  poster: "/media/home-hero-video-thumbnail.webp",
  sources: renditions.flatMap((rendition) => [
    { src: `/media/home-hero-video-${rendition.name}.webm`, type: "video/webm", media: rendition.media },
    { src: `/media/home-hero-video-${rendition.name}.mp4`, type: "video/mp4", media: rendition.media },
  ]),
}, null, 2) + "\n");

console.log("Generated responsive MP4/WebM hero renditions and thumbnail.");
