import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string): any {
  try {
    const payload = token.split(".")[1]; // Get the payload part
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString());
    return decoded;
  } catch (e) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("role")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // const decoded = decodeJWT(token);
  const role = token;

  const pathname = req.nextUrl.pathname;

  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  if (pathname.startsWith("/dashboard") && role !== "USER") {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
