import type { MetadataRoute } from "next";

import { getProductionBaseUrl } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = getProductionBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
