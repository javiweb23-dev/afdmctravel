"use client";

import {useEffect, useRef, useState} from "react";
import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

const options = [
  {locale: "en", label: "English"},
  {locale: "es", label: "Español"},
  {locale: "fr-CA", label: "Français (CA)"},
] as const;

function FlagIcon({locale}: {locale: "en" | "es" | "fr-CA"}) {
  if (locale === "en") {
    return (
      <svg viewBox="0 0 28 20" className="h-3.5 w-5 rounded-[2px] shadow-sm" aria-hidden>
        <rect width="28" height="20" fill="#b22234" />
        <rect y="2" width="28" height="2" fill="#fff" />
        <rect y="6" width="28" height="2" fill="#fff" />
        <rect y="10" width="28" height="2" fill="#fff" />
        <rect y="14" width="28" height="2" fill="#fff" />
        <rect y="18" width="28" height="2" fill="#fff" />
        <rect width="12" height="10" fill="#3c3b6e" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg viewBox="0 0 28 20" className="h-3.5 w-5 rounded-[2px] shadow-sm" aria-hidden>
        <rect width="28" height="20" fill="#aa151b" />
        <rect y="5" width="28" height="10" fill="#f1bf00" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 20" className="h-3.5 w-5 rounded-[2px] shadow-sm" aria-hidden>
      <rect width="28" height="20" fill="#fff" />
      <rect width="6" height="20" fill="#d52b1e" />
      <rect x="22" width="6" height="20" fill="#d52b1e" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = options.find((item) => item.locale === locale) ?? options[0];

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

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FlagIcon locale={active.locale} />
        <span>{active.label}</span>
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-slate-500" aria-hidden>
          <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {options.map((item) => (
            <Link
              key={item.locale}
              href={pathname}
              locale={item.locale}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-xs transition hover:bg-slate-50 ${
                item.locale === locale ? "bg-slate-100 text-slate-900" : "text-slate-700"
              }`}
            >
              <FlagIcon locale={item.locale} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
