import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createJwt, getJwtCookieOptions, getSessionUser, JWT_COOKIE_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

function toPublicUser(user: {
  id: number;
  username: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy tài khoản' }, { status: 404 });
    }

    return NextResponse.json(toPublicUser(user));
  } catch (error) {
    console.error('Get account error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy thông tin tài khoản' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const username =
      typeof body.username === 'string' ? body.username.trim() : '';
    const fullName =
      typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

    if (!username) {
      return NextResponse.json(
        { error: 'Tên đăng nhập là bắt buộc' },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    if (username !== session.username) {
      const taken = await prisma.user.findUnique({ where: { username } });
      if (taken && taken.id !== session.id) {
        return NextResponse.json(
          { error: 'Tên đăng nhập đã được sử dụng' },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: session.id },
      data: {
        username,
        fullName: fullName || null,
        email: email || null,
        phone: phone || null,
      },
    });

    // Refresh JWT if username changed (embedded in token claims).
    if (username !== session.username) {
      const jwt = await createJwt({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      cookies().set(JWT_COOKIE_NAME, jwt, getJwtCookieOptions());
    }

    return NextResponse.json(toPublicUser(user));
  } catch (error) {
    console.error('Update account error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi cập nhật tài khoản' },
      { status: 500 }
    );
  }
}
