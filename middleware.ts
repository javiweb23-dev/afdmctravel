import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const publicPages = ["/studio", "/studio/(.*)"];

const blockedPrefixes = ["/studio", "/api/sanity", "/sanity"];

function isBlockedPath(pathname: string) {
  return blockedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/studio") || request.nextUrl.pathname.startsWith("/api/sanity")) return NextResponse.next();
  const {pathname} = request.nextUrl;
  if (publicPages.some((page) => new RegExp(`^${page}$`).test(pathname))) {
    return NextResponse.next();
  }
  if (isBlockedPath(pathname)) {
    return NextResponse.next();
  }
  if (
    pathname.startsWith("/en/studio") ||
    pathname.startsWith("/es/studio") ||
    pathname.startsWith("/fr-CA/studio")
  ) {
    const url = new URL(pathname.replace(/^\/(en|es|fr-CA)/, ""), request.url);
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*|studio|studio/:path*).*)"],
};
