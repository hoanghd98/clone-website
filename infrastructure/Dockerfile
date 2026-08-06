FROM node:20-alpine

# OpenSSL required by Prisma
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

# Persist SQLite outside /app/prisma so schema/migrations stay in the image
ENV DATABASE_URL=file:/app/data/dev.db

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
