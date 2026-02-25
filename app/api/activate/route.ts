import { NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

/**
 * GET /api/activate?token=[jwt]
 *
 * Validates the share-link JWT, sets the share-session cookie,
 * then redirects back to the share page. This ensures the cookie
 * is set before the customer can click any template link.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/blocked', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const slugs = (payload.slugs as string[]) || [];
    const linkId = (payload.id as string) || token;

    const sessionJwt = await new SignJWT({ token: linkId, slugs })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .sign(getJwtSecret());

    const res = NextResponse.redirect(`${origin}/s/${token}`);
    res.cookies.set('share-session', sessionJwt, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch {
    return NextResponse.redirect(new URL('/blocked', request.url));
  }
}
