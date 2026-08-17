import {notFound} from "next/navigation";

/**
 * Catches any unmatched path under a locale so it renders the branded
 * [locale]/not-found.tsx instead of Next's default error page.
 */
export default function CatchAllPage() {
  notFound();
}
