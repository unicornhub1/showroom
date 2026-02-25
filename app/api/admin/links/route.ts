import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getAllShareLinks, createShareLink, getLinkStats } from '@/lib/db';

export async function GET() {
  try {
    const links = getAllShareLinks();

    // Enrich each link with tracking stats
    const linksWithStats = links.map((link) => {
      const stats = getLinkStats(link.id);
      return {
        ...link,
        view_count: stats.view_count,
        last_viewed_at: stats.last_viewed_at,
        template_clicks: stats.template_clicks,
      };
    });

    return NextResponse.json(linksWithStats);
  } catch {
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

    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}
