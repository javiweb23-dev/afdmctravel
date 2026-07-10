import type {MetadataRoute} from "next";

const baseUrl = "https://afdmctravel.com";
const locales = ["en", "es", "fr"] as const;

const staticPaths = [
  "",
  "/services",
  "/programs",
  "/white-label",
  "/about",
  "/agency-registration",
  "/contact",
  "/thanks",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url =
        path === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
