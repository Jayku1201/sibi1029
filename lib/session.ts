import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie';
import { verifyToken } from './auth';

const COOKIE_NAME = 'sibi_token';

export function setAuthCookie(res: NextApiResponse, token: string) {
  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/'
  });

  res.setHeader('Set-Cookie', serialized);
}

export function clearAuthCookie(res: NextApiResponse) {
  const serialized = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/'
  });

  res.setHeader('Set-Cookie', serialized);
}

export function getUserFromRequest(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

export function getTokenFromCookie(cookieHeader?: string) {
  const cookies = parse(cookieHeader || '');
  return cookies[COOKIE_NAME];
}

export const COOKIE_NAME_CONST = COOKIE_NAME;
