import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { JWT_COOKIE_NAME } from '@/lib/jwt';

export async function POST() {
  const cookieStore = cookies();
  const clearOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0,
    path: '/',
  };

  // Clear JWT cookie
  cookieStore.set(JWT_COOKIE_NAME, '', clearOptions);
  // Clear legacy session cookie name if present
  cookieStore.set('admin_session', '', clearOptions);

  return NextResponse.json({ success: true });
}
