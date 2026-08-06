import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const sourceDir = resolve(root, "assets/source");
const mediaDir = resolve(root, "public/media");

const images = [
  { id: "bjj-hero", file: "bjj-hero.jpg", widths: [640, 1024, 1600, 2400] },
  { id: "bjj-class", file: "bjj-class.jpg", widths: [640, 1024, 1600] },
  { id: "mma-training", file: "mma-training.jpg", widths: [640, 1024, 1600] },
  { id: "kids-martial-arts", file: "kids-martial-arts.jpg", widths: [640, 1024, 1600] },
  { id: "kids-hero", file: "kids-hero.webp", widths: [640, 1024, 1536] },
];

await mkdir(mediaDir, { recursive: true });
const placeholders: Record<string, string> = {};

for (const image of images) {
  const input = resolve(sourceDir, image.file);
  for (const width of image.widths) {
    await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: 52, effort: 6 }).toFile(resolve(mediaDir, `${image.id}-${width}.avif`));
  }
  const placeholder = await sharp(input).resize({ width: 32, withoutEnlargement: true }).blur(2).webp({ quality: 24 }).toBuffer();
  placeholders[`/${image.file}`] = `data:image/webp;base64,${placeholder.toString("base64")}`;
}

await writeFile(resolve(root, "app/seo/image-placeholders.json"), JSON.stringify(placeholders, null, 2) + "\n");
await sharp(resolve(sourceDir, "og.png")).jpeg({ quality: 82, mozjpeg: true }).toFile(resolve(root, "public/og.jpg"));
await sharp(resolve(sourceDir, "og.png")).extract({ left: 30, top: 310, width: 240, height: 240 }).resize(128, 128).png({ compressionLevel: 9, palette: true }).toFile(resolve(root, "public/favicon.png"));

console.log(`Generated ${images.reduce((count, image) => count + image.widths.length, 0)} AVIF files, ${images.length} placeholders, og.jpg and favicon.png.`);
