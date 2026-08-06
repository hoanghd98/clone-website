import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

/**
 * Runs only when the database is empty (no usable schema / no users).
 * - Applies migrations (structure + indexes)
 * - Seeds master data required to run the app (admin user)
 *
 * Example/demo data is NOT loaded here. Run: npm run db:seed:examples
 */
function run(command: string) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit' });
}

async function databaseNeedsInit(): Promise<boolean> {
  const prisma = new PrismaClient();
  try {
    const userCount = await prisma.user.count();
    return userCount === 0;
  } catch {
    // Tables/migrations not applied yet
    return true;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const needsInit = await databaseNeedsInit();

  if (!needsInit) {
    console.log('[ensure-db] Database already initialized — skipping migrate/seed.');
    return;
  }

  console.log('[ensure-db] Empty database detected — applying schema + master data...');

  try {
    run('npx prisma migrate deploy');
  } catch {
    console.warn(
      '[ensure-db] migrate deploy failed — falling back to prisma db push'
    );
    run('npx prisma db push');
  }

  run('npx tsx prisma/seed.ts');
  console.log('[ensure-db] First-time database setup complete.');
}

main().catch((error) => {
  console.error('[ensure-db] Failed:', error);
  process.exit(1);
});
