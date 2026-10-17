import { NextResponse } from 'next/server';
import { getBlogs, saveBlog } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const blogs = getBlogs(false); // get all blogs including drafts
  return NextResponse.json({ blogs });
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

    const saved = saveBlog(body);
    return NextResponse.json({ success: true, blog: saved }, { status: 201 });
  } catch (err) {
    console.error('Blog save error:', err);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
