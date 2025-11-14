// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_DOMAIN = 'actorpage101.site';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';
  const pathname = url.pathname;

  // Root domain: marketing site
  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next();
  }

  // Dashboard: app.actorpage101.site → /dashboard/*
  if (host === `app.${ROOT_DOMAIN}`) {
    if (!pathname.startsWith('/dashboard')) {
      const newPath = `/dashboard${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(new URL(newPath, req.url));
    }
    return NextResponse.next();
  }

  // Actor subdomains: {slug}.actorpage101.site
  if (host.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = host.replace(`.${ROOT_DOMAIN}`, '');
    if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
      const newPath = `/site/${subdomain}${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(new URL(newPath, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
