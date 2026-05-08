import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!news) {
      return NextResponse.json({ error: 'Không tìm thấy tin tức' }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi lấy tin tức' },
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
    const { title, content, image_url } = data;

    const news = await prisma.news.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        content,
        image_url,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi cập nhật tin tức' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.news.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi xóa tin tức' },
      { status: 500 }
    );
  }
}
