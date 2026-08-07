import { revalidatePath } from 'next/cache';

/**
 * Public page segment caching.
 * - next dev (NODE_ENV=development): always fresh (force-dynamic)
 * - next build / start / Docker production: ISR revalidate window
 *
 * Docker image build creates an empty SQLite file so prerender can open the DB.
 * Runtime mounts the real volume over /app/data; ISR refreshes within revalidate.
 */
const isDev = process.env.NODE_ENV === 'development';

export const publicDynamic = isDev ? ('force-dynamic' as const) : ('auto' as const);

/** Seconds; ignored when force-dynamic (dev). */
export const publicRevalidate = isDev ? 0 : 60;

/** Bust public caches after admin content changes (no-op needed in force-dynamic/dev). */
export function revalidatePublicContent(kind: 'news' | 'gallery' | 'all' = 'all') {
  if (kind === 'news' || kind === 'all') {
    revalidatePath('/');
    revalidatePath('/tin-tuc');
    revalidatePath('/tin-tuc', 'layout');
  }
  if (kind === 'gallery' || kind === 'all') {
    revalidatePath('/thu-vien-anh');
  }
}