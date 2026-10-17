import { NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const success = updateLeadStatus(id, status);
  if (!success) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
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
  const success = deleteLead(id);
  if (!success) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
