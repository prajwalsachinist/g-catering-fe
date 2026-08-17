import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Filter permutations are the same content in a different order;
        // let crawlers spend their budget on the canonical pages instead.
        disallow: ["/*?category=", "/*?diet=", "/*?event=", "/*?q="],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
