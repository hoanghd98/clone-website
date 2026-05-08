import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
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
    const { title, content, image_url } = data;

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
        image_url,
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
