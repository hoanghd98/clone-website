import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Example / demo content only.
 * Run manually: npm run db:seed:examples
 * This replaces News, Gallery, and ContactMessage rows.
 * It does NOT touch User (admin) records.
 */
const newsData = [
  {
    title: 'Nam Phương ký kết hợp đồng bảo dưỡng định kỳ thiết bị hàng hải cho đội tàu lớn',
    content:
      'Công Ty TNHH Thương Mại Dịch Vụ Phát Triển Kỹ Thuật Nam Phương vừa ký kết thành công hợp đồng bảo dưỡng định kỳ toàn diện cho một đội tàu chở hàng quốc tế. Hợp đồng bao gồm việc kiểm tra, thay thế linh kiện và vệ sinh các thiết bị điện - điện tử và máy móc, đảm bảo sự vận hành liên tục và an toàn trên các tuyến đường biển khắc nghiệt.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mở rộng kho hàng vật tư tàu thủy và thiết bị dầu khí chính hãng',
    content:
      'Nhằm đáp ứng nhu cầu ngày càng cao của thị trường, Nam Phương đã chính thức mở rộng hệ thống kho chứa vật tư, thiết bị hàng hải. Kho mới được trang bị hiện đại để bảo quản tốt nhất các sản phẩm từ những thương hiệu hàng đầu như Stauff, Caterpillar, Donaldson, sơn, dầu nhờn và cáp vải.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4bf0611a9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cung cấp lô thực phẩm sạch tươi sống cho tàu quốc tế neo đậu tại Vũng Tàu',
    content:
      'Đội ngũ cung ứng của Nam Phương vừa hoàn thành việc giao lô thực phẩm sạch, bao gồm rau củ, trái cây, hải sản và các sản phẩm đông lạnh cho một tàu viễn dương. Tất cả thực phẩm đều được kiểm định nghiêm ngặt theo tiêu chuẩn vệ sinh an toàn, đảm bảo dinh dưỡng cho thủy thủ đoàn trong hành trình dài ngày.',
    imageUrl:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Hỗ trợ thành công visa làm việc và gia hạn chứng chỉ cho 50 thuyền viên',
    content:
      'Dịch vụ hỗ trợ thuyền viên của Nam Phương tự hào thông báo đã hoàn tất thủ tục xin cấp chứng chỉ chuẩn quốc tế và working visa cho hơn 50 thuyền viên và đối tác nước ngoài trong tháng qua. Dịch vụ nhanh chóng, chuyên nghiệp của chúng tôi giúp tiết kiệm thời gian đáng kể cho khách hàng.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Nam Phương trở thành đối tác phân phối uy tín của các hãng vật tư lớn',
    content:
      'Với cam kết đặt uy tín và chất lượng lên hàng đầu, Nam Phương đã củng cố vị thế là nhà phân phối chính hãng các vật tư tàu thủy và dầu khí. Các thiết bị do chúng tôi cung cấp đáp ứng đầy đủ tiêu chí khắt khe về kỹ thuật, độ bền và an toàn cho các giàn khoan và đội tàu.',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Đội ngũ kỹ thuật viên khắc phục sự cố hệ thống điện khẩn cấp ngoài khơi',
    content:
      'Dịch vụ sửa chữa khẩn cấp của Nam Phương đã nhanh chóng được triển khai để khắc phục sự cố hệ thống điện trên một con tàu đang làm nhiệm vụ. Với tay nghề cao và kinh nghiệm nhiều năm, các kỹ thuật viên đã đưa thiết bị hoạt động trở lại trạng thái tốt nhất trong thời gian ngắn.',
    imageUrl:
      'https://images.unsplash.com/photo-1566847416801-165c69b8f2e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Tiêu chuẩn an toàn mới được áp dụng trong quy trình cung ứng thực phẩm',
    content:
      'Để nâng cao hơn nữa chất lượng bữa ăn cho thủy thủ đoàn, Nam Phương vừa áp dụng hệ thống bảo quản và vận chuyển thực phẩm bằng xe chuyên dụng mới. Điều này đảm bảo rau củ, thịt cá luôn giữ được sự tươi ngon tuyệt đối khi giao đến tận boong tàu.',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Tổ chức hội thảo cập nhật quy định về chứng chỉ thuyền viên quốc tế',
    content:
      'Nam Phương vừa phối hợp tổ chức một buổi hội thảo nhằm tư vấn và cập nhật những thay đổi mới nhất về yêu cầu pháp lý, kỹ thuật đối với các loại chứng chỉ thuyền viên làm việc trên biển. Sự kiện thu hút sự tham gia của nhiều đối tác và thủy thủ.',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cung cấp toàn diện vật tư, sơn và cáp vải cho giàn khoan dầu khí',
    content:
      'Thêm một dự án lớn được Nam Phương hoàn thành xuất sắc khi cung ứng toàn bộ hệ thống vật tư, sơn chống rỉ và cáp vải chuyên dụng cho một giàn khoan dầu khí mới. Sản phẩm chất lượng cao của chúng tôi góp phần vào sự phát triển bền vững của ngành công nghiệp dầu khí.',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Đánh giá chất lượng quý: Khách hàng hài lòng tuyệt đối với dịch vụ bảo dưỡng',
    content:
      'Theo kết quả khảo sát nội bộ quý vừa qua, 100% đối tác hàng hải và dầu khí đều bày tỏ sự an tâm và hài lòng với chất lượng dịch vụ bảo dưỡng, sửa chữa thiết bị của Nam Phương. Đây là động lực lớn để chúng tôi tiếp tục mang lại những giải pháp bền vững.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const galleryData = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8ed7b6697b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Kỹ thuật viên bảo dưỡng thiết bị điện tử trên tàu',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4bf0611a9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Kho vật tư phụ tùng và thiết bị hàng hải',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Kiểm tra chất lượng thực phẩm sạch trước khi giao cho tàu',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Hỗ trợ tư vấn thủ tục visa và chứng chỉ cho thuyền viên',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Cung ứng thiết bị dầu khí chính hãng',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1566847416801-165c69b8f2e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Sửa chữa máy móc và thiết bị khẩn cấp ngoài khơi',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Cung cấp rau củ và trái cây tươi cho thủy thủ đoàn',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Khóa đào tạo và cấp chứng chỉ hàng hải',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Vật tư sơn, cáp vải và dầu nhờn sẵn sàng giao hàng',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Kỹ thuật viên Nam Phương nghiệm thu công tác bảo dưỡng',
  },
];

