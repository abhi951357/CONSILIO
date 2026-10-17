import { NextResponse } from 'next/server';
import { addLead, getLeads } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, serviceNeeded, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const newLead = addLead({
      name,
      email,
      company: company || '',
      phone: phone || '',
      serviceNeeded: serviceNeeded || 'General Consultation',
      message,
      source: source || 'contact_page',
      status: 'new',
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const current = await getCurrentAdmin();
  if (!current) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ leads });
}
