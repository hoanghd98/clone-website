import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách liên hệ' },
      { status: 500 }
    );
  }
}
