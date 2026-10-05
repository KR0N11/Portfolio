import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "road/", "profile/", "works/"].map((p) => ({ url: `https://pingchunlui.ca/${p}` }));
}
