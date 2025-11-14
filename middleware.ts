// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_DOMAIN = 'actorpage101.site';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // Root domain: marketing site
  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) {
    return NextResponse.rewrite(url);
  }

  // Dashboard: app.actorpage101.site → /dashboard/*
  if (host === `app.${ROOT_DOMAIN}`) {
    if (!url.pathname.startsWith('/dashboard')) {
      url.pathname = `/dashboard${url.pathname === '/' ? '' : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Actor subdomains: {slug}.actorpage101.site
  if (host.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = host.replace(`.${ROOT_DOMAIN}`, '');
    if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
      url.pathname = `/site/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
