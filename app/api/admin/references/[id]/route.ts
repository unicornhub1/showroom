import { NextResponse } from 'next/server';
import { updateReference, deleteReference, getAllReferences } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid reference ID' },
        { status: 400 }
      );
    }

    const existing = getAllReferences().find((r) => r.id === id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    updateReference(id, body);

    const updated = getAllReferences().find((r) => r.id === id);
    return NextResponse.json(updated);
  } catch (e) {
    console.error('[PATCH /api/admin/references/[id]]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to update reference' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid reference ID' },
        { status: 400 }
      );
    }

    const existing = getAllReferences().find((r) => r.id === id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      );
    }

    deleteReference(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[DELETE /api/admin/references/[id]]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to delete reference' },
      { status: 500 }
    );
  }
}
