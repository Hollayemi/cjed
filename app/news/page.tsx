import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import { getNewsCards } from "@/lib/content";
import NewsPageContent from "./NewsPageContent";

export const metadata: Metadata = {
  title: "News",
  description: "Latest updates, advocacy reports and announcements from CJED.",
};

// Rebuilt at most once a minute; saving in the admin refreshes it immediately.
export const revalidate = 60;

export default async function NewsPage() {
  const articles = await getNewsCards(30);
  return (
    <HomeWrapper>
      <NewsPageContent articles={articles} />
    </HomeWrapper>
  );
}
