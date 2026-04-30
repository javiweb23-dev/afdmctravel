import type {MetadataRoute} from "next";
import {groq} from "next-sanity";
import {client} from "@/sanity/lib/client";

const baseUrl = "https://www.afdmctravel.com";
const locales = ["en", "es", "fr-CA"] as const;

const staticPaths = [
  "",
  "/contact",
  "/tours",
  "/private-experiences",
  "/golf-packages",
  "/corporate-retreats",
  "/transportation",
] as const;

const documentsQuery = groq`
  *[_type in ["tour", "golfPackage", "privateExperience", "corporateRetreat"] && defined(slug.current)]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`;

type SanitySitemapDoc = {
  _type: string;
  slug: string;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let docs: SanitySitemapDoc[] = [];
  try {
    docs = await client.fetch<SanitySitemapDoc[]>(documentsQuery);
  } catch {
    docs = [];
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url =
        path === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  for (const locale of locales) {
    for (const doc of docs) {
      entries.push({
        url: `${baseUrl}/${locale}/${doc._type}/${doc.slug}`,
        lastModified: new Date(doc._updatedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
