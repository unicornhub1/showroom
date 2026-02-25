import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { getShareLink, recordLinkVisit, recordTemplateClick } from '@/lib/db';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, token, template_slug } = body;

    if (!token || !type) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Try JWT decode first
    let linkId: string = token;
    let jwtSlugs: string[] | null = null;

    try {
      const { payload } = await jwtVerify(token, getJwtSecret());
      linkId = payload.id as string;
      jwtSlugs = payload.slugs as string[];
    } catch {
      // plain ID (legacy)
    }

    if (type === 'visit') {
      const userAgent = request.headers.get('user-agent') || undefined;
      const referrer = request.headers.get('referer') || undefined;

      // If JWT is valid, trust it and set cookie immediately — no DB needed
      if (jwtSlugs !== null) {
        const sessionJwt = await new SignJWT({ token: linkId, slugs: jwtSlugs })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('30d')
          .sign(getJwtSecret());

        const cookieStore = await cookies();
        cookieStore.set('share-session', sessionJwt, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30,
        });

        // Analytics best-effort (SQLite may be empty on Vercel)
        try {
          const link = getShareLink(linkId);
          if (link) recordLinkVisit(link.id, userAgent, referrer);
        } catch {}

        return NextResponse.json({ ok: true });
      }

      // Legacy: plain ID — validate via DB
      const link = getShareLink(linkId);
      if (!link || !link.is_active) {
        return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
      }
      recordLinkVisit(link.id, userAgent, referrer);

      const sessionJwt = await new SignJWT({ token: linkId, slugs: [] })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(getJwtSecret());

      const cookieStore = await cookies();
      cookieStore.set('share-session', sessionJwt, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });

      return NextResponse.json({ ok: true });
    }

    if (type === 'click') {
      if (!template_slug) {
        return NextResponse.json({ error: 'Missing template_slug' }, { status: 400 });
      }

      // Analytics best-effort
      try {
        const link = getShareLink(linkId);
        if (link) recordTemplateClick(link.id, template_slug);
      } catch {}

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Track failed' }, { status: 500 });
  }
}
