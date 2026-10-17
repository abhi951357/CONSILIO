import { NextResponse } from 'next/server';
import { verifyAdminCredentials, getAdminCredentials, generateSessionToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.username || body.email || '').trim();
    const password = body.password || '';

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Verify entered credentials against environment variables (ADMIN_USERNAME & ADMIN_PASSWORD)
    const isValid = verifyAdminCredentials(identifier, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password. Access denied.' },
        { status: 401 }
      );
    }

    const { username, email } = getAdminCredentials();
    const token = generateSessionToken({
      username,
      email,
      role: 'superadmin',
      name: 'Administrator',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        username,
        email,
        role: 'superadmin',
        name: 'Administrator',
      },
    });

    // Set secure HTTP-only cookie containing the signed session token
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
