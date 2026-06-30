import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import NewsPageContent from "./NewsPageContent";

export const metadata: Metadata = {
  title: "News & Stories",
  description: "Latest updates, impact stories and advocacy reports from CJED.",
};

export default function NewsPage() {
  return (
    <HomeWrapper>
      <NewsPageContent />
    </HomeWrapper>
  );
}
