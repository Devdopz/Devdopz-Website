import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description:
      "Devdopz is a Kerala-based open source developer organization focused on collaboration, projects, contributor growth, and hire-ready profiles.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico?v=2",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
        type: "image/x-icon",
      },
      {
        src: "/Logo.jpg",
        sizes: "640x640",
        type: "image/jpeg",
      },
    ],
  };
}
