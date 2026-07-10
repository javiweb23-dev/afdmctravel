"use client";

import {Fragment} from "react";
import {useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

const segmentKeys: Record<string, "services" | "programs" | "whiteLabel" | "agencyRegistration" | "about" | "contact"> = {
  services: "services",
  programs: "programs",
  "white-label": "whiteLabel",
  "agency-registration": "agencyRegistration",
  about: "about",
  contact: "contact",
};

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    {href: "/", label: t("home")},
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const navKey = segmentKeys[segment];
      const label = navKey ? t(navKey) : formatSegment(segment);
      return {href, label};
    }),
  ];

  return (
    <nav
      aria-label="breadcrumb"
      className="mx-auto max-w-7xl px-4 pb-2 pt-6 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Fragment key={crumb.href}>
              {index > 0 ? (
                <li aria-hidden="true" className="text-slate-300">
                  /
                </li>
              ) : null}
              <li>
                {isLast ? (
                  <span aria-current="page" className="font-medium text-slate-600">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="transition hover:text-slate-600">
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
