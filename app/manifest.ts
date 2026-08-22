import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} (${siteConfig.shortName})`,
    short_name: siteConfig.shortName,
    description: siteConfig.mission,
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCFC",
    theme_color: "#0068C1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
