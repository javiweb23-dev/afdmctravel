import Link from "next/link";

const footerLinks = [
  {href: "/tours", label: "Tours"},
  {href: "/private-experiences", label: "Private Experiences"},
  {href: "/golf-packages", label: "Golf Packages"},
  {href: "/corporate-retreats", label: "Corporate Retreats"},
  {href: "/transportation", label: "Transportation"},
  {href: "/contact", label: "Contact"},
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-300">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-sm text-slate-400">
          {year} Adventures Finder DMC. Punta Cana, Dominican Republic.
        </p>
      </div>
    </footer>
  );
}
