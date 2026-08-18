import Link from "next/link";
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
 */
export function PartnerLanguageSwitcher({active}: {active: PartnerLocale}) {
  return (
    <nav className="flex items-center gap-1" aria-label="Language">
      {PARTNER_LOCALES.map((locale) => {
        const current = locale === active;
        return (
          <Link
            key={locale}
            href={partnersPath(locale)}
            hrefLang={locale}
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
