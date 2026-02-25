import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT } from 'jose';
import { getAllShareLinks, createShareLink, getLinkStats, getShareLinkAllowedSlugs } from '@/lib/db';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

export async function GET() {
  try {
    const links = getAllShareLinks();

    // Enrich each link with tracking stats and a signed JWT token
    const linksWithData = await Promise.all(links.map(async (link) => {
      const stats = getLinkStats(link.id);
      const slugs = getShareLinkAllowedSlugs(link.id) || [];
      const urlToken = await new SignJWT({ id: link.id, name: link.name, slugs })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(getJwtSecret());
      return {
        ...link,
        urlToken,
        view_count: stats.view_count,
        last_viewed_at: stats.last_viewed_at,
        template_clicks: stats.template_clicks,
      };
    }));

    return NextResponse.json(linksWithData);
  } catch (e) {
    console.error('[GET /api/admin/links]', e);
    return NextResponse.json(
      { error: 'Failed to fetch share links' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, filters, allowed_templates, expires_at, is_active } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const link = createShareLink({
      id: nanoid(8),
      name,
      filters: filters || {},
      allowed_templates: allowed_templates || undefined,
      expires_at: expires_at || null,
      is_active: is_active !== undefined ? is_active : true,
    });

    const slugs = getShareLinkAllowedSlugs(link.id) || [];
    const urlToken = await new SignJWT({ id: link.id, name: link.name, slugs })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(getJwtSecret());

    return NextResponse.json({ ...link, urlToken }, { status: 201 });
  } catch (e) {
    console.error('[POST /api/admin/links]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create share link' },
      { status: 500 }
    );
  }
}
