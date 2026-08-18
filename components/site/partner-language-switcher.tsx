"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {FlagIcon} from "./flag-icon";
import {
  PARTNER_LOCALES,
  partnerLandingCopy,
  partnersPath,
  type PartnerLocale,
} from "@/lib/content/partners-landing";

/**
 * Plain links rather than a dropdown: the landing has no other navigation, and
 * each language is its own URL a partner can link to directly.
 *
 * The UTM query string is carried across so the address bar keeps matching the
 * campaign. Attribution itself does not depend on this — it is already stored
 * for the visit — but a link that silently drops it is confusing to debug.
 */
export function PartnerLanguageSwitcher({active}: {active: PartnerLocale}) {
  const router = useRouter();

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) {
    // Let modifier-clicks open a new tab as the user expects.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    const search = window.location.search;
    if (!search) return;

    event.preventDefault();
    router.push(`${path}${search}`);
  }

  return (
    <nav className="flex items-center gap-1" aria-label="Language">
      {PARTNER_LOCALES.map((locale) => {
        const current = locale === active;
        const path = partnersPath(locale);

        return (
          <Link
            key={locale}
            href={path}
            hrefLang={locale}
            onClick={(event) => handleClick(event, path)}
            aria-current={current ? "true" : undefined}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition ${
              current
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FlagIcon locale={locale} className="h-3 w-4" />
            <span className="hidden sm:inline">
              {partnerLandingCopy[locale].languageName}
            </span>
            <span className="sm:hidden">{locale.toUpperCase()}</span>
          </Link>
        );
      })}
    </nav>
  );
}
