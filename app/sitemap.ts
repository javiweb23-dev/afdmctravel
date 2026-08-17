import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";
import {SITE_URL} from "@/lib/sanity/metadata";

/**
 * Every indexable route, without its locale prefix.
 * `/thanks` is deliberately absent: it is a post-submission page.
 */
const staticPaths = [
  {path: "", priority: 1, changeFrequency: "weekly" as const},
  {path: "/services", priority: 0.9, changeFrequency: "monthly" as const},
  {path: "/programs", priority: 0.8, changeFrequency: "monthly" as const},
  {path: "/white-label", priority: 0.8, changeFrequency: "monthly" as const},
  {path: "/about", priority: 0.7, changeFrequency: "monthly" as const},
  {
    path: "/agency-registration",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {path: "/contact", priority: 0.9, changeFrequency: "monthly" as const},
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    staticPaths.map(({path, priority, changeFrequency}) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      // Signals to search engines that these URLs are translations of one another.
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, `${SITE_URL}/${item}${path}`]),
        ),
      },
    })),
  );
}
