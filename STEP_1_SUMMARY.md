# Step 1 Summary: Setup Core FE + BE + DB

## What was accomplished

1. **Next.js & Tailwind Setup**: 
   - Initialized a new Next.js 14 project using the App Router (`src/app`), TypeScript, and Tailwind CSS.
   - Configured `.npmrc` to ensure dependencies are pulled correctly from the public registry.

2. **Prisma & SQLite Setup**: 
   - Installed Prisma ORM and configured it to use a local SQLite database (`dev.db`).
   - Ran initial database push and generated the Prisma Client.

3. **Database Schema**: 
   - Defined the initial schema in `prisma/schema.prisma` with three models:
     - `News`: For blog/news posts (id, title, content, image_url, created_at).
     - `Gallery`: For the image gallery (id, image_url, caption, created_at).
     - `ContactMessage`: To store contact form submissions (id, name, email, phone, message, created_at).

4. **Local Storage**: 
   - Created the `public/uploads` directory to handle local image uploads. 
   - Added a `.gitkeep` file to ensure the folder structure is tracked in Git while ignoring the actual uploaded files.

5. **Health Check API**: 
   - Created a basic `GET` endpoint at `/api/health` to verify the backend is running properly.

6. **Documentation**: 
   - Added a `README.md` file with clear instructions on how to install dependencies, run database migrations, and start the app.

7. **Version Control**: 
   - Created a comprehensive `.gitignore` file.
   - Initialized a Git repository and made the initial commit tracking all the setup files.

## Important Notes

- **Database Management**: We are using SQLite for simplicity. The database file is located at `prisma/dev.db`. If you change the schema in the future, remember to run `npx prisma db push` and `npx prisma generate` to sync your database and update the TypeScript types.
- **Image Uploads**: Uploaded files will be saved to `public/uploads`. This folder's contents are ignored by Git (via `.gitignore`) to avoid bloating the repository with user data.
- **Port Usage**: The Next.js development server defaults to port `3000`. If that port is in use on your machine, it will automatically try `3001`, `3002`, etc. Always check the terminal output for the correct local URL.
- **Next Step**: The foundation is ready. You can now proceed to **Step 2**, which involves building the Global Layout (Header & Footer components).
