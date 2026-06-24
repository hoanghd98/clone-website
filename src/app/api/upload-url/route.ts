import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, message: 'URL không hợp lệ' },
        { status: 400 }
      );
    }

    // Fetch the image from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'URL không phải là một hình ảnh hợp lệ' },
        { status: 400 }
      );
    }

    const bytes = await response.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine extension from content-type or URL
    let ext = 'jpg';
    if (contentType === 'image/png') ext = 'png';
    else if (contentType === 'image/gif') ext = 'gif';
    else if (contentType === 'image/webp') ext = 'webp';
    else if (contentType === 'image/jpeg') ext = 'jpg';
    else if (contentType === 'image/svg+xml') ext = 'svg';

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `url-${uniqueSuffix}.${ext}`;
    
    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public/uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Upload URL error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tải ảnh từ URL' },
      { status: 500 }
    );
  }
}
