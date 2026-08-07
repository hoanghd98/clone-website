import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

/**
 * Runtime DB setup (Docker entrypoint / npm run db:ensure):
 * - Always apply migrations (or db push fallback)
 * - Always run master seed (admin only; idempotent)
 *
 * Example/demo data is NOT loaded here. Run: npm run db:seed:examples
 */
function run(command: string) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit' });
}

async function hasUsableSchema(): Promise<boolean> {
  const prisma = new PrismaClient();
  try {
    await prisma.user.count();
    return true;
  } catch {
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('[ensure-db] Applying schema migrations...');

  try {
    run('npx prisma migrate deploy');
  } catch {
    console.warn(
      '[ensure-db] migrate deploy failed — falling back to prisma db push'
    );
    run('npx prisma db push');
  }

  if (!(await hasUsableSchema())) {
    console.error('[ensure-db] Schema still unavailable after migrate/push.');
    process.exit(1);
  }

  console.log('[ensure-db] Ensuring master data (admin)...');
  run('npx tsx prisma/seed.ts');
  console.log('[ensure-db] Database ready.');
}

main().catch((error) => {
  console.error('[ensure-db] Failed:', error);
  process.exit(1);
});
