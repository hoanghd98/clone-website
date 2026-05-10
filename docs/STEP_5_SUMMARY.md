# Step 5 Summary: Build Dynamic Pages (News & Gallery)

## 1. What was accomplished

- **Built the News Listing Page (`/tin-tuc`)**:
  - Implemented a responsive grid layout using Tailwind CSS.
  - Used Server-Side Rendering (React Server Components) to fetch data directly from the SQLite database via Prisma (`prisma.news.findMany`).
  - Added formatted date displays and fallbacks for missing images.
  - Sorted news articles by `created_at` descending (newest first).

- **Built the News Detail Page (`/tin-tuc/[id]`)**:
  - Fetched the specific article data using the dynamic route parameter `id` (`prisma.news.findUnique`).
  - Handled the 404 (Not Found) state dynamically when an invalid `id` is provided.
  - Displayed article content dynamically. Since the content is rich text (HTML), it was rendered using `dangerouslySetInnerHTML`.
  - Created a custom set of CSS classes (`.custom-html-content`) in `globals.css` to properly style the HTML content (headings, paragraphs, lists, links, images) without needing to install heavy typography plugins.

- **Built the Gallery Page (`/thu-vien-anh`)**:
  - Implemented a responsive, square-aspect-ratio image grid.
  - Fetched all images from the `Gallery` database table.
  - Added nice hover animations and gradient overlays to display the image captions.

- **Updated Mock Data**:
  - Updated the database seed file (`prisma/seed.ts`) to use realistic Vietnamese mock data for News, Gallery, and Contact Messages, replacing the original English placeholders.
  - Re-seeded the local SQLite database to reflect the new data.

## 2. Technical Notes & Considerations

- **Next.js App Router (RSC)**: 
  Because we are using the Next.js App Router, the pages (`page.tsx`) default to React Server Components (RSC). This allows us to securely import and use Prisma Client directly inside the component without having to build a separate `/api/...` route just to fetch data.
  
- **HTML Content Styling**: 
  When rendering content from a database that contains raw HTML (like articles created via a WYSIWYG editor), standard Tailwind CSS resets all base styles. Instead of installing `@tailwindcss/typography`, we defined explicit base styles for headings, lists, and paragraphs under the `.custom-html-content` class in `globals.css`.

- **Seeding Database**: 
  To run the Prisma seed script using `ts-node` inside the environment properly without changing `package.json` configurations, the command `npx tsc prisma/seed.ts --module CommonJS --esModuleInterop && node prisma/seed.js` was used.

- **External Images**: 
  Since the seed data uses external images from `images.unsplash.com`, Next.js `next/image` requires these hostnames to be explicitly whitelisted in `next.config.js` (which was already set up correctly in previous steps).
