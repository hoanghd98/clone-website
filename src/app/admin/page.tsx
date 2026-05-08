export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chào mừng đến với trang quản trị</h1>
      <p className="text-gray-600">
        Sử dụng menu bên trái để quản lý nội dung website.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tin tức</h3>
          <p className="text-gray-600 mb-4">Quản lý các bài viết tin tức, sự kiện.</p>
          <a href="/admin/news" className="text-blue-600 hover:underline">Đi tới Quản lý Tin tức &rarr;</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Thư viện ảnh</h3>
          <p className="text-gray-600 mb-4">Quản lý hình ảnh trong thư viện.</p>
          <a href="/admin/gallery" className="text-blue-600 hover:underline">Đi tới Thư viện ảnh &rarr;</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tin nhắn liên hệ</h3>
          <p className="text-gray-600 mb-4">Xem các tin nhắn từ khách hàng.</p>
          <a href="/admin/contacts" className="text-blue-600 hover:underline">Đi tới Tin nhắn liên hệ &rarr;</a>
        </div>
      </div>
    </div>
  );
}
