import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!gallery) {
      return NextResponse.json({ error: 'Không tìm thấy ảnh' }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi lấy ảnh' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const imageUrl = data.imageUrl ?? data.image_url;
    const caption = data.caption ?? null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Hình ảnh là bắt buộc' },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.update({
      where: { id: parseInt(params.id) },
      data: {
        imageUrl,
        caption,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi cập nhật ảnh' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gallery.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi xóa ảnh' },
      { status: 500 }
    );
  }
}
