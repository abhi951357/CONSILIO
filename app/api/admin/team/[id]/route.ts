import { NextResponse } from 'next/server';
import { saveTeamMember, deleteTeamMember } from '@/lib/db';
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
    const updated = saveTeamMember({ ...body, id });
    return NextResponse.json({ success: true, member: updated });
  } catch (err) {
    console.error('Team member update error:', err);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
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
  const deleted = deleteTeamMember(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
