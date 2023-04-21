import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
  const publicRoutes = ["/", "/response"];

  if (!publicRoutes.includes(req.url)) {
    // check if user is authenticated here and return NextResponse.redirect('/login') if not
  }

  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
