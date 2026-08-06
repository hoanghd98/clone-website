import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePublicContent } from '@/lib/public-cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
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
    const imageUrl = data.imageUrl ?? data.image_url;
    const caption = data.caption;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Hình ảnh là bắt buộc' },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.create({
      data: {
        imageUrl,
        caption,
      },
    });

    revalidatePublicContent('gallery');
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi thêm ảnh' },
      { status: 500 }
    );
  }
}
