import { SignJWT, jwtVerify } from 'jose';

/** httpOnly cookie that stores the JWT (not a server-side session id) */
export const JWT_COOKIE_NAME = 'admin_token';
export const JWT_MAX_AGE = 60 * 60 * 24; // 1 day

export type AuthUser = {
  id: number;
  username: string;
  role: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

export function canAccessAdmin(role: string): boolean {
  return role === 'admin' || role === 'editor';
}

/** Create a signed JWT for the authenticated user */
export async function createJwt(user: AuthUser): Promise<string> {
  return new SignJWT({
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${JWT_MAX_AGE}s`)
    .sign(getJwtSecret());
}

/** Verify JWT signature + claims; returns user payload or null */
export async function verifyJwt(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const id = Number(payload.sub);
    const username = payload.username;
    const role = payload.role;

    if (!id || typeof username !== 'string' || typeof role !== 'string') {
      return null;
    }

    if (!canAccessAdmin(role)) {
      return null;
    }

    return { id, username, role };
  } catch {
    return null;
  }
}

export function getJwtCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: JWT_MAX_AGE,
    path: '/',
  };
}
