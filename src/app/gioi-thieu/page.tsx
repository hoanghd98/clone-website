import Image from "next/image";

export const metadata = {
  title: "Giới thiệu | NAM PHUONG",
  description: "Giới thiệu về Công ty TNHH DV Hàng Hải & Vận Tải Biển NAM PHUONG",
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
                src="/upload/bg-home.png"
                alt="Giới thiệu NAM PHUONG"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="relative z-10 text-4xl font-bold text-white text-center">
              Giới thiệu về NAM PHUONG
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ PHÁT TRIỂN KỸ THUẬT NAM PHƯƠNG
              </h2>
              
              <p className="mb-6 leading-relaxed">
                CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ PHÁT TRIỂN KỸ THUẬT NAM PHƯƠNG với lĩnh vực 
                chính sửa chữa tàu biển, cung cấp thực phẩm, vật tư thiết bị hàng hải, dầu khí với đội ngũ nhân 
                viên chuyên môn cao và tận tâm với khách hàng. Với triết lý kinh doanh trên, chúng tôi thi công 
                các dự án chất lượng cao và giải pháp tiên tiến trong ngành hàng hải.
              </p>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex flex-col md:flex-row md:items-start">
                    <span className="font-semibold text-blue-900 md:w-1/4">Tên công ty:</span>
                    <span className="text-gray-700 md:w-3/4">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ PHÁT TRIỂN KỸ THUẬT NAM PHƯƠNG</span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-start">
                    <span className="font-semibold text-blue-900 md:w-1/4">Tên quốc tế:</span>
                    <span className="text-gray-700 md:w-3/4">NAM PHUONG TECHNICAL DEVELOPMENT SERVICES TRADING COMPANY LIMITED</span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-start">
                    <span className="font-semibold text-blue-900 md:w-1/4">Mã số thuế:</span>
                    <span className="text-gray-700 md:w-3/4 font-mono">3502518665</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
