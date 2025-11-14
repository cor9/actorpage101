// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_DOMAIN = 'actorpage101.site';

export function middleware(req: NextRequest) {
  try {
    const hostname = req.headers.get('host')?.split(':')[0] || '';
    const pathname = req.nextUrl.pathname;

    // Skip middleware for Next.js internals
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Root domain: marketing site
    if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
      return NextResponse.next();
    }

    // Dashboard: app.actorpage101.site → /dashboard/*
    if (hostname === `app.${ROOT_DOMAIN}`) {
      if (!pathname.startsWith('/dashboard')) {
        const url = req.nextUrl.clone();
        url.pathname = `/dashboard${pathname === '/' ? '' : pathname}`;
        return NextResponse.rewrite(url);
      }
      return NextResponse.next();
    }

    // Actor subdomains: {slug}.actorpage101.site
    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
      const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');
      if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
        const url = req.nextUrl.clone();
        url.pathname = `/site/${subdomain}${pathname === '/' ? '' : pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Fail silently and pass through
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
