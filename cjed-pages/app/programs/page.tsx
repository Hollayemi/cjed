import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import ProgramsPageContent from "./ProgramsPageContent";

export const metadata: Metadata = {
  title: "Programs",
  description: "Legal aid, capacity building, community development and research initiatives by CJED.",
};

export default function ProgramsPage() {
  return (
    <HomeWrapper>
      <ProgramsPageContent />
    </HomeWrapper>
  );
}
