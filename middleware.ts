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
  if (isBlockedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|studio|sanity|.*\\..*).*)"],
};
