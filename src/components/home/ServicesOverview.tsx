import Link from "next/link";
import { 
  Anchor, 
  Settings, 
  Ship, 
  Warehouse, 
  Hammer 
} from "lucide-react";

const services = [
  {
    title: "Lai dắt & cứu hộ hàng hải",
    description: "Cẩu nổi cùng các trang thiết bị cần thiết luôn sẵn sàng 24/24 để lai dắt, cứu hộ cho các phương tiện đi biển.",
    icon: Anchor,
    link: "/dich-vu#lai-dat",
  },
  {
    title: "Sản xuất các thiết bị tàu thủy",
    description: "Sửa chữa thiết bị điện tàu thủy, sửa chữa - lắp đặt thiết bị thủy. Bán buôn máy móc thiết bị, phụ tùng.",
    icon: Settings,
    link: "/dich-vu#san-xuat",
  },
  {
    title: "Vận tải hàng hóa bằng đường thủy",
    description: "Với hàng trăm đối tác trên toàn thế giới đảm bảo dịch vụ nhanh nhất, giá cạnh tranh, chất luợng tuyệt đối.",
    icon: Ship,
    link: "/dich-vu#van-tai",
  },
  {
    title: "Kho bãi và lưu trữ hàng hóa",
    description: "Kho lưu trữ lớn, đáp ứng đủ nhu cầu và đội ngũ quản lý và quy trình sắp xếp kho bãi chuyên nghiệp.",
    icon: Warehouse,
    link: "/dich-vu#kho-bai",
  },
  {
    title: "Đóng tàu và kết cấu nổi",
    description: "Đóng mới, sửa chữa các loại tàu sông, biển và phương tiện nổi. Chế tạo sửa chữa các kết cấu thép trên phương tiện thủy.",
    icon: Hammer,
    link: "/dich-vu#dong-tau",
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 uppercase mb-4">Dịch vụ của chúng tôi</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <Link 
                  href={service.link}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
                >
                  Xem thêm
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
