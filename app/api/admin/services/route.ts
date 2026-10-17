import { NextResponse } from 'next/server';
import { getServices, saveService } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const services = getServices(false);
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const saved = saveService(body);
    return NextResponse.json({ success: true, service: saved }, { status: 201 });
  } catch (err) {
    console.error('Service save error:', err);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
