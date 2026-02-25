import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT } from 'jose';
import { TEMPLATES } from '@/lib/templates';
import {
  getAllShareLinksEC,
  createShareLinkEC,
} from '@/lib/edge-store';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

function resolveSlugs(
  allowedTemplates: string[] | undefined,
  filters: { branches?: string[]; types?: string[] }
): string[] {
  if (allowedTemplates && allowedTemplates.length > 0) return allowedTemplates;
  const fb = filters.branches || [];
  const ft = filters.types || [];
  if (fb.length === 0 && ft.length === 0) return TEMPLATES.map((t) => t.slug);
  return TEMPLATES.filter((t) => {
    const bm = fb.length === 0 || fb.includes(t.branch);
    const tm = ft.length === 0 || ft.includes(t.type);
    return bm && tm;
  }).map((t) => t.slug);
}

export async function GET() {
  try {
    const links = await getAllShareLinksEC();
    return NextResponse.json(links);
  } catch (e) {
    console.error('[GET /api/admin/links]', e);
    return NextResponse.json({ error: 'Failed to fetch share links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, filters, allowed_templates, expires_at, is_active } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const id = nanoid(8);
    const created_at = new Date().toISOString();
    const resolvedFilters = filters || {};
    const resolvedAllowed = allowed_templates || undefined;

    const slugs = resolveSlugs(resolvedAllowed, resolvedFilters);
    const urlToken = await new SignJWT({ id, name, slugs })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(getJwtSecret());

    const link = await createShareLinkEC({
      id,
      name,
      filters: resolvedFilters,
      allowed_templates: resolvedAllowed,
      created_at,
      expires_at: expires_at || null,
      is_active: is_active !== undefined ? is_active : true,
      urlToken,
    });

    return NextResponse.json(link, { status: 201 });
  } catch (e) {
    console.error('[POST /api/admin/links]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create share link' },
      { status: 500 }
    );
  }
}
