import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function LatestNews() {
  // Fetch 3 most recent news
  const recentNews = await prisma.news.findMany({
    orderBy: {
      created_at: 'desc'
    },
    take: 3
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 uppercase mb-2">Tin tức & Sự kiện</h2>
            <div className="w-24 h-1 bg-blue-600"></div>
          </div>
          <Link href="/tin-tuc" className="text-primary-dark hover:text-primary-dark font-medium hidden sm:block">
            Xem tất cả &rarr;
          </Link>
        </div>

        {recentNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                <div className="relative h-48 w-full bg-gray-200">
                  {news.image_url ? (
                    <img 
                      src={news.image_url} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(news.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 hover:text-primary-dark transition-colors">
                    <Link href={`/tin-tuc/${news.id}`}>
                      {news.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {news.content}
                  </p>
                  <Link 
                    href={`/tin-tuc/${news.id}`}
                    className="text-primary-dark hover:text-primary-dark text-sm font-medium mt-auto"
                  >
                    Đọc tiếp &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            Chưa có tin tức nào được đăng.
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/tin-tuc" className="inline-block border border-blue-600 text-primary-dark hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded transition-colors">
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  );
}
