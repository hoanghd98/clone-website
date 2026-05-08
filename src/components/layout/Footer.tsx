import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">CÔNG TY TNHH IMOSES</h3>
            <div className="space-y-3 mt-4">
              <p className="flex items-start text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tầng 5, Tòa nhà Đại Dương, 123 Đường Bờ Biển, Phường Hải Cảng, Quận 1, TP. HCM</span>
              </p>
              <p className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hotline: 0912 345 678</span>
              </p>
              <p className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email: info@imoses.com.vn</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">Liên Kết Nhanh</h3>
            <ul className="space-y-2 mt-4">
              <li>
                <Link href="/gioi-thieu" className="text-gray-300 hover:text-yellow-400 transition flex items-center">
                  <span className="mr-2">›</span> Giới thiệu về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="text-gray-300 hover:text-yellow-400 transition flex items-center">
                  <span className="mr-2">›</span> Các dịch vụ chính
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-gray-300 hover:text-yellow-400 transition flex items-center">
                  <span className="mr-2">›</span> Tin tức & Sự kiện
                </Link>
              </li>
              <li>
                <Link href="/thu-vien-anh" className="text-gray-300 hover:text-yellow-400 transition flex items-center">
                  <span className="mr-2">›</span> Thư viện hình ảnh
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-gray-300 hover:text-yellow-400 transition flex items-center">
                  <span className="mr-2">›</span> Liên hệ hợp tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">Hỗ Trợ Trực Tuyến</h3>
            <div className="space-y-4 mt-4 text-gray-300">
              <div className="bg-blue-800 p-3 rounded-lg">
                <p className="font-semibold text-white">Phòng Kinh Doanh</p>
                <p>Mr. Nguyễn Văn A: 0987 654 321</p>
                <p>Skype: kinhdoanh_imoses</p>
              </div>
              <div className="bg-blue-800 p-3 rounded-lg">
                <p className="font-semibold text-white">Phòng Kỹ Thuật</p>
                <p>Mr. Trần Văn B: 0976 543 210</p>
                <p>Skype: kythuat_imoses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH IMOSES. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
}
