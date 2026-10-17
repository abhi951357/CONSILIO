import { NextResponse } from 'next/server';
import { getCustomSections, saveCustomSection } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || undefined;
  const sections = getCustomSections(page);
  return NextResponse.json({ sections });
}

export async function POST(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.key) {
      return NextResponse.json({ error: 'Title and key are required' }, { status: 400 });
    }

    const saved = saveCustomSection(body);
    return NextResponse.json({ success: true, section: saved }, { status: 201 });
  } catch (err) {
    console.error('Section save error:', err);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}
