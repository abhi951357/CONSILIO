import { NextResponse } from 'next/server';
import { saveCaseStudy, deleteCaseStudy } from '@/lib/db';
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
    const updated = saveCaseStudy({ ...body, id });
    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (err) {
    console.error('Case study update error:', err);
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
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
  const deleted = deleteCaseStudy(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
