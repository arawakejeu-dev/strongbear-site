import { internalLinkGraph, internalLinkScore } from "./internal-links";
import { allSemanticTopics, topicalClusters, type SemanticTopic } from "./topical-map";

export type AuthorityDashboardRow = {
  topic: string;
  cluster: string;
  coverage: SemanticTopic["coverage"];
  priority: SemanticTopic["priority"];
  difficulty: SemanticTopic["difficulty"];
  intent: SemanticTopic["intent"];
  internalLinkScore: number;
  targetPath: string;
  nextAction: string;
};

function scoreTopic(topic: SemanticTopic) {
  if (!topic.targetPath) return 0;
  const path = topic.targetPath.split("#")[0];
  const liveNode = internalLinkGraph.find((node) => node.path === path && node.status === "live");
  if (liveNode) return internalLinkScore(liveNode);
  if (topic.coverage === "planned") return 25;
  if (topic.coverage === "evidence-blocked") return 10;
  return 0;
}

function nextAction(topic: SemanticTopic) {
  if (topic.coverage === "published") return "Renforcer les liens et actualiser les preuves";
  if (topic.coverage === "planned") return "Rédiger, sourcer, relire, puis publier";
  if (topic.coverage === "evidence-blocked") return "Collecter les preuves réelles avant rédaction";
  return topic.priority === "P0" ? "Créer le pilier manquant" : "Qualifier l’intention et la preuve";
}

export const authorityDashboard: AuthorityDashboardRow[] = allSemanticTopics.map((topic) => ({
  topic: topic.label,
  cluster: topicalClusters.find((cluster) => cluster.id === topic.cluster)?.label ?? topic.cluster,
  coverage: topic.coverage,
  priority: topic.priority,
  difficulty: topic.difficulty,
  intent: topic.intent,
  internalLinkScore: scoreTopic(topic),
  targetPath: topic.targetPath ?? "—",
  nextAction: nextAction(topic),
}));

export const authoritySummary = authorityDashboard.reduce((summary, row) => {
  summary[row.coverage] += 1;
  return summary;
}, { published: 0, planned: 0, missing: 0, "evidence-blocked": 0 });

export const topAuthorityPriorities = authorityDashboard
  .filter((row) => row.priority === "P0" && row.coverage !== "published")
  .sort((a, b) => a.internalLinkScore - b.internalLinkScore);
