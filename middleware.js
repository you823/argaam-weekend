import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextResponse } from "next/server";
const locales = ["en", "ar"];
const defaultLocale = "en";
const cookieName = "i18nlang";
function getLocale(request) {
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName).value;
  }
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(cookieName, locale);
  return response;
}
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\..*).*)"],
};
