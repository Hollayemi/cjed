import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import ImpactPageContent from "./ImpactPageContent";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "Measuring the real-world change CJED creates in communities across Nigeria.",
};

export default function ImpactPage() {
  return (
    <HomeWrapper>
      <ImpactPageContent />
    </HomeWrapper>
  );
}