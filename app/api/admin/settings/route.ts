import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const settings = getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error('Settings update error:', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
