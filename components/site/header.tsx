"use client";

import Image from "next/image";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {LanguageSwitcher} from "./language-switcher";

const navItems = [
  {href: "/", key: "home"},
  {href: "/services", key: "services"},
  {href: "/programs", key: "programs"},
  {href: "/white-label", key: "whiteLabel"},
  {href: "/about", key: "about"},
  {href: "/contact", key: "contact"},
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinkClass = (href: string) => {
    const active = isNavActive(pathname, href);
    return active
      ? "whitespace-nowrap font-semibold text-yellow-500"
      : "whitespace-nowrap transition hover:text-amber-200";
  };

  const mobileNavLinkClass = (href: string) => {
    const active = isNavActive(pathname, href);
    return active
      ? "rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold text-yellow-500"
      : "rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#072b52] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/afdmctravel.png"
            alt="AF DMC Travel"
            width={200}
            height={48}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(item.href)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher variant="dark" />
          <Link
            href="/contact#contact-form"
            className="inline-flex shrink-0 rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-[#072b52] transition hover:bg-amber-300 sm:px-4 sm:text-sm"
          >
            {t("submitRfp")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-white/20 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#05233f] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={mobileNavLinkClass(item.href)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact#contact-form"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-amber-400 px-3 py-2.5 text-center text-sm font-semibold text-[#072b52]"
            >
              {t("submitRfp")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
