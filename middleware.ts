import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const blockedPrefixes = ["/studio", "/api/sanity", "/sanity"];

function isBlockedPath(pathname: string) {
  return blockedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
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
  matcher: [
    "/((?!api|trpc|_next|_vercel|sanity|studio(?:/.*)?|en/studio(?:/.*)?|es/studio(?:/.*)?|fr-CA/studio(?:/.*)?|.*\\..*).*)",
  ],
};
