FROM node:20-alpine

# OpenSSL required by Prisma; sqlite CLI optional for debugging
RUN apk add --no-cache openssl sqlite

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Generate Prisma client at build time (no DB writes / no seed)
COPY prisma ./prisma/
RUN npx prisma generate

# App source
COPY . .

COPY infrastructure/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Build-time DB URL placeholder (runtime overridden by compose / env_file)
ENV DATABASE_URL=file:/app/data/dev.db

# Production build (minified JS/CSS, optimized .next output)
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
