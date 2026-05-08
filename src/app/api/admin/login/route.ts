import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Hardcoded password for simplicity as requested
    if (password === 'admin123') {
      cookies().set('admin_token', 'imoses_admin_secret', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Mật khẩu không đúng' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi' },
      { status: 500 }
    );
  }
}
