import Link from "next/link";
import { 
  Wrench, 
  Package, 
  Utensils, 
  Users 
} from "lucide-react";

const services = [
  {
    title: "DỊCH VỤ SỬA CHỮA – BẢO DƯỠNG THIẾT BỊ",
    description: "Bảo dưỡng, sửa chữa các thiết bị điện – điện tử, máy móc cho các tàu thuyền và các công trình dầu khí",
    icon: Wrench,
    link: "/dich-vu#sua-chua",
  },
  {
    title: "CUNG ỨNG VẬT TƯ, THIẾT BỊ HÀNG HẢI",
    description: "Vật tư, thiết bị, sơn, dầu nhờn, cáp vải vv... cho các giàn khoan dầu khí cũng như đội tàu làm việc trong – ngoài nước.",
    icon: Package,
    link: "/dich-vu#vat-tu",
  },
  {
    title: "CUNG CẤP THỰC PHẨM SẠCH",
    description: "Rau củ – Trái cây – Gia cầm – Hải sản – Thức ăn",
    icon: Utensils,
    link: "/dich-vu#thuc-pham",
  },
  {
    title: "DỊCH VỤ HỖ TRỢ THUYỀN VIÊN",
    description: "Hỗ trợ thuyền viên các loại chứng chỉ thuyền viên, working visa cho thuyền viên/ đối tác",
    icon: Users,
    link: "/dich-vu#ho-tro",
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
                <div className="w-16 h-16 bg-blue-100 text-primary-dark rounded-full flex items-center justify-center mb-6">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <Link 
                  href={service.link}
                  className="text-primary-dark hover:text-primary-dark font-medium inline-flex items-center transition-colors"
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
