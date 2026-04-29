import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Nav");
  const currentYear = new Date().getFullYear();

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
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className="hover:text-blue-300">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-slate-300">
          {currentYear} Adventures Finder DMC
        </p>
      </div>
    </footer>
  );
}
