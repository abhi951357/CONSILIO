import { NextResponse } from 'next/server';
import { getFAQs, saveFAQ } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const faqs = getFAQs();
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const saved = saveFAQ(body);
    return NextResponse.json({ success: true, faq: saved }, { status: 201 });
  } catch (err) {
    console.error('FAQ save error:', err);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
