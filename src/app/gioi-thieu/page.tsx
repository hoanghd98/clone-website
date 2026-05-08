import Image from "next/image";

export const metadata = {
  title: "Giới thiệu | IMOSES",
  description: "Giới thiệu về Công ty TNHH DV Hàng Hải & Vận Tải Biển IMOSES",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="relative h-64 bg-blue-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop"
                alt="Giới thiệu IMOSES"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="relative z-10 text-4xl font-bold text-white text-center">
              Giới thiệu về IMOSES
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Công ty TNHH DV Hàng Hải & Vận Tải Biển IMOSES
              </h2>
              
              <p className="mb-6 leading-relaxed">
                Công ty được thành lập từ các thành viên có nhiều kinh nghiệm trong sửa chữa và đóng mới của Công ty TNHH MTV Đóng tàu và Công nghiệp Hàng hải Sài Gòn và Công nghiệp tàu thủy Sài Gòn nên có bề dày kinh nghiệm trong lĩnh vực đóng mới và sửa chữa tàu biển, tàu dịch vụ dầu khí, kết cấu giàn khoan.
              </p>

              <p className="mb-6 leading-relaxed">
                Với trên 10 năm kinh nghiệm thi công cùng đội ngũ kỹ thuật, công nhân lành nghề được đào tạo bài bản theo tiêu chuẩn <strong>ISO: 9001 – 2008</strong>, chúng tôi sẽ đáp ứng đầy đủ mọi yều cầu của khách hàng và làm hài lòng với tất cả những khách hàng khó tính nhất.
              </p>

              <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-gray-600 font-medium">Năm kinh nghiệm</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">ISO</div>
                  <div className="text-gray-600 font-medium">9001 - 2008</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600 font-medium">Khách hàng hài lòng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
