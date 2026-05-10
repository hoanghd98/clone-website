# Implementation Plan: IMOSES Clone (Next.js + SQLite)

## Step 1: Setup Core FE + BE + DB
- Initialize the Next.js project with Tailwind CSS.
- Set up Prisma ORM with a local SQLite database.
- Define the Database Schema. We only need 3 simple tables:
  - `News` (id, title, content, image_url, created_at)
  - `Gallery` (id, image_url, caption, created_at)
  - `ContactMessage` (id, name, email, phone, message, created_at)
- Set up local image storage (saving uploads to the `public/uploads` folder for simplicity).

## Step 2: Build Global Layout (Header & Footer)
- Build the Header: Add the company logo, contact hotline, and the main navigation menu (Trang chủ, Giới thiệu, Dịch vụ, Tin tức, Thư viện ảnh, Liên hệ).
- Build the Footer: Add company address, contact info, and online support departments.
- Apply this layout so it wraps around all future pages.

## Step 3: Build Home Page (Trang chủ)
- Build the Hero Banner (Welcome image/slider).
- Build the Services Overview section (grid showing: Lai dắt, Sản xuất, Vận tải, Kho bãi, Đóng tàu).
- Build the Latest News section (Fetch the 3 most recent posts from the database).
- Build the Partner/Client Logo ticker at the bottom (QC images).
- Link everything properly to the internal pages.

## Step 4: Build Static Pages (About, Services, Contact)
- Build the "Giới thiệu" (About) page: Static text about company history and ISO standards.
- Build the "Dịch vụ" (Services) page: Detailed text and images for all 5 main services.
- Build the "Liên hệ" (Contact) page: Display company address/map and build a Contact Form.
- Create the backend API route so the Contact Form saves submissions to the SQLite database.

## Step 5: Build Dynamic Pages (News & Gallery)
- Build the "Tin tức" (News) listing page: Display all news articles from the database in a grid/list.
- Build the News Detail page (`/tin-tuc/[id]`): Display the full content of a specific news article.
- Build the "Thư viện ảnh" (Gallery) page: Display a responsive grid of images fetched from the database.

## Step 6: Build Admin Panel (Backend/CMS)
- Create a simple login page (`/admin/login`) with a hardcoded password or basic cookie authentication to keep it fast and simple.
- Build the Admin Dashboard Layout (Sidebar navigation).
- Build News Management: UI and APIs to Create, Edit, and Delete news articles (including image uploads).
- Build Gallery Management: UI and APIs to Upload and Delete images.
- Build Contact Messages View: A simple table to read messages submitted by customers.

## Step 7: Containerization and CI/CD Pipeline
- Add `infrastructure/Dockerfile` for multi-stage Docker build.
- Add `infrastructure/docker-compose.yml` to define the web service and mount volumes for SQLite database and uploads.
- Add GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and run the Docker Compose setup when code is merged to the master branch.

## Step 8: Testing & Go-Live
- Test responsive design (ensure it looks good on mobile and desktop).
- Seed the database with initial content from the original imoses.com.vn website.
- Verify the deployed application on the VPS.