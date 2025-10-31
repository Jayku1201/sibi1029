import { NextApiRequest, NextApiResponse } from 'next';
import { clearAuthCookie } from '../../../../lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  clearAuthCookie(res);
  res.status(200).json({ status: 'success' });
}
