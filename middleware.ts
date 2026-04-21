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

function isAuthorized(request: NextRequest) {
  const expectedUser = process.env.ARTIST_BASIC_USER;
  const expectedPass = process.env.ARTIST_BASIC_PASS;
  if (!expectedUser || !expectedPass) return false;

  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return false;

  const encoded = header.slice("Basic ".length).trim();
  try {
    const decoded = atob(encoded);
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    return user === expectedUser && pass === expectedPass;
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

  if (!isAuthorized(request)) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/artist/:path*", "/api/:path*"],
};
