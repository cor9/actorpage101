// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const host = req.headers.get('host') || '';

  // In development with localhost, skip subdomain handling
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  if (isLocalhost) {
    return NextResponse.next();
  }

  // Known base domains to ignore subdomain rewrite
  const primaryDomain = 'actorpage101.site';
  const isRootDomain = host === primaryDomain;

  // For "app." or other reserved subdomains, pass through
  const reserved = new Set(['app', 'www', 'admin']);
  const parts = host.split('.');
  const subdomain = parts.length > 2 ? parts[0] : null;
  const isReserved = subdomain ? reserved.has(subdomain) : false;

  // Rewrite {slug}.actorpage101.site → /actor/[slug]
  if (!isLocalhost && !isRootDomain && subdomain && !isReserved && host.endsWith(primaryDomain)) {
    const rewritten = new URL(`/actor/${subdomain}`, req.url);
    return NextResponse.rewrite(rewritten);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};


