import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { activeImageSlots } from "../content/media-inventory.ts";

const root = resolve(import.meta.dirname, "..");
const sourceDir = resolve(root, "assets/source");
const mediaDir = resolve(root, "public/media");

await mkdir(mediaDir, { recursive: true });
const generatedMedia: Record<string, {
  source: string;
  variants: Array<{ src: string; width: number }>;
  avifVariants: Array<{ src: string; width: number }>;
  placeholder: string;
  width: number;
  height: number;
}> = {};

for (const slot of activeImageSlots) {
  const input = resolve(sourceDir, slot.expectedSourceFile);
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`${slot.id}: dimensions source introuvables`);

  for (const width of slot.widths!) {
    const resized = sharp(input).resize({ width, withoutEnlargement: true });
    await resized.clone().webp({ quality: 76, smartSubsample: true, effort: 5 }).toFile(resolve(mediaDir, `${slot.outputBase}-${width}.webp`));
    await resized.clone().avif({ quality: 52, effort: 6 }).toFile(resolve(mediaDir, `${slot.outputBase}-${width}.avif`));
  }
  const placeholder = await sharp(input).resize({ width: 32, withoutEnlargement: true }).blur(2).webp({ quality: 24 }).toBuffer();
  const placeholderData = `data:image/webp;base64,${placeholder.toString("base64")}`;
  const variants = slot.widths!.map((width) => ({ src: `/media/${slot.outputBase}-${width}.webp`, width }));
  const avifVariants = slot.widths!.map((width) => ({ src: `/media/${slot.outputBase}-${width}.avif`, width }));
  generatedMedia[slot.activeSource!] = {
    source: variants.at(-1)!.src,
    variants,
    avifVariants,
    placeholder: placeholderData,
    width: metadata.width,
    height: metadata.height,
  };
}

await writeFile(resolve(root, "app/seo/generated-media.json"), JSON.stringify(generatedMedia, null, 2) + "\n");
await sharp(resolve(sourceDir, "og.png")).jpeg({ quality: 82, mozjpeg: true }).toFile(resolve(root, "public/og.jpg"));
await sharp(resolve(sourceDir, "og.png")).extract({ left: 30, top: 310, width: 240, height: 240 }).resize(128, 128).png({ compressionLevel: 9, palette: true }).toFile(resolve(root, "public/favicon.png"));

console.log(`Generated ${activeImageSlots.reduce((count, slot) => count + slot.widths!.length * 2, 0)} responsive image files, ${activeImageSlots.length} placeholders, og.jpg and favicon.png.`);
