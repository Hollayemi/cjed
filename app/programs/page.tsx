import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import { getProgramCards } from "@/lib/content";
import ProgramsPageContent from "./ProgramsPageContent";

export const metadata: Metadata = {
  title: "Programs",
  description: "Legal aid, capacity building, community development and research initiatives by CJED.",
};

// Rebuilt at most once a minute; saving in the admin refreshes it immediately.
export const revalidate = 60;

export default async function ProgramsPage() {
  const initiatives = await getProgramCards(30);
  return (
    <HomeWrapper>
      <ProgramsPageContent initiatives={initiatives} />
    </HomeWrapper>
  );
}
