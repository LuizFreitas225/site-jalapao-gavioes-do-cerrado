import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getProductionBaseUrl } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getProductionBaseUrl();

  return routing.locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: "2026-06-17",
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.85,
    alternates: {
      languages: {
        pt: `${base}/pt`,
        en: `${base}/en`,
        es: `${base}/es`,
      },
    },
  }));
}
