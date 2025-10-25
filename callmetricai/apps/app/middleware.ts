import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (auth not required)
  const publicRoutes = ['/auth/login', '/auth/signup', '/auth/callback', '/auth/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Check if user has session cookie (Supabase sets this)
  const hasSession = request.cookies.has('sb-igboerxkjwvyysowwwfx-auth-token') || 
                     request.cookies.has('sb-igboerxkjwvyysowwwfx-auth-token.0') ||
                     request.cookies.has('sb-igboerxkjwvyysowwwfx-auth-token.1');

  // Redirect to login if trying to access protected route without session
  if (!isPublicRoute && !hasSession) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if trying to access auth pages with active session
  if (isPublicRoute && hasSession && pathname !== '/auth/callback') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

