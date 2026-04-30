"use client";

import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

const labels: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  es: "Español",
  "fr-CA": "Français (CA)",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 lg:border-t-0 lg:pt-0">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
            locale === loc
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600"
          }`}
        >
          {labels[loc]}
        </Link>
      ))}
    </div>
  );
}
