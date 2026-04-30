import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isMarketingPath(pathname: string) {
  const paths = [
    "/",
    "/tours",
    "/golf-packages",
    "/corporate-retreats",
    "/transportation",
    "/contact",
  ];
  if (paths.includes(pathname)) {
    return true;
  }
  const prefixes = [
    "/tours/",
    "/golf-packages/",
    "/corporate-retreats/",
    "/transportation/",
    "/contact/",
  ];
  return prefixes.some((p) => pathname.startsWith(p));
}

export default function middleware(request: NextRequest) {
  if (isMarketingPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
