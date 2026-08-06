import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { revalidatePublicContent } from '@/lib/public-cache';

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
    const title = data.title;
    const content = data.content;
    const imageUrl = data.imageUrl ?? data.image_url ?? null;

    const news = await prisma.news.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    revalidatePublicContent('news');
    revalidatePath(`/tin-tuc/${params.id}`);
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

    revalidatePublicContent('news');
    revalidatePath(`/tin-tuc/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi xóa tin tức' },
      { status: 500 }
    );
  }
}
