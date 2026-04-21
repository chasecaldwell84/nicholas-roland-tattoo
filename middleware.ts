import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Artist Admin", charset="UTF-8"',
    },
  });
}

function stripWrappedQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function readExpectedCreds() {
  const rawUser = process.env.ARTIST_BASIC_USER;
  const rawPass = process.env.ARTIST_BASIC_PASS;
  if (!rawUser || !rawPass) return null;

  const user = stripWrappedQuotes(rawUser);
  const pass = stripWrappedQuotes(rawPass);
  if (!user || !pass) return null;
  return { user, pass };
}

function isAuthorized(request: NextRequest, expected: { user: string; pass: string }) {

  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return false;

  const encoded = header.slice("Basic ".length).trim();
  try {
    const decoded = atob(encoded);
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    return user === expected.user && pass === expected.pass;
  } catch {
    return false;
  }
}

function requiresBasicAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (pathname === "/artist" || pathname.startsWith("/artist/")) return true;
  if (pathname === "/api/artist-config") return true;
  if (pathname === "/api/site-content" && method !== "GET") return true;
  if (pathname === "/api/portfolio" && method !== "GET") return true;
  return false;
}

export function middleware(request: NextRequest) {
  if (!requiresBasicAuth(request)) {
    return NextResponse.next();
  }

  const expected = readExpectedCreds();
  if (!expected) {
    return new NextResponse(
      "Artist admin auth is not configured correctly. Set ARTIST_BASIC_USER and ARTIST_BASIC_PASS in Vercel.",
      { status: 500 }
    );
  }

  if (!isAuthorized(request, expected)) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/artist/:path*", "/api/:path*"],
};
