import type { PrismaClient } from '@prisma/client';
import { resolveDbProvider, type DbProvider } from './db-provider';

/**
 * Advance the table's auto-increment / serial so the next insert without an
 * explicit id continues after MAX(id). Required after seeding with fixed ids.
 *
 * Dialect SQL lives only in adapters below — swap/add adapters when moving DB.
 * Seed / app code should call `syncIdSequence` and never embed vendor SQL.
 */

type SqlExecutor = Pick<PrismaClient, '$executeRawUnsafe' | '$queryRawUnsafe'>;

type SequenceAdapter = (
  db: SqlExecutor,
  tableName: string
) => Promise<void>;

const TABLE_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

function assertSafeTableName(tableName: string): void {
  if (!TABLE_NAME_RE.test(tableName)) {
    throw new Error(`Invalid table name for sequence sync: ${tableName}`);
  }
}

/** SQLite AUTOINCREMENT → sqlite_sequence */
const syncSqlite: SequenceAdapter = async (db, tableName) => {
  await db.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = '${tableName}'`
  );
  await db.$executeRawUnsafe(`
    INSERT INTO sqlite_sequence(name, seq)
    VALUES (
      '${tableName}',
      COALESCE((SELECT MAX(id) FROM "${tableName}"), 0)
    )
  `);
};

/** PostgreSQL serial / identity → setval */
const syncPostgresql: SequenceAdapter = async (db, tableName) => {
  await db.$executeRawUnsafe(`
    SELECT setval(
      pg_get_serial_sequence('"${tableName}"', 'id'),
      COALESCE((SELECT MAX(id) FROM "${tableName}"), 1),
      true
    )
  `);
};

/** MySQL AUTO_INCREMENT */
const syncMysql: SequenceAdapter = async (db, tableName) => {
  const rows = await db.$queryRawUnsafe<Array<{ maxId: number | bigint | null }>>(
    `SELECT MAX(id) AS maxId FROM \`${tableName}\``
  );
  const maxId = Number(rows[0]?.maxId ?? 0);
  const next = maxId + 1;
  await db.$executeRawUnsafe(
    `ALTER TABLE \`${tableName}\` AUTO_INCREMENT = ${next}`
  );
};

/**
 * Adapter map — replace or extend when adding a new provider.
 * Keys match schema.prisma `datasource.provider` values.
 */
const adapters: Record<DbProvider, SequenceAdapter> = {
  sqlite: syncSqlite,
  postgresql: syncPostgresql,
  mysql: syncMysql,
};

export async function syncIdSequence(
  db: SqlExecutor,
  tableName: string,
  provider: DbProvider = resolveDbProvider()
): Promise<void> {
  assertSafeTableName(tableName);

  const adapter = adapters[provider];
  if (!adapter) {
    throw new Error(
      `No id-sequence adapter for provider "${provider}". Add one in prisma/lib/sync-id-sequence.ts`
    );
  }

  await adapter(db, tableName);
}

export async function syncIdSequences(
  db: SqlExecutor,
  tableNames: string[],
  provider?: DbProvider
): Promise<void> {
  const resolved = provider ?? resolveDbProvider();
  for (const tableName of tableNames) {
    await syncIdSequence(db, tableName, resolved);
  }
}
