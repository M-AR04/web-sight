import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Check against the environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Create response
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: 'admin_token',
      value: 'authenticated_session_token_' + Date.now(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
