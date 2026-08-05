import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { authorityDashboard, authoritySummary, topAuthorityPriorities } from "../app/seo/authority-dashboard";
import { localTerritories } from "../app/seo/local-seo";
import { validateSeoAuthoritySystem } from "../app/seo/validate";

const outputDir = resolve(process.argv[2] ?? "../seo-authority-system");
const issues = validateSeoAuthoritySystem();
if (issues.length) throw new Error(issues.join("\n"));

const csvCell = (value: unknown) => `"${String(value).replaceAll('"', '""')}"`;
const csvHeader = ["Sujet", "Cluster", "Couverture", "Priorité", "Difficulté", "Intention", "Score maillage", "Cible", "Prochaine action"];
const csvRows = authorityDashboard.map((row) => [row.topic, row.cluster, row.coverage, row.priority, row.difficulty, row.intent, row.internalLinkScore, row.targetPath, row.nextAction]);
const csv = [csvHeader, ...csvRows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, "authority-dashboard.csv"), csv);
await writeFile(resolve(outputDir, "authority-dashboard.json"), JSON.stringify({ generatedAt: new Date().toISOString(), summary: authoritySummary, priorities: topAuthorityPriorities, territories: localTerritories, rows: authorityDashboard }, null, 2) + "\n");

console.log(JSON.stringify({ outputDir, rows: authorityDashboard.length, summary: authoritySummary, issues: issues.length }, null, 2));
