import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("appSession") // Cookie predeterminada de Auth0

  const isLoggedIn = !!token

  if (!isLoggedIn) {
    const loginUrl = new URL("/api/auth/login", req.url)
    loginUrl.searchParams.set("returnTo", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Aplicar solo a /admin y sus subrutas
export const config = {
  matcher: ["/admin/:path*"],
}
