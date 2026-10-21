import { notFound } from "next/navigation";
import ResourceManager from "../../_components/ResourceManager";
import { isResourceKey } from "@/lib/resource-config";

export default async function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResourceKey(resource)) notFound();
  // key forces a fresh manager (and fresh state) when switching between News / Programs / Stories.
  return <ResourceManager key={resource} resource={resource} />;
}
