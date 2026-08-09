import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAcademyArticle, getAcademyCategory, publishedAcademyArticles } from "../../../data/academy";
import AcademyArticleTemplate, { academyArticleMetadata } from "../../article-template";

type ArticlePageProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return publishedAcademyArticles.filter((article) => !article.canonicalPath).map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getAcademyArticle(category, slug);
  return article ? academyArticleMetadata(article) : {};
}

export default async function AcademyArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = getAcademyArticle(categorySlug, slug);
  const category = getAcademyCategory(categorySlug);
  if (!article || !category || !article.sections || !article.faq || !article.publishedAt || !article.updatedAt) notFound();
  if (article.canonicalPath) redirect(article.canonicalPath);
  return <AcademyArticleTemplate article={article} category={category} />;
}
