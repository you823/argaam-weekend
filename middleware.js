import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // Regex to exclude static files

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // 1. Static files (e.g., CSS, images, fonts)
  // 2. API routes
  // 3. Next.js internal paths (_next)
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  // Check if the URL has a supported language (en or ar)
  const isLangSupported = ["en", "ar"].some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // If the URL doesn't have a supported language, redirect to `/en`
  if (!isLangSupported) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/en${pathname}`;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}
