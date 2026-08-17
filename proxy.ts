import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/studio")) return NextResponse.next();
  // Standalone partner landing page: English only, no locale prefix.
  if (request.nextUrl.pathname.startsWith("/partners")) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.includes("/api/sanity")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*|studio|studio/.*|partners|partners/.*).*)"],
};
