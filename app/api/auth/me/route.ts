import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: current });
}

export async function POST() {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: 'Admin credentials are securely managed via the ADMIN_USERNAME and ADMIN_PASSWORD environment variables in your server configuration (.env.local).',
  });
}
