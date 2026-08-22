import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import { siteConfig } from "@/app/config/site";
import AboutPageContent from "./AboutPageContent";

const title = "About Us";
const description = siteConfig.mission;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "about CJED",
    "Centre for Justice Education and Development mission",
    "Nigerian legal aid NGO",
    "human rights organization Nigeria",
    "CJED vision and values",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
  },
  twitter: {
    title,
    description,
  },
};

export default function AboutPage() {
  return (
    <HomeWrapper>
      <AboutPageContent />
    </HomeWrapper>
  );
}