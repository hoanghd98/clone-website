import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Dịch vụ | NAM PHUONG",
  description: "Các dịch vụ của Công ty TNHH DV Hàng Hải & Vận Tải Biển NAM PHUONG",
};

const services = [
  {
    id: "lai-dat",
    title: "Lai dắt & cứu hộ hàng hải",
    description: "Cẩu nổi cùng các trang thiết bị cần thiết luôn sẵn sàng 24/24 để lai dắt, cứu hộ cho các phương tiện đi biển.",
    image: "https://images.unsplash.com/photo-1566847416801-165c69b8f2e2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "san-xuat",
    title: "Sản xuất các thiết bị tàu thủy",
    description: "Sửa chữa thiết bị điện tàu thủy, sửa chữa - lắp đặt thiết bị thủy. Bán buôn máy móc thiết bị, phụ tùng.",
    image: "https://images.unsplash.com/photo-1504917595217-d4bf0611a9eb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "van-tai",
    title: "Vận tải hàng hóa bằng đường thủy",
    description: "Với hàng trăm đối tác trên toàn thế giới đảm bảo dịch vụ nhanh nhất, giá cạnh tranh, chất lượng tuyệt đối.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "kho-bai",
    title: "Kho bãi và lưu trữ hàng hóa",
    description: "Kho lưu trữ lớn, đáp ứng đủ nhu cầu và đội ngũ quản lý và quy trình sắp xếp kho bãi chuyên nghiệp.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "dong-tau",
    title: "Đóng tàu và kết cấu nổi",
    description: "Đóng mới, sửa chữa các loại tàu sông, biển và phương tiện nổi. Chế tạo sửa chữa các kết cấu thép trên phương tiện thủy.",
    image: "https://images.unsplash.com/photo-1517429128955-67ff5c1e29f4?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Dịch vụ của chúng tôi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            NAM PHUONG cung cấp đa dạng các dịch vụ trong lĩnh vực hàng hải, vận tải biển, đóng tàu và logistics với chất lượng hàng đầu.
          </p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link 
                  href="/lien-he" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 self-start"
                >
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
