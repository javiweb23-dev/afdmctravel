import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/sanity/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio",
        "/api/",
        "/partners",
        "/en/thanks",
        "/es/thanks",
        "/fr/thanks",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
