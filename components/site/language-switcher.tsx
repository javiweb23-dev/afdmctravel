"use client";

import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={pathname}
          locale={targetLocale}
          className={`rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            locale === targetLocale
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600"
          }`}
        >
          {targetLocale}
        </Link>
      ))}
    </div>
  );
}
