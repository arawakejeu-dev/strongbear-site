import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { mediaInventory } from "../content/media-inventory.ts";

const outputDir = resolve(import.meta.dirname, "../docs/media");
await mkdir(outputDir, { recursive: true });

const columns = [
  "id", "route", "area", "type", "purpose", "orientation", "aspectRatio", "focalPoint",
  "recommendedResolution", "framing", "formats", "priority", "status", "expectedSourceFile",
  "loading", "altGuidance", "consentRequired",
] as const;

const escapeCsv = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = [columns.join(","), ...mediaInventory.map((slot) => columns.map((column) => escapeCsv(slot[column])).join(","))].join("\n") + "\n";

await writeFile(resolve(outputDir, "media-inventory.csv"), csv);
await writeFile(resolve(outputDir, "media-inventory.json"), JSON.stringify(mediaInventory, null, 2) + "\n");
console.log(`Exported ${mediaInventory.length} media slots to docs/media.`);
