import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Calendar, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const news = await prisma.news.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!news) {
    return {
      title: "Không tìm thấy bài viết | NAM PHUONG"
    };
  }

  return {
    title: `${news.title} | NAM PHUONG`,
    description: news.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
  };
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsId = parseInt(params.id);
  
  if (isNaN(newsId)) {
    notFound();
  }

  const news = await prisma.news.findUnique({
    where: { id: newsId }
  });

  if (!news) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/tin-tuc" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại danh sách tin tức
        </Link>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <Calendar size={18} className="mr-2" />
            <span>
              {new Intl.DateTimeFormat('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }).format(new Date(news.created_at))}
            </span>
          </div>

          {news.image_url && (
            <div className="relative w-full h-[400px] md:h-[500px] mb-10 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="custom-html-content"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>
      </div>
    </main>
  );
}
