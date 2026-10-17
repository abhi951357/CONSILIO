import { NextResponse } from 'next/server';
import { saveCustomSection, deleteCustomSection } from '@/lib/db';
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
    const updated = saveCustomSection({ ...body, id });
    return NextResponse.json({ success: true, section: updated });
  } catch (err) {
    console.error('Section update error:', err);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
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
  const deleted = deleteCustomSection(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
