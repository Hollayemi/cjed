import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import { siteConfig } from "@/app/config/site";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.mission,
};

export default function AboutPage() {
  return (
    <HomeWrapper>
      <AboutPageContent />
    </HomeWrapper>
  );
}
