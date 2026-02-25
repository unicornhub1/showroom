import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/templates';
import {
  getAllTemplateVisibilityEC,
  setTemplateVisibilityEC,
} from '@/lib/edge-store';

export async function GET() {
  try {
    const visibility = await getAllTemplateVisibilityEC();
    const templates = TEMPLATES.map((t) => ({
      ...t,
      is_visible: visibility[t.slug] !== undefined ? visibility[t.slug] : true,
    }));
    return NextResponse.json(templates);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { slug, is_visible } = body;

    if (!slug || is_visible === undefined) {
      return NextResponse.json(
        { error: 'slug and is_visible are required' },
        { status: 400 }
      );
    }

    const template = TEMPLATES.find((t) => t.slug === slug);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    await setTemplateVisibilityEC(slug, is_visible);

    return NextResponse.json({ slug, is_visible });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update template visibility' },
      { status: 500 }
    );
  }
}
