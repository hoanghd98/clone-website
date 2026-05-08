# Step 4 Summary: Static Pages (About, Services, Contact)

## What was implemented

1. **Giới thiệu (About) Page (`/gioi-thieu`)**
   - Created a static page with company history and ISO standards information.
   - Added a hero banner with a background image.
   - Added key metrics (10+ years experience, ISO 9001-2008, 100% satisfaction).

2. **Dịch vụ (Services) Page (`/dich-vu`)**
   - Created a detailed page listing all 5 main services:
     - Lai dắt & cứu hộ hàng hải
     - Sản xuất các thiết bị tàu thủy
     - Vận tải hàng hóa bằng đường thủy
     - Kho bãi và lưu trữ hàng hóa
     - Đóng tàu và kết cấu nổi
   - Used an alternating layout (image left/text right, then image right/text left) for visual interest.
   - Added links to the contact page for each service.

3. **Liên hệ (Contact) Page (`/lien-he`)**
   - Created a contact page with company address, phone, and email information.
   - Built a Contact Form with fields for Name, Phone, Email, and Message.
   - Added a Google Maps embed showing the company's location (The Bridgeview Apartment, Q7).

4. **Contact API Route (`/api/contact/route.ts`)**
   - Created a POST endpoint to handle form submissions.
   - Added validation for required fields (name, email, message).
   - Integrated with Prisma to save submissions to the `ContactMessage` table in the SQLite database.
   - Added success/error state handling in the frontend form.

## Troubleshooting & Important Notes

- **Routing & 404 Errors**: The newly created pages (`/gioi-thieu`, `/dich-vu`, `/lien-he`) initially returned 404 errors. This was caused by a missing dependency (`lucide-react`) which crashed the Next.js development server, combined with Next.js caching issues. This was resolved by installing `lucide-react` and clearing the `.next` build cache folder.
- **Next/Image Configuration**: Using external images (e.g., from Unsplash) with the `next/image` component resulted in an "Invalid src prop / unconfigured host" error. This was fixed by explicitly adding `images.unsplash.com` to the `remotePatterns` array in `next.config.js`.
- **Server Restart Requirement**: Any modifications to `next.config.js` or the installation of new `node_modules` dependencies require a manual restart of the Next.js development server (`Ctrl + C` then `npm run dev`) to take effect.

## Next Steps
Proceed to Step 5: Build Dynamic Pages (News & Gallery).
