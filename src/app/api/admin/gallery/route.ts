import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách ảnh' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { image_url, caption } = data;

    if (!image_url) {
      return NextResponse.json(
        { error: 'Hình ảnh là bắt buộc' },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.create({
      data: {
        image_url,
        caption,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi thêm ảnh' },
      { status: 500 }
    );
  }
}
