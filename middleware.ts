import createMiddleware from "next-intl/middleware";
import {type NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("/studio") || req.nextUrl.pathname.includes("/api/sanity")) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*|studio|studio/.*).*)"],
};
