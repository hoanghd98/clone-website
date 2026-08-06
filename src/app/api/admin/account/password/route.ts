import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MIN_PASSWORD_LENGTH = 8;

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword =
      typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword =
      typeof body.newPassword === 'string' ? body.newPassword : '';

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới' },
        { status: 400 }
      );
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Mật khẩu mới phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự` },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'Mật khẩu mới phải khác mật khẩu hiện tại' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy tài khoản' }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Mật khẩu hiện tại không đúng' },
        { status: 401 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: session.id },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi đổi mật khẩu' },
      { status: 500 }
    );
  }
}
