import Link from "next/link";

const navLinks = [
  {href: "/", label: "Home"},
  {href: "/tours", label: "Tours"},
  {href: "/private-experiences", label: "Private Experiences"},
  {href: "/golf-packages", label: "Golf Packages"},
  {href: "/corporate-retreats", label: "Corporate Retreats"},
  {href: "/transportation", label: "Transportation"},
  {href: "/contact", label: "Contact"},
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-bold tracking-tight text-white"
          >
            Adventures Finder
          </Link>
          <Link
            href="/"
            className="rounded-md border-2 border-blue-600 px-3 py-2 text-sm font-bold tracking-tight text-blue-700"
          >
            AF DMC
          </Link>
        </div>
        <nav className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-medium text-slate-700 lg:justify-end">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 ? (
                <span className="mx-2 hidden text-slate-300 sm:inline" aria-hidden>
                  |
                </span>
              ) : null}
              <Link href={link.href} className="whitespace-nowrap hover:text-blue-600">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
