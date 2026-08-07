FROM node:20-alpine

# OpenSSL required by Prisma; sqlite CLI optional for debugging
RUN apk add --no-cache openssl sqlite

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Generate Prisma client at build time (no DB writes / no seed)
COPY prisma ./prisma/
RUN npx prisma generate

# App source (.env / .generated-env are dockerignored — never baked into the image)
COPY . .

COPY infrastructure/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Build-time DB: schema only so `next build` ISR prerender can open SQLite.
# Secrets (JWT_SECRET, SEED_ADMIN_PASSWORD) and admin seed run at container start.
ENV DATABASE_URL=file:/app/data/dev.db
ENV JWT_SECRET=
ENV SEED_ADMIN_PASSWORD=
RUN mkdir -p /app/data \
  && (npx prisma migrate deploy || npx prisma db push)

# Production build (minified JS/CSS, optimized .next output)
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
