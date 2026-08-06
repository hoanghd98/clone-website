import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách tin tức' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const title = data.title;
    const content = data.content;
    const imageUrl = data.imageUrl ?? data.image_url ?? null;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Tiêu đề và nội dung là bắt buộc' },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tạo tin tức' },
      { status: 500 }
    );
  }
}
