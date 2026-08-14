import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AcademyArticleTemplate, { academyArticleMetadata } from "../../academy/article-template";
import { academyArticles, getAcademyArticleBySlug, getAcademyCategory } from "../../data/academy";

type ArticleProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return academyArticles
    .filter((article) => article.canonicalPath?.startsWith("/academie/"))
    .map((article) => ({ slug: article.canonicalPath!.split("/").filter(Boolean).at(-1)! }));
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getAcademyArticleBySlug(slug) ?? academyArticles.find((item) => item.canonicalPath === `/academie/${slug}`);
  return article?.canonicalPath ? academyArticleMetadata(article) : {};
}

export default async function ImportedAcademyArticlePage({ params }: ArticleProps) {
  const slug = (await params).slug;
  const article = getAcademyArticleBySlug(slug) ?? academyArticles.find((item) => item.canonicalPath === `/academie/${slug}`);
  const category = article && getAcademyCategory(article.category);
  if (!article?.canonicalPath || !category) notFound();
  return <AcademyArticleTemplate article={article} category={category} />;
}
