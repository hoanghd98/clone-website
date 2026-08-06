import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import type { AuthUser } from '@/lib/jwt';
import { JWT_COOKIE_NAME, verifyJwt } from '@/lib/jwt';

export type { AuthUser };
export {
  JWT_COOKIE_NAME,
  JWT_MAX_AGE,
  canAccessAdmin,
  createJwt,
  verifyJwt,
  getJwtCookieOptions,
} from '@/lib/jwt';

export async function authenticateUser(
  username: string,
  password: string
): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
}

/** Current logged-in user from JWT cookie (API routes). */
export async function getSessionUser(): Promise<AuthUser | null> {
  const token = cookies().get(JWT_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJwt(token);
}
