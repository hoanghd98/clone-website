FROM node:20-alpine

# Install OpenSSL for Prisma and SQLite
RUN apk add --no-cache openssl sqlite

WORKDIR /app

# Copy dependency files first to leverage caching
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
