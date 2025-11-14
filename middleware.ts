// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_DOMAIN = 'actorpage101.site';

export function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get('host')?.split(':')[0] || '';
    const pathname = url.pathname;

    // Root domain: marketing site
    if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
      return NextResponse.next();
    }

    // Dashboard: app.actorpage101.site → /dashboard/*
    if (hostname === `app.${ROOT_DOMAIN}`) {
      if (!pathname.startsWith('/dashboard')) {
        url.pathname = `/dashboard${pathname === '/' ? '' : pathname}`;
        return NextResponse.rewrite(url);
      }
      return NextResponse.next();
    }

    // Actor subdomains: {slug}.actorpage101.site
    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
      const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');
      if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
        url.pathname = `/site/${subdomain}${pathname === '/' ? '' : pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If middleware fails, just pass through
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
