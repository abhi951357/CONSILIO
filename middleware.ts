import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'consilio_admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

    // Deny access if session cookie is missing or invalid format
    if (!sessionCookie || !sessionCookie.includes('.')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and navigating to login, redirect directly to dashboard
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
    if (sessionCookie && sessionCookie.includes('.')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
