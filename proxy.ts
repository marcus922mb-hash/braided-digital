import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let Supabase refresh the session token if needed on every request
  const { supabaseResponse, user } = await updateSession(request);

  const isPanel = pathname.startsWith("/panel");
  const isLogin = pathname === "/login";

  // Unauthenticated user tries to access the panel → redirect to login
  if (isPanel && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Authenticated user visits login page → redirect to panel
  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/panel";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/panel/:path*", "/login"],
};
