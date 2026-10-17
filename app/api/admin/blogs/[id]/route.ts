import { NextResponse } from 'next/server';
import { saveBlog, deleteBlog } from '@/lib/db';
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
    const updated = saveBlog({ ...body, id });
    return NextResponse.json({ success: true, blog: updated });
  } catch (err) {
    console.error('Blog update error:', err);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
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
  const deleted = deleteBlog(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
