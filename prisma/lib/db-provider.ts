/**
 * DB dialect helpers for ops Prisma does not abstract (e.g. id sequence sync).
 *
 * When migrating: set `provider` in schema.prisma AND optionally
 * `DATABASE_PROVIDER` in .env to the same value: sqlite | postgresql | mysql
 */

export type DbProvider = 'sqlite' | 'postgresql' | 'mysql';

const PROVIDERS = new Set<DbProvider>(['sqlite', 'postgresql', 'mysql']);

/**
 * Resolve active provider.
 * 1) DATABASE_PROVIDER (explicit, preferred when switching DBs)
 * 2) DATABASE_URL scheme
 * 3) default: sqlite (matches current schema.prisma)
 */
export function resolveDbProvider(
  env: NodeJS.ProcessEnv = process.env
): DbProvider {
  const explicit = (env.DATABASE_PROVIDER ?? '').toLowerCase().trim();
  if (explicit === 'postgres') return 'postgresql';
  if (PROVIDERS.has(explicit as DbProvider)) {
    return explicit as DbProvider;
  }

  const url = env.DATABASE_URL ?? '';
  if (url.startsWith('file:') || url.startsWith('sqlite:')) return 'sqlite';
  if (url.startsWith('postgresql:') || url.startsWith('postgres:')) {
    return 'postgresql';
  }
  if (url.startsWith('mysql:')) return 'mysql';

  return 'sqlite';
}
