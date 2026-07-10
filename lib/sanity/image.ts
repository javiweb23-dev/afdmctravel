import {urlFor} from "@/sanity/lib/image";

export const STOCK_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
  serviceTransport:
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
  serviceHotel:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  serviceTeam:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  serviceIncentive:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  serviceEvents:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  serviceTours:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  serviceOnsite:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
  jeannie:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  whiteLabel:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  pageServices:
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
  pagePrograms:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
  pageAbout:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
  pageContact:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80",
  pageAgencyRegistration:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
} as const;

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
