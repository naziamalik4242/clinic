import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('aura_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Allow internal asset routes, APIs, and authorization routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/login') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Redirect to session gate if authentication token asset is missing
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};