import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'showroom-auth-token';
const SHARE_SESSION_COOKIE = 'share-session';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as { username: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin routes ───────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url)
      );
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    return NextResponse.next();
  }

  // ── Showroom root — also require session ────────────────────────────────────
  if (pathname === '/') {
    // Admin always allowed
    const adminToken = request.cookies.get(COOKIE_NAME)?.value;
    if (adminToken) {
      const payload = await verifyAdminToken(adminToken);
      if (payload) return NextResponse.next();
    }

    // Share-session cookie required
    const shareSession = request.cookies.get(SHARE_SESSION_COOKIE)?.value;
    if (shareSession) {
      try {
        await jwtVerify(shareSession, getJwtSecret());
        return NextResponse.next();
      } catch {
        // invalid — fall through
      }
    }

    // No valid session — show blocked page
    return NextResponse.rewrite(new URL('/blocked', request.url));
  }

  // ── Template routes — access control ───────────────────────────────────────
  // Skip static assets (images, fonts, etc.)
  if (/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2)$/i.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/templates/')) {
    // Admin is always allowed
    const adminToken = request.cookies.get(COOKIE_NAME)?.value;
    if (adminToken) {
      const payload = await verifyAdminToken(adminToken);
      if (payload) return NextResponse.next();
    }

    // Check share-session cookie (signed JWT with allowed slugs)
    const shareSession = request.cookies.get(SHARE_SESSION_COOKIE)?.value;
    if (shareSession) {
      try {
        const { payload } = await jwtVerify(shareSession, getJwtSecret());
        const allowedSlugs = payload.slugs as string[];

        // Extract template slug: /templates/fashion/streetwear/... → fashion/streetwear
        const parts = pathname.split('/').filter(Boolean);
        const templateSlug = parts.length >= 3 ? `${parts[1]}/${parts[2]}` : '';

        if (allowedSlugs.includes(templateSlug)) {
          return NextResponse.next();
        }
      } catch {
        // Invalid/expired session — fall through to redirect
      }
    }

    // No valid access — redirect to showroom home
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/templates/:path*'],
};
