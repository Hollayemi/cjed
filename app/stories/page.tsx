import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import { getStoryCards } from "@/lib/content";
import StoriesPageContent from "./StoriesPageContent";

export const metadata: Metadata = {
  title: "Stories",
  description: "Voices and moments from the communities CJED works with across Nigeria.",
};

// Rebuilt at most once a minute; saving in the admin refreshes it immediately.
export const revalidate = 60;

export default async function StoriesPage() {
  const stories = await getStoryCards(30);
  return (
    <HomeWrapper>
      <StoriesPageContent stories={stories} />
    </HomeWrapper>
  );
}
