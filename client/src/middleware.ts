import { NextRequest, NextResponse } from "next/server";


// 1. Specify protected and public routes
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

interface MiddlewareRequest extends NextRequest {
  cookies: NextRequest['cookies'];
}

export default async function middleware(req: MiddlewareRequest): Promise<NextResponse> {
  console.log(req.nextUrl.pathname, "middleware");

  // 2. Check if the current route is protected or public
  const path: string = req.nextUrl.pathname;
  const isProtectedRoute: boolean = protectedRoutes.includes(path);
  const isPublicRoute: boolean = publicRoutes.includes(path);

  // 3. Get the session from cookies (you can decrypt if needed)
  const cookie: boolean = req.cookies.has("token");

  // 5. Redirect to home if user is not authenticated on protected route
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. (Optional) Redirect authenticated users from public pages
  if (isPublicRoute && cookie) {
    // Example: Redirect to dashboard
    return NextResponse.redirect(new URL("/pages/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// 7. Define paths that middleware should match (and skip static files, images, etc.)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
