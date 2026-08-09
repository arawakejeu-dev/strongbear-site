import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AcademyArticleTemplate, { academyArticleMetadata } from "../../academy/article-template";
import { getAcademyArticleBySlug, getAcademyCategory } from "../../data/academy";

type ArticleProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const article = getAcademyArticleBySlug((await params).slug);
  return article?.canonicalPath ? academyArticleMetadata(article) : {};
}

export default async function ImportedAcademyArticlePage({ params }: ArticleProps) {
  const article = getAcademyArticleBySlug((await params).slug);
  const category = article && getAcademyCategory(article.category);
  if (!article?.canonicalPath || !category) notFound();
  return <AcademyArticleTemplate article={article} category={category} />;
}
