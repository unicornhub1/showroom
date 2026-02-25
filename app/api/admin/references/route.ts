import { NextResponse } from 'next/server';
import { getAllReferences, createReference } from '@/lib/db';

export async function GET() {
  try {
    const references = getAllReferences();
    return NextResponse.json(references);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch references' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, thumbnail, branch, type, is_visible } = body;

    if (!title || !url || !branch || !type) {
      return NextResponse.json(
        { error: 'title, url, branch, and type are required' },
        { status: 400 }
      );
    }

    const reference = createReference({
      title,
      url,
      thumbnail: thumbnail || '',
      branch,
      type,
      is_visible: is_visible !== undefined ? is_visible : true,
    });

    return NextResponse.json(reference, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create reference' },
      { status: 500 }
    );
  }
}
