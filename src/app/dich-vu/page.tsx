import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Dịch vụ | NAM PHUONG",
  description: "Các dịch vụ của Công ty TNHH DV Hàng Hải & Vận Tải Biển NAM PHUONG",
};

const services = [
  {
    id: "sua-chua",
    title: "DỊCH VỤ SỬA CHỮA – BẢO DƯỠNG THIẾT BỊ",
    summary: "Bảo dưỡng, sửa chữa các thiết bị điện – điện tử, máy móc cho các tàu thuyền và các công trình dầu khí",
    content: "Dịch vụ sửa chữa – bảo dưỡng thiết bị hàng hải của Công Ty TNHH Thương Mại Dịch Vụ Phát Triển Kỹ Thuật Nam Phương được thiết kế để đảm bảo sự vận hành liên tục, an toàn và hiệu quả cho các thiết bị hàng hải. Chúng tôi cung cấp các gói bảo dưỡng định kỳ toàn diện, bao gồm kiểm tra, thay thế linh kiện và vệ sinh thiết bị nhằm duy trì hoạt động tối ưu. Bên cạnh đó, chúng tôi còn cung cấp dịch vụ sửa chữa khẩn cấp, giúp khắc phục nhanh chóng mọi sự cố kỹ thuật, đảm bảo thiết bị của Quý khách luôn trong tình trạng hoạt động tốt nhất, ngay cả trong điều kiện khắc nghiệt. Với đội ngũ kỹ thuật viên lành nghề và nhiều năm kinh nghiệm, Nam Phương cam kết mang đến cho Quý khách hàng sự an tâm tuyệt đối và giải pháp bền vững cho mọi nhu cầu về bảo dưỡng và sửa chữa thiết bị hàng hải.",
    image: "/upload/services/sua-chua.png",
  },
  {
    id: "vat-tu",
    title: "CUNG ỨNG VẬT TƯ, THIẾT BỊ HÀNG HẢI",
    summary: "Vật tư, thiết bị, sơn, dầu nhờn, cáp vải vv... cho các giàn khoan dầu khí cũng như đội tàu làm việc trong – ngoài nước.",
    content: "Hiện nay, CÔNG TY NAM PHƯƠNG đang là nhà phân phối vật tư tàu thủy, dầu khí chính hãng từ các doanh nghiệp dẫn đầu trên thế giới: Stauff, Caterpillar, Donaldson,... Với đặc thù ngành hàng hải đòi hỏi tiêu chuẩn chất lượng khắt khe, chúng tôi luôn đặt uy tín và chất lượng sản phẩm lên hàng đầu. Các sản phẩm do Nam Phương cung cấp không chỉ đáp ứng đầy đủ các tiêu chí về kỹ thuật, độ bền và an toàn mà còn được lựa chọn cẩn thận để đảm bảo hiệu suất cao nhất trong mọi điều kiện khắc nghiệt. Với mạng lưới phân phối rộng khắp và hệ thống hậu cần vững chắc, CÔNG TY NAM PHƯƠNG cam kết mang đến sự hài lòng tuyệt đối cho khách hàng thông qua việc cung cấp các giải pháp vật tư tàu thủy và dầu khí chất lượng cao, góp phần vào sự thành công và phát triển bền vững của từng doanh nghiệp trong ngành hàng hải.",
    image: "/upload/services/vat-tu.png",
  },
  {
    id: "thuc-pham",
    title: "CUNG CẤP THỰC PHẨM SẠCH",
    summary: "Rau củ – Trái cây – Gia cầm – Hải sản – Thức ăn",
    content: "Dịch vụ cung cấp thực phẩm sạch cho tàu biển của công ty Nam Phương được xây dựng nhằm đảm bảo sự an toàn và chất lượng bữa ăn cho các thủy thủ đoàn trong suốt hành trình trên biển. Chúng tôi chuyên cung cấp các loại thực phẩm sạch, tươi sống và được kiểm định nghiêm ngặt theo tiêu chuẩn vệ sinh an toàn thực phẩm. Từ rau củ quả, thịt cá, đến các sản phẩm đông lạnh, mỗi nguồn cung đều được tuyển chọn kỹ lưỡng nhằm đảm bảo đầy đủ dinh dưỡng và sự tươi ngon. Dịch vụ của chúng tôi cam kết mang đến sự tiện lợi, nhanh chóng với quy trình vận chuyển bảo quản hiện đại, đáp ứng nhu cầu thực phẩm của các tàu biển dù trong những chuyến hành trình dài ngày, góp phần tạo nên môi trường làm việc và sinh hoạt lành mạnh cho toàn bộ thủy thủ đoàn.",
    image: "/upload/services/thuc-pham.png",
  },
  {
    id: "ho-tro",
    title: "DỊCH VỤ HỖ TRỢ THUYỀN VIÊN",
    summary: "Hỗ trợ thuyền viên các loại chứng chỉ thuyền viên, working visa cho thuyền viên/ đối tác",
    content: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ PHÁT TRIỂN KỸ THUẬT NAM PHƯƠNG tự hào cung cấp dịch vụ hỗ trợ thuyền viên và đối tác một cách toàn diện và chuyên nghiệp. Chúng tôi chuyên tư vấn, hỗ trợ xin cấp các loại chứng chỉ thuyền viên đạt tiêu chuẩn quốc tế, đảm bảo đáp ứng đầy đủ yêu cầu pháp lý và kỹ thuật cho công việc trên biển. Bên cạnh đó, chúng tôi còn cung cấp dịch vụ xin visa làm việc (working visa) nhanh chóng, giúp thuyền viên quốc tế và đối tác dễ dàng hoàn tất thủ tục pháp lý để làm việc tại Việt Nam. Với đội ngũ giàu kinh nghiệm và quy trình xử lý nhanh gọn, chúng tôi cam kết mang lại sự hài lòng tối đa, tiết kiệm thời gian và đảm bảo mọi hành trình của bạn luôn thuận lợi và hiệu quả. CÔNG TY NAM PHƯƠNG chính là người bạn đồng hành tin cậy trên con đường chinh phục đại dương",
    image: "/upload/services/ho-tro.png",
  }
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
                <div className="mb-6 space-y-4">
                  <p className="text-blue-800 font-medium italic">
                    {service.summary}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    {service.content}
                  </p>
                </div>
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
