import { validateImageSeoRegistry } from "./images";
import { validateInternalLinkGraph } from "./internal-links";
import { allSemanticTopics, topicalClusters } from "./topical-map";

export function validateSeoAuthoritySystem() {
  const issues = [...validateImageSeoRegistry(), ...validateInternalLinkGraph()];
  const topicIds = new Set<string>();
  for (const topic of allSemanticTopics) {
    if (topicIds.has(topic.id)) issues.push(`${topic.id}: identifiant topique dupliqué`);
    topicIds.add(topic.id);
  }
  for (const cluster of topicalClusters) {
    if (!cluster.topics.length) issues.push(`${cluster.id}: cluster vide`);
    if (cluster.topics.some((topic) => topic.parentId !== cluster.id)) issues.push(`${cluster.id}: relation parent/enfant incohérente`);
  }
  return issues;
}

export function assertSeoAuthoritySystem() {
  const issues = validateSeoAuthoritySystem();
  if (issues.length) throw new Error(`SEO authority system invalid:\n${issues.join("\n")}`);
}
