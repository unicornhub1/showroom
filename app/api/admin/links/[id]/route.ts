import { NextResponse } from 'next/server';
import { getShareLink, updateShareLink, deleteShareLink } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = getShareLink(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Share link not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    updateShareLink(id, body);

    const updated = getShareLink(id);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update share link' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = getShareLink(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Share link not found' },
        { status: 404 }
      );
    }

    deleteShareLink(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete share link' },
      { status: 500 }
    );
  }
}