const contactData = [
  {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    message: 'Tôi muốn tìm hiểu về cước phí vận chuyển hàng hóa sang Châu Âu.',
  },
  {
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0865302279',
    message: 'Công ty có cung cấp dịch vụ lưu kho cho hóa chất độc hại không?',
  },
  {
    name: 'Lê Văn C',
    email: 'levanc@logistics.com',
    phone: '0923456789',
    message: 'Quan tâm đến việc hợp tác vận tải container nội địa.',
  },
  {
    name: 'Phạm Thị D',
    email: 'phamthid@shipping.net',
    phone: '0934567890',
    message: 'Chúng tôi cần dịch vụ sửa chữa khẩn cấp hệ thống điện của tàu.',
  },
  {
    name: 'Hoàng Văn E',
    email: 'hoangvane@marine.org',
    phone: '0945678901',
    message: 'Yêu cầu báo giá dịch vụ lai dắt trên Biển Đông.',
  },
  {
    name: 'Đặng Thị F',
    email: 'dangthif@import.com',
    phone: '0956789012',
    message: 'Sức nâng tối đa của cẩu nổi của công ty là bao nhiêu?',
  },
  {
    name: 'Bùi Văn G',
    email: 'buivang@export.co',
    phone: '0967890123',
    message: 'Tìm kiếm các lựa chọn thuê kho bãi dài hạn.',
  },
  {
    name: 'Đỗ Văn H',
    email: 'dovanh@build.com',
    phone: '0978901234',
    message: 'Chúng tôi muốn thảo luận về hợp đồng đóng mới sà lan sông.',
  },
  {
    name: 'Vũ Thị I',
    email: 'vuthii@trade.net',
    phone: '0989012345',
    message: 'Công ty có thể cung cấp chi tiết về chứng nhận ISO 9001 không?',
  },
  {
    name: 'Ngô Thị K',
    email: 'ngothik@global.com',
    phone: '0990123456',
    message: 'Tôi có câu hỏi về thủ tục hải quan đối với phụ tùng tàu nhập khẩu.',
  },
];

async function main() {
  console.log('Seeding example data (manual)...');

  await prisma.news.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.contactMessage.deleteMany();
  console.log('Cleared existing News / Gallery / ContactMessage rows.');

  for (const news of newsData) {
    await prisma.news.create({ data: news });
  }
  console.log(`Added ${newsData.length} news items.`);

  for (const gallery of galleryData) {
    await prisma.gallery.create({ data: gallery });
  }
  console.log(`Added ${galleryData.length} gallery images.`);

  for (const contact of contactData) {
    await prisma.contactMessage.create({ data: contact });
  }
  console.log(`Added ${contactData.length} contact messages.`);

  console.log('Example data seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
