FROM node:20-alpine

# Install OpenSSL for Prisma and SQLite
RUN apk add --no-cache openssl sqlite

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Initialize the database
ENV DATABASE_URL=file:./dev.db
COPY prisma ./prisma/
RUN npx prisma db push
RUN npx prisma generate
RUN npx tsx prisma/seed.ts

# Copy project files
COPY . .

# Build the project
# RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
# CMD ["npm", "run", "dev"]
