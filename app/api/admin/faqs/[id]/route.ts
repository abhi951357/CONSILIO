import { NextResponse } from 'next/server';
import { saveFAQ, deleteFAQ } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = saveFAQ({ ...body, id });
    return NextResponse.json({ success: true, faq: updated });
  } catch (err) {
    console.error('FAQ update error:', err);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteFAQ(id);
  if (!deleted) {
    return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
