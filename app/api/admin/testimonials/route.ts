import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const testimonials = getTestimonials(false);
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.quote || !body.clientName) {
      return NextResponse.json({ error: 'Quote and client name are required' }, { status: 400 });
    }

    const saved = saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: saved }, { status: 201 });
  } catch (err) {
    console.error('Testimonial save error:', err);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
