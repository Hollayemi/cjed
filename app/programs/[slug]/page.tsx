import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeWrapper from "@/app/components/wrapper";
import ArticleView from "@/app/components/ArticleView";
import { getArticle } from "@/lib/content";

// Rebuilt at most once a minute; saving in the admin refreshes it immediately.
export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle("programs", slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.summary || article.paragraphs[0]?.slice(0, 160),
    alternates: { canonical: `/programs/${slug}` },
    openGraph: { title: article.title, images: article.image ? [article.image] : undefined },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle("programs", slug);
  if (!article) notFound();
  return (
    <HomeWrapper>
      <ArticleView article={article} backHref="/programs" backLabel="All programs" fallbackImage="/images/image1.webp" />
    </HomeWrapper>
  );
}
