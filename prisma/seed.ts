import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newsData = [
  {
    title: "Câu lạc bộ P&I London yêu cầu kiểm tra và bảo dưỡng cần cẩu trên boong tàu",
    content: "Câu lạc bộ P&I London vừa ban hành chỉ thị mới yêu cầu tất cả các tàu thành viên tiến hành kiểm tra kỹ lưỡng và bảo dưỡng cần cẩu trên boong để đảm bảo an toàn hoạt động và ngăn ngừa tai nạn trong quá trình xếp dỡ hàng hóa.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Đội tàu container Việt Nam đảm nhận các tuyến nội địa",
    content: "Đội tàu vận tải container Việt Nam hiện đã hoàn toàn đảm nhận các tuyến vận tải nội địa. Đội tàu hiện bao gồm 39 tàu với tổng trọng tải 368.000 DWT, cho thấy sự tăng trưởng đáng kể trong lĩnh vực hàng hải.",
    image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ký kết hợp đồng đóng mới tàu chở hàng rời 50.000 DWT",
    content: "IMOSES đã ký kết thành công hợp đồng đóng mới tàu chở hàng rời 50.000 DWT cho một đối tác quốc tế lớn. Quá trình thi công sẽ được bắt đầu vào tháng tới tại xưởng đóng tàu chính của chúng tôi.",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cứu hộ thành công một tàu hàng trên Biển Đông",
    content: "Đội cứu hộ hàng hải của chúng tôi đã lai dắt thành công một tàu chở hàng gặp nạn đến nơi an toàn trong điều kiện thời tiết khắc nghiệt vào tuần trước. Toàn bộ thủy thủ đoàn đều an toàn và con tàu đang được sửa chữa.",
    image_url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mở rộng hệ thống kho bãi tại cảng chính",
    content: "Để đáp ứng nhu cầu ngày càng tăng, chúng tôi đang tiến hành mở rộng hệ thống kho bãi lưu trữ thêm 10.000 mét vuông. Cơ sở mới sẽ được trang bị hệ thống kiểm soát khí hậu hiện đại.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Hoàn thành khóa huấn luyện an toàn hàng hải thường niên",
    content: "Hơn 200 nhân viên đã hoàn thành xuất sắc khóa huấn luyện an toàn hàng hải nâng cao và ứng phó khẩn cấp thường niên, củng cố cam kết của chúng tôi đối với sự vận hành an toàn và xuất sắc.",
    image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Lắp đặt thiết bị tàu thủy thân thiện với môi trường",
    content: "Chúng tôi đã bắt đầu sản xuất và lắp đặt các hệ thống động lực mới thân thiện với môi trường, giúp giảm 15% lượng nhiên liệu tiêu thụ và giảm thiểu đáng kể lượng khí thải.",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Hợp tác với mạng lưới logistics toàn cầu",
    content: "IMOSES đã chính thức hợp tác với một mạng lưới logistics hàng đầu toàn cầu để cung cấp các giải pháp vận chuyển trọn gói (door-to-door) cho khách hàng quốc tế của chúng tôi.",
    image_url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nâng cấp đội cẩu nổi và thiết bị hạng nặng",
    content: "Đội cẩu nổi của chúng tôi đã được nâng cấp với các thiết bị nâng hạng nặng mới, tăng sức nâng tối đa phục vụ cho các hoạt động thi công ngoài khơi và cứu hộ hàng hải.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Gia hạn thành công Chứng nhận ISO 9001:2015",
    content: "Chúng tôi tự hào thông báo rằng hệ thống quản lý chất lượng của công ty đã một lần nữa vượt qua kỳ đánh giá nghiêm ngặt để gia hạn chứng nhận ISO 9001:2015.",
    image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

const galleryData = [
  { image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Đánh bóng chân vịt tại xưởng" },
  { image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Đóng mới tàu Binh An VALIANT" },
  { image_url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Sửa chữa tàu chở dầu trên ụ nổi" },
  { image_url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Hoạt động bốc dỡ hàng hóa tại cảng chính" },
  { image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Lai dắt và cứu hộ ngoài khơi" },
  { image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Sản xuất thiết bị điện hàng hải" },
  { image_url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Tổ chức và sắp xếp kho bãi" },
  { image_url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Gia công kết cấu thép" },
  { image_url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Cẩu nổi đang hoạt động" },
  { image_url: "https://images.unsplash.com/photo-1494412519320-aa3da6e05a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Toàn cảnh xưởng đóng tàu" }
];

const contactData = [
  { name: "Nguyễn Văn A", email: "nguyenvana@example.com", phone: "0901234567", message: "Tôi muốn tìm hiểu về cước phí vận chuyển hàng hóa sang Châu Âu." },
  { name: "Trần Thị B", email: "tranthib@example.com", phone: "0912345678", message: "Công ty có cung cấp dịch vụ lưu kho cho hóa chất độc hại không?" },
  { name: "Lê Văn C", email: "levanc@logistics.com", phone: "0923456789", message: "Quan tâm đến việc hợp tác vận tải container nội địa." },
  { name: "Phạm Thị D", email: "phamthid@shipping.net", phone: "0934567890", message: "Chúng tôi cần dịch vụ sửa chữa khẩn cấp hệ thống điện của tàu." },
  { name: "Hoàng Văn E", email: "hoangvane@marine.org", phone: "0945678901", message: "Yêu cầu báo giá dịch vụ lai dắt trên Biển Đông." },
  { name: "Đặng Thị F", email: "dangthif@import.com", phone: "0956789012", message: "Sức nâng tối đa của cẩu nổi của công ty là bao nhiêu?" },
  { name: "Bùi Văn G", email: "buivang@export.co", phone: "0967890123", message: "Tìm kiếm các lựa chọn thuê kho bãi dài hạn." },
  { name: "Đỗ Văn H", email: "dovanh@build.com", phone: "0978901234", message: "Chúng tôi muốn thảo luận về hợp đồng đóng mới sà lan sông." },
  { name: "Vũ Thị I", email: "vuthii@trade.net", phone: "0989012345", message: "Công ty có thể cung cấp chi tiết về chứng nhận ISO 9001 không?" },
  { name: "Ngô Thị K", email: "ngothik@global.com", phone: "0990123456", message: "Tôi có câu hỏi về thủ tục hải quan đối với phụ tùng tàu nhập khẩu." }
];

async function main() {
  console.log("Bắt đầu khởi tạo dữ liệu mẫu...");

  // Xóa dữ liệu cũ
  await prisma.news.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.contactMessage.deleteMany();

  console.log("Đã xóa dữ liệu cũ.");

  // Thêm Tin tức
  for (const news of newsData) {
    await prisma.news.create({ data: news });
  }
  console.log(`Đã thêm ${newsData.length} bài viết tin tức.`);

  // Thêm Thư viện ảnh
  for (const gallery of galleryData) {
    await prisma.gallery.create({ data: gallery });
  }
  console.log(`Đã thêm ${galleryData.length} hình ảnh.`);

  // Thêm Tin nhắn liên hệ
  for (const contact of contactData) {
    await prisma.contactMessage.create({ data: contact });
  }
  console.log(`Đã thêm ${contactData.length} tin nhắn liên hệ.`);

  console.log("Hoàn tất khởi tạo dữ liệu mẫu.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
