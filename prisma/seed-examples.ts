import { PrismaClient } from '@prisma/client';
import { syncIdSequence } from './lib/sync-id-sequence';

const prisma = new PrismaClient();

/**
 * Example / demo content only.
 * Run manually: npm run db:seed:examples
 *
 * Idempotent by id:
 *   - id optional — omit to auto-generate
 *   - if id is set and exists → update; else → insert
 * After seeding, autoincrement sequences are advanced to MAX(id)
 * so the next create without an id gets a correct new id.
 * Does NOT touch User (admin) records or delete existing rows.
 */
const newsData: Array<{
  id?: number;
  title: string;
  content: string;
  imageUrl: string;
}> = [
  {
    id: 1,
    title: 'Nam Phương ký kết hợp đồng bảo dưỡng định kỳ thiết bị hàng hải cho đội tàu lớn',
    content:
      'Công Ty TNHH Thương Mại Dịch Vụ Phát Triển Kỹ Thuật Nam Phương vừa ký kết thành công hợp đồng bảo dưỡng định kỳ toàn diện cho một đội tàu chở hàng quốc tế. Hợp đồng bao gồm việc kiểm tra, thay thế linh kiện và vệ sinh các thiết bị điện - điện tử và máy móc, đảm bảo sự vận hành liên tục và an toàn trên các tuyến đường biển khắc nghiệt.',
    imageUrl: '/uploads/news-marine-maintenance.jpg',
  },
  {
    id: 2,
    title: 'Mở rộng kho hàng vật tư tàu thủy và thiết bị dầu khí chính hãng',
    content:
      'Nhằm đáp ứng nhu cầu ngày càng cao của thị trường, Nam Phương đã chính thức mở rộng hệ thống kho chứa vật tư, thiết bị hàng hải. Kho mới được trang bị hiện đại để bảo quản tốt nhất các sản phẩm từ những thương hiệu hàng đầu như Stauff, Caterpillar, Donaldson, sơn, dầu nhờn và cáp vải.',
    imageUrl: '/uploads/news-warehouse-marine-parts.jpg',
  },
  {
    id: 3,
    title: 'Cung cấp lô thực phẩm sạch tươi sống cho tàu quốc tế neo đậu tại Vũng Tàu',
    content:
      'Đội ngũ cung ứng của Nam Phương vừa hoàn thành việc giao lô thực phẩm sạch, bao gồm rau củ, trái cây, hải sản và các sản phẩm đông lạnh cho một tàu viễn dương. Tất cả thực phẩm đều được kiểm định nghiêm ngặt theo tiêu chuẩn vệ sinh an toàn, đảm bảo dinh dưỡng cho thủy thủ đoàn trong hành trình dài ngày.',
    imageUrl: '/uploads/news-fresh-food-supply.jpg',
  },
  {
    id: 4,
    title: 'Hỗ trợ thành công visa làm việc và gia hạn chứng chỉ cho 50 thuyền viên',
    content:
      'Dịch vụ hỗ trợ thuyền viên của Nam Phương tự hào thông báo đã hoàn tất thủ tục xin cấp chứng chỉ chuẩn quốc tế và working visa cho hơn 50 thuyền viên và đối tác nước ngoài trong tháng qua. Dịch vụ nhanh chóng, chuyên nghiệp của chúng tôi giúp tiết kiệm thời gian đáng kể cho khách hàng.',
    imageUrl: '/uploads/news-crew-visa-certificates.jpg',
  },
  {
    id: 5,
    title: 'Nam Phương trở thành đối tác phân phối uy tín của các hãng vật tư lớn',
    content:
      'Với cam kết đặt uy tín và chất lượng lên hàng đầu, Nam Phương đã củng cố vị thế là nhà phân phối chính hãng các vật tư tàu thủy và dầu khí. Các thiết bị do chúng tôi cung cấp đáp ứng đầy đủ tiêu chí khắt khe về kỹ thuật, độ bền và an toàn cho các giàn khoan và đội tàu.',
    imageUrl: '/uploads/news-oilgas-parts-partner.jpg',
  },
  {
    id: 6,
    title: 'Đội ngũ kỹ thuật viên khắc phục sự cố hệ thống điện khẩn cấp ngoài khơi',
    content:
      'Dịch vụ sửa chữa khẩn cấp của Nam Phương đã nhanh chóng được triển khai để khắc phục sự cố hệ thống điện trên một con tàu đang làm nhiệm vụ. Với tay nghề cao và kinh nghiệm nhiều năm, các kỹ thuật viên đã đưa thiết bị hoạt động trở lại trạng thái tốt nhất trong thời gian ngắn.',
    imageUrl: '/uploads/news-emergency-electrical-repair.jpg',
  },
  {
    id: 7,
    title: 'Tiêu chuẩn an toàn mới được áp dụng trong quy trình cung ứng thực phẩm',
    content:
      'Để nâng cao hơn nữa chất lượng bữa ăn cho thủy thủ đoàn, Nam Phương vừa áp dụng hệ thống bảo quản và vận chuyển thực phẩm bằng xe chuyên dụng mới. Điều này đảm bảo rau củ, thịt cá luôn giữ được sự tươi ngon tuyệt đối khi giao đến tận boong tàu.',
    imageUrl: '/uploads/news-food-safety-standard.jpg',
  },
  {
    id: 8,
    title: 'Tổ chức hội thảo cập nhật quy định về chứng chỉ thuyền viên quốc tế',
    content:
      'Nam Phương vừa phối hợp tổ chức một buổi hội thảo nhằm tư vấn và cập nhật những thay đổi mới nhất về yêu cầu pháp lý, kỹ thuật đối với các loại chứng chỉ thuyền viên làm việc trên biển. Sự kiện thu hút sự tham gia của nhiều đối tác và thủy thủ.',
    imageUrl: '/uploads/news-crew-certificate-workshop.jpg',
  },
  {
    id: 9,
    title: 'Cung cấp toàn diện vật tư, sơn và cáp vải cho giàn khoan dầu khí',
    content:
      'Thêm một dự án lớn được Nam Phương hoàn thành xuất sắc khi cung ứng toàn bộ hệ thống vật tư, sơn chống rỉ và cáp vải chuyên dụng cho một giàn khoan dầu khí mới. Sản phẩm chất lượng cao của chúng tôi góp phần vào sự phát triển bền vững của ngành công nghiệp dầu khí.',
    imageUrl: '/uploads/news-provide_stuff_to_oil_rig.jpg',
  },
  {
    id: 10,
    title: 'Đánh giá chất lượng quý: Khách hàng hài lòng tuyệt đối với dịch vụ bảo dưỡng',
    content:
      'Theo kết quả khảo sát nội bộ quý vừa qua, 100% đối tác hàng hải và dầu khí đều bày tỏ sự an tâm và hài lòng với chất lượng dịch vụ bảo dưỡng, sửa chữa thiết bị của Nam Phương. Đây là động lực lớn để chúng tôi tiếp tục mang lại những giải pháp bền vững.',
    imageUrl: '/uploads/news-maintenance-quality-review.jpg',
  },
];

