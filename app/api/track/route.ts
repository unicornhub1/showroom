import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import {
  getShareLink,
  getShareLinkAllowedSlugs,
  recordLinkVisit,
  recordTemplateClick,
} from '@/lib/db';

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

    // Try JWT decode to get the real link ID
    let linkId = token;
    let jwtSlugs: string[] | null = null;

    try {
      const { payload } = await jwtVerify(token, getJwtSecret());
      linkId = payload.id as string;
      jwtSlugs = payload.slugs as string[];
    } catch {
      // token is a plain link ID (legacy)
    }

    // Validate the share link exists and is active
    const link = getShareLink(linkId);
    if (!link || !link.is_active) {
      return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
    }

    if (type === 'visit') {
      const userAgent = request.headers.get('user-agent') || undefined;
      const referrer = request.headers.get('referer') || undefined;
      recordLinkVisit(link.id, userAgent, referrer);

      // Set the share-session cookie (signed JWT with allowed slugs)
      const allowedSlugs = jwtSlugs || getShareLinkAllowedSlugs(linkId) || [];
      const sessionJwt = await new SignJWT({ token: linkId, slugs: allowedSlugs })
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
        return NextResponse.json(
          { error: 'Missing template_slug' },
          { status: 400 }
        );
      }
      recordTemplateClick(link.id, template_slug);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Track failed' }, { status: 500 });
  }
}
