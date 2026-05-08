import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Tin tức | IMOSES",
  description: "Tin tức và sự kiện mới nhất từ IMOSES",
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Tin tức & Sự kiện</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Cập nhật những thông tin mới nhất về hoạt động của IMOSES và ngành hàng hải.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm">
            Hiện tại chưa có bài viết nào.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((item) => (
              <Link 
                href={`/tin-tuc/${item.id}`} 
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <Image 
                        src="/placeholder-image.png" 
                        alt="Placeholder"
                        width={64}
                        height={64}
                        className="opacity-50"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    {new Intl.DateTimeFormat('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).format(new Date(item.created_at))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {item.content.replace(/<[^>]*>?/gm, '') /* basic HTML strip for preview */}
                  </p>
                  <span className="text-blue-600 font-medium text-sm mt-auto inline-flex items-center">
                    Đọc tiếp 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
