import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import ImpactPageContent from "./ImpactPageContent";

const title = "Our Impact";
const description =
  "Measuring the real-world change CJED creates in communities across Nigeria.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "CJED impact",
    "legal aid statistics Nigeria",
    "access to justice results",
    "CJED case outcomes",
    "community impact Nigeria NGO",
  ],
  alternates: { canonical: "/impact" },
  openGraph: {
    title,
    description,
    url: "/impact",
  },
  twitter: {
    title,
    description,
  },
};
export default function ImpactPage() {
  return (
    <HomeWrapper>
      <ImpactPageContent />
    </HomeWrapper>
  );
}