import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/sanity/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /global-agents is deliberately absent. It carries a noindex tag, and
      // blocking it here would stop Google crawling it — which means never
      // reading that tag. A page that cannot be crawled can still surface as
      // a bare URL; one that is crawled and says noindex is dropped properly.
      disallow: [
        "/studio",
        "/api/",
        "/en/thanks",
        "/es/thanks",
        "/fr/thanks",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
