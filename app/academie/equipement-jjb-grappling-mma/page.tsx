import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AcademyArticleTemplate, { academyArticleMetadata } from "../../academy/article-template";
import { getAcademyArticle, getAcademyCategory } from "../../data/academy";

const path = "/academie/equipement-jjb-grappling-mma";
const article = getAcademyArticle("bien-debuter", "equipement-jjb-grappling-mma");
const category = getAcademyCategory("bien-debuter");

export async function generateMetadata(): Promise<Metadata> {
  return article ? academyArticleMetadata(article, path) : {};
}

export default async function EquipmentArticlePage() {
  if (!article || !category) notFound();
  return <AcademyArticleTemplate article={article} category={category} path={path} />;
}
