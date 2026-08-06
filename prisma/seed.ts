import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Master data required for the app to run (admin user).
 * Safe to run multiple times — only creates admin if missing.
 * Does NOT insert example/demo content.
 */
async function main() {
  console.log('Seeding master data...');

  const existing = await prisma.user.findUnique({
    where: { username: 'admin' },
  });

  if (existing) {
    console.log('Admin user already exists — skipping.');
    return;
  }

  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword) {
    throw new Error(
      'SEED_ADMIN_PASSWORD is not set. Run scripts/ensure-env.sh (via npm run dev/start/db:ensure) or set it in .env'
    );
  }

  const passwordHash = await bcrypt.hash(seedPassword, 12);

  await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash,
      role: 'admin',
    },
  });

  console.log('Created default admin user (username: admin).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
