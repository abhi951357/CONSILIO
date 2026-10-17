import { NextResponse } from 'next/server';
import { getCaseStudies, saveCaseStudy } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const caseStudies = getCaseStudies(false);
  return NextResponse.json({ caseStudies });
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

    const saved = saveCaseStudy(body);
    return NextResponse.json({ success: true, caseStudy: saved }, { status: 201 });
  } catch (err) {
    console.error('Case study save error:', err);
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}
