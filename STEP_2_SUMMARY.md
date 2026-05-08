# Step 2 Summary: Global Layout (Header & Footer)

## What Was Completed

1. **Created the Header Component (`src/components/layout/Header.tsx`)**
   - Implemented a sticky top navigation bar using Tailwind CSS.
   - Added a top bar section containing the contact email and hotline.
   - Added the main navigation menu with links: Trang chủ, Giới thiệu, Dịch vụ, Tin tức, Thư viện ảnh, Liên hệ.
   - Implemented responsive design: Added a mobile menu with a toggle button (hamburger icon) for smaller screens. The component was converted to a Client Component (`"use client"`) to manage the `isMobileMenuOpen` state.

2. **Created the Footer Component (`src/components/layout/Footer.tsx`)**
   - Built a comprehensive footer divided into a responsive grid.
   - Added Company Information (Address, Hotline, Email) with SVG icons.
   - Added Quick Links (Liên kết nhanh) for easy navigation.
   - Added Online Support Information for the Sales and Technical departments.
   - Styled with the brand's blue and yellow color scheme.

3. **Updated the Global Layout (`src/app/layout.tsx`)**
   - Imported and wrapped the application's `{children}` within the `<Header />` and `<Footer />` components.
   - Applied a flexbox layout (`flex flex-col min-h-screen`, with `flex-grow` on the `<main>` tag) to ensure the Footer always stays at the bottom of the page, even when the page content is short.

## Important Notes & Technical Decisions

- **Client Component:** The `Header` is defined with the `"use client"` directive because it requires interactivity (the mobile menu dropdown state) via React's `useState` hook.
- **Icon Strategy:** Instead of installing an external icon library (like `lucide-react` or `react-icons`), we opted to use inline SVG icons. This keeps the application lightweight and avoids dependency issues in this environment.
- **Responsiveness:** Both components were built mobile-first, using Tailwind's `md:` prefixes to handle the layout shifts for tablets and desktop screens.
