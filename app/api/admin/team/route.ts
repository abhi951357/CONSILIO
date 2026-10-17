import { NextResponse } from 'next/server';
import { getTeam, saveTeamMember } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const team = getTeam();
  return NextResponse.json({ team });
}

export async function POST(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const saved = saveTeamMember(body);
    return NextResponse.json({ success: true, member: saved }, { status: 201 });
  } catch (err) {
    console.error('Team save error:', err);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