const galleryData: Array<{
  id?: number;
  imageUrl: string;
  caption: string;
}> = [
  {
    id: 1,
    imageUrl: '/uploads/gallery_3-ships.jpg',
    caption: 'Đội tàu vận tải tại khu vực cảng',
  },
  {
    id: 2,
    imageUrl: '/uploads/gallery_ball_bering.jpg',
    caption: 'Phụ tùng bạc đạn và vật tư kỹ thuật hàng hải',
  },
  {
    id: 3,
    imageUrl: '/uploads/gallery_crane_truck_and_boat.jpg',
    caption: 'Xe cẩu hỗ trợ bốc xếp hàng hóa tại cảng',
  },
  {
    id: 4,
    imageUrl: '/uploads/gallery_large-ship.jpg',
    caption: 'Tàu hàng lớn cập cảng',
  },
  {
    id: 5,
    imageUrl: '/uploads/gallery_port_and_ship.jpg',
    caption: 'Hoạt động logistics tại cảng biển',
  },
  {
    id: 6,
    imageUrl: '/uploads/gallery_load_stuff.png',
    caption: 'Xe cẩu nâng vật tư gỗ tại công trình công nghiệp',
  },
];

const contactData: Array<{
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}> = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    message: 'Tôi muốn tìm hiểu về cước phí vận chuyển hàng hóa sang Châu Âu.',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0865302279',
    message: 'Công ty có cung cấp dịch vụ lưu kho cho hóa chất độc hại không?',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@logistics.com',
    phone: '0923456789',
    message: 'Quan tâm đến việc hợp tác vận tải container nội địa.',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@shipping.net',
    phone: '0934567890',
    message: 'Chúng tôi cần dịch vụ sửa chữa khẩn cấp hệ thống điện của tàu.',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@marine.org',
    phone: '0945678901',
    message: 'Yêu cầu báo giá dịch vụ lai dắt trên Biển Đông.',
  },
  {
    id: 6,
    name: 'Đặng Thị F',
    email: 'dangthif@import.com',
    phone: '0956789012',
    message: 'Sức nâng tối đa của cẩu nổi của công ty là bao nhiêu?',
  },
  {
    id: 7,
    name: 'Bùi Văn G',
    email: 'buivang@export.co',
    phone: '0967890123',
    message: 'Tìm kiếm các lựa chọn thuê kho bãi dài hạn.',
  },
  {
    id: 8,
    name: 'Đỗ Văn H',
    email: 'dovanh@build.com',
    phone: '0978901234',
    message: 'Chúng tôi muốn thảo luận về hợp đồng đóng mới sà lan sông.',
  },
  {
    id: 9,
    name: 'Vũ Thị I',
    email: 'vuthii@trade.net',
    phone: '0989012345',
    message: 'Công ty có thể cung cấp chi tiết về chứng nhận ISO 9001 không?',
  },
  {
    id: 10,
    name: 'Ngô Thị K',
    email: 'ngothik@global.com',
    phone: '0990123456',
    message: 'Tôi có câu hỏi về thủ tục hải quan đối với phụ tùng tàu nhập khẩu.',
  },
];

