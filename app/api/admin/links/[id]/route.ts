import { NextResponse } from 'next/server';
import { getShareLinkEC, updateShareLinkEC, deleteShareLinkEC } from '@/lib/edge-store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getShareLinkEC(id);
    if (!existing) {
      return NextResponse.json({ error: 'Share link not found' }, { status: 404 });
    }

    const body = await request.json();
    await updateShareLinkEC(id, body);

    const updated = await getShareLinkEC(id);
    return NextResponse.json(updated);
  } catch (e) {
    console.error('[PATCH /api/admin/links/[id]]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to update share link' },
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
    const existing = await getShareLinkEC(id);
    if (!existing) {
      return NextResponse.json({ error: 'Share link not found' }, { status: 404 });
    }

    await deleteShareLinkEC(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[DELETE /api/admin/links/[id]]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to delete share link' },
      { status: 500 }
    );
  }
}
