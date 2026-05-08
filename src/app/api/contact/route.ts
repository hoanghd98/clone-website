import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ họ tên, email và nội dung tin nhắn." },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    return NextResponse.json(
      { success: true, message: "Gửi tin nhắn thành công!", data: contactMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
