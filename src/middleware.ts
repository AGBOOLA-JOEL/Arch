// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const role = req.cookies.get("role")?.value;

//   const url = req.nextUrl.clone();
//   const path = url.pathname;

//   if (!role) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   if (path.startsWith("/dashboard") && role !== "USER") {
//     url.pathname = "/not-found";
//     return NextResponse.redirect(url);
//   }
//   // RBAC rules
//   if (path.startsWith("/admin") && role !== "ADMIN") {
//     url.pathname = "/not-found";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/dashboard/:path*"],
// };

// import { withAuth } from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     const baseUrl = req.nextUrl.origin;

//     // Check if the user is authenticated
//     if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
//       // Redirect to the login page
//       const response = NextResponse.redirect(`${baseUrl}/login`);
//       // Clear the session cookies
//       response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
//       response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

//       return response;
//     }

//     // If authenticated, continue with the request
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // You can add custom logic here, for example, check roles
//         return !!token; // if token exists, the user is authenticated
//       },
//     },
//   }
// );

// // Authenticate all routes except for /api, /_next/static, /_next/image, and .png files
// export const config = {
//   matcher: ["/admin/:path*", "/dashboard/:path*"],
// };

import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const baseUrl = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;

    // If no token or refresh token expired → redirect to login
    if (!token || Date.now() >= token.data.validity.refresh_until * 1000) {
      const response = NextResponse.redirect(`${baseUrl}/login`);
      // Clear session cookies on logout/redirect to login
      response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      return response;
    }

    // Extract role from token data
    const role = token.data.user.role;

    // Role-based redirect logic
    if (role === "ADMIN" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(`${baseUrl}/admin`);
    }
    if (role === "USER" && !pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(`${baseUrl}/dashboard`);
    }

    // If all checks pass, continue to requested route
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
