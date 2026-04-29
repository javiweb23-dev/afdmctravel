import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {LanguageSwitcher} from "./language-switcher";

export function Header() {
  const t = useTranslations("Nav");

  const links = [
    {href: "/", key: "home"},
    {href: "/tours", key: "tours"},
    {href: "/private-experiences", key: "privateExperiences"},
    {href: "/golf-packages", key: "golfPackages"},
    {href: "/corporate-retreats", key: "corporateRetreats"},
    {href: "/transportation", key: "transportation"},
    {href: "/contact", key: "contact"},
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Adventures Finder DMC
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className="hover:text-blue-600">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
