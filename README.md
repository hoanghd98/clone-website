# NAM PHUONG Clone

This is a Next.js project with Tailwind CSS and Prisma (SQLite).

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Installation

1. Clone the repository or navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database and generate Prisma client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

## Running the App

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Health Check

You can check the health of the application by navigating to:
[http://localhost:3000/api/health](http://localhost:3000/api/health)
