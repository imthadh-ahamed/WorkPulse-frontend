import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
// const protectedRoutes = []
const protectedRoutes = [
  "/pages/dashboard",
  "/pages/employees",
  "/pages/projects",
  "/pages/projects/{projectid}",
  "/pages/daily-summary",
  "/pages/focus-work",
  "/pages/analytics",
  "/pages/announcements",
  "/pages/calendar",
  "/pages/settings",
];
const publicRoutes = ["/", "/tenant", "/signup"];

type MiddlewareRequest = NextRequest;

export default async function middleware(
  req: MiddlewareRequest
): Promise<NextResponse> {
  // 2. Check if the current route is protected or public
  const path: string = req.nextUrl.pathname;
  const isProtectedRoute: boolean = protectedRoutes.includes(path);
  const isPublicRoute: boolean = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie: string | undefined = (await cookies()).get("token")?.value;
  //   const session = await decrypt(cookie)

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && cookie && !req.nextUrl.pathname.startsWith("pages")) {
    return NextResponse.redirect(new URL("login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.\\.png$).)"],
};
