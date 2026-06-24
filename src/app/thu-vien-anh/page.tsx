import Image from "next/image";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Thư viện ảnh | NAM PHUONG",
  description: "Hình ảnh hoạt động và dự án của NAM PHUONG",
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const images = await prisma.gallery.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-4">Thư viện ảnh</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Những khoảnh khắc đáng nhớ và hình ảnh các dự án mà NAM PHUONG đã thực hiện.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            Chưa có hình ảnh nào trong thư viện.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div 
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm"
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || "Hình ảnh NAM PHUONG"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 font-medium text-sm w-full truncate">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
