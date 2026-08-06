import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { activeImageSlots, mediaInventory } from "../content/media-inventory.ts";

const root = resolve(import.meta.dirname, "..");
const requiredFields = [
  "id", "route", "area", "type", "purpose", "orientation", "aspectRatio", "focalPoint",
  "recommendedResolution", "framing", "formats", "priority", "status", "expectedSourceFile",
  "loading", "altGuidance",
] as const;

const schemaIssues = mediaInventory.flatMap((slot) => requiredFields
  .filter((field) => !String(slot[field] ?? "").trim())
  .map((field) => `${slot.id || "slot sans identifiant"}: ${field} manquant`));

const duplicateIds = [...new Set(mediaInventory
  .filter((slot, index) => mediaInventory.findIndex((candidate) => candidate.id === slot.id) !== index)
  .map((slot) => slot.id))];
if (duplicateIds.length) schemaIssues.push(`Identifiants dupliqués: ${duplicateIds.join(", ")}`);

const activeSourceChecks = await Promise.all(activeImageSlots.map(async (slot) => {
  try {
    await access(resolve(root, "assets/source", slot.expectedSourceFile));
    return { id: slot.id, source: slot.expectedSourceFile, ready: true };
  } catch {
    return { id: slot.id, source: slot.expectedSourceFile, ready: false };
  }
}));

const counts = Object.fromEntries(["P0", "P1", "P2"].map((priority) => [priority, mediaInventory.filter((slot) => slot.priority === priority).length]));
const verified = mediaInventory.filter((slot) => slot.status === "verified-academy").length;
const temporary = mediaInventory.filter((slot) => slot.status === "temporary-active").length;
const awaiting = mediaInventory.filter((slot) => slot.status === "awaiting-authentic").length;
const priorityZero = mediaInventory.filter((slot) => slot.priority === "P0");

const report = {
  validManifest: schemaIssues.length === 0,
  totalSlots: mediaInventory.length,
  byPriority: counts,
  verifiedAcademyMedia: verified,
  temporaryActiveMedia: temporary,
  awaitingAuthenticMedia: awaiting,
  launchReady: priorityZero.every((slot) => slot.status === "verified-academy") && temporary === 0,
  activeSourceChecks,
  schemaIssues,
};

console.log(JSON.stringify(report, null, 2));
if (schemaIssues.length || activeSourceChecks.some((check) => !check.ready)) process.exitCode = 1;