type SeedCounts = { created: number; updated: number };

async function main() {
  console.log('Seeding example data (manual, idempotent by id)...');

  const newsCounts: SeedCounts = { created: 0, updated: 0 };
  for (const news of newsData) {
    if (news.id == null) {
      await prisma.news.create({
        data: {
          title: news.title,
          content: news.content,
          imageUrl: news.imageUrl,
        },
      });
      newsCounts.created += 1;
      continue;
    }

    const existing = await prisma.news.findUnique({ where: { id: news.id } });
    if (existing) {
      await prisma.news.update({
        where: { id: news.id },
        data: {
          title: news.title,
          content: news.content,
          imageUrl: news.imageUrl,
        },
      });
      newsCounts.updated += 1;
    } else {
      await prisma.news.create({ data: news });
      newsCounts.created += 1;
    }
  }
  await syncIdSequence(prisma, 'News');
  console.log(
    `News: ${newsCounts.created} created, ${newsCounts.updated} updated (match: id).`
  );

  const galleryCounts: SeedCounts = { created: 0, updated: 0 };
  for (const gallery of galleryData) {
    if (gallery.id == null) {
      await prisma.gallery.create({
        data: {
          imageUrl: gallery.imageUrl,
          caption: gallery.caption,
        },
      });
      galleryCounts.created += 1;
      continue;
    }

    const existing = await prisma.gallery.findUnique({
      where: { id: gallery.id },
    });
    if (existing) {
      await prisma.gallery.update({
        where: { id: gallery.id },
        data: {
          imageUrl: gallery.imageUrl,
          caption: gallery.caption,
        },
      });
      galleryCounts.updated += 1;
    } else {
      await prisma.gallery.create({ data: gallery });
      galleryCounts.created += 1;
    }
  }
  await syncIdSequence(prisma, 'Gallery');
  console.log(
    `Gallery: ${galleryCounts.created} created, ${galleryCounts.updated} updated (match: id).`
  );

  const contactCounts: SeedCounts = { created: 0, updated: 0 };
  for (const contact of contactData) {
    if (contact.id == null) {
      await prisma.contactMessage.create({
        data: {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
        },
      });
      contactCounts.created += 1;
      continue;
    }

    const existing = await prisma.contactMessage.findUnique({
      where: { id: contact.id },
    });
    if (existing) {
      await prisma.contactMessage.update({
        where: { id: contact.id },
        data: {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
        },
      });
      contactCounts.updated += 1;
    } else {
      await prisma.contactMessage.create({ data: contact });
      contactCounts.created += 1;
    }
  }
  await syncIdSequence(prisma, 'ContactMessage');
  console.log(
    `Contacts: ${contactCounts.created} created, ${contactCounts.updated} updated (match: id).`
  );

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
