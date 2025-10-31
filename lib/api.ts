import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './auth';
import { getUserFromRequest } from './session';

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = verifyToken(token);
      if (decoded.role !== 'admin') {
        res.status(403).json({ error: 'Forbidden' });
        return null;
      }
      return decoded;
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid token' });
      return null;
    }
  }

  const sessionUser = getUserFromRequest(req as unknown as NextApiRequest);
  if (!sessionUser || sessionUser.role !== 'admin') {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return sessionUser;
}
