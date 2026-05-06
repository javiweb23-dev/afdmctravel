import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const blockedPrefixes = ["/studio", "/api/sanity", "/sanity"];
const localeStudioPattern = /^\/(en|es|fr-CA)\/studio(?:\/|$)/;

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
  const localeStudioMatch = pathname.match(localeStudioPattern);
  if (localeStudioMatch) {
    const studioPath = pathname.replace(/^\/(en|es|fr-CA)/, "");
    const url = new URL(studioPath || "/studio", request.url);
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|studio|en/studio|es/studio|fr-CA/studio|sanity|.*\\..*).*)",
  ],
};
