import {urlFor} from "@/sanity/lib/image";

/**
 * Fallback images, used only when the matching field is empty in Sanity.
 * Every entry below is currently on screen because its page has no hero
 * loaded in the CMS — replace them from Sanity rather than editing here.
 */
export const STOCK_IMAGES = {
  whiteLabel:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  pageServices:
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
  pagePrograms:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
  pageAbout:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
  pageAgencyRegistration:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
} as const;

/** Self-hosted photo used where we would otherwise hotlink a stock image. */
export const LOCAL_FALLBACK_IMAGE = "/images/punta-cana-aerial.jpg";

export function resolveSanityImage(
  image: unknown,
  fallback: string,
  width = 1600,
): string {
  if (!image) return fallback;
  try {
    return urlFor(image).width(width).quality(80).url();
  } catch {
    return fallback;
  }
}

/**
 * Resolves an image that has no acceptable stand-in — a portrait of a real
 * person, or a photo of a specific service. Returns null when Sanity has
 * nothing, so the caller can omit the image instead of showing a stock one.
 */
export function resolveOptionalSanityImage(
  image: unknown,
  width = 1600,
): string | null {
  if (!image) return null;
  try {
    return urlFor(image).width(width).quality(80).url();
  } catch {
    return null;
  }
}

/**
 * A 1200x630 crop for link previews — the size WhatsApp, Facebook and
 * LinkedIn expect. Returns null when the CMS has no image, so the caller can
 * fall back rather than emit a broken og:image.
 */
export function resolveOgImage(image: unknown): string | null {
  if (!image) return null;
  try {
    return (
      urlFor(image)
        .width(1200)
        .height(630)
        .fit("crop")
        // Forced to JPEG rather than following the source format: a PNG at
        // this size runs to a couple of megabytes, and WhatsApp gives up on
        // a preview image that heavy. The same photo as JPEG is ~120 KB.
        .format("jpg")
        .quality(80)
        .url()
    );
  } catch {
    return null;
  }
}
