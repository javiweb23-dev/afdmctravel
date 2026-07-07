"use client";

import {useEffect, useRef, useState} from "react";
import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

const options = [
  {locale: "en", label: "English", flag: "🇺🇸"},
  {locale: "es", label: "Español", flag: "🇪🇸"},
  {locale: "fr", label: "Français", flag: "🇫🇷"},
] as const;

type LanguageSwitcherProps = {
  variant?: "light" | "dark";
};

export function LanguageSwitcher({variant = "light"}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active =
    options.find((item) => item.locale === locale) ?? options[0];

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const buttonClass =
    variant === "dark"
      ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50";

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-sm transition ${buttonClass}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span aria-hidden>{active.flag}</span>
        <span className="hidden sm:inline">{active.label}</span>
        <span className="sm:hidden">{active.locale.toUpperCase()}</span>
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 opacity-70" aria-hidden>
          <path
            d="M5.5 7.5 10 12l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          {options.map((item) => (
            <Link
              key={item.locale}
              href={pathname}
              locale={item.locale}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-xs transition hover:bg-slate-50 ${
                item.locale === locale
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "text-slate-700"
              }`}
            >
              <span aria-hidden>{item.flag}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
