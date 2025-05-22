import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.clone();
  const path = url.pathname;

  if (!role) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/dashboard") && role !== "USER") {
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }
  // RBAC rules
  if (path.startsWith("/admin") && role !== "ADMIN") {
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
