import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWT_COOKIE_NAME, verifyJwt } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/admin/login';

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(JWT_COOKIE_NAME)?.value;
  const user = token ? await verifyJwt(token) : null;

  if (!user) {
    const isApi =
      pathname.startsWith('/api/admin') ||
      pathname === '/api/upload' ||
      pathname === '/api/upload-url';

    if (isApi) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/upload',
    '/api/upload-url',
  ],
};
