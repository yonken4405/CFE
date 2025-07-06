import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const publicPaths = ['/login'];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const hasUser = req.cookies.get('cfe_user') || req.headers.get('cfe_user') || null;

  // For now, check localStorage only works client-side.
  // Secure cookies recommended for final version.

  if (!hasUser) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
