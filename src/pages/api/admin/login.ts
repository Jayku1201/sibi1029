import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// In a real application this would issue a session cookie or JWT; for simplicity we return a success flag.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed');
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  // Compare plain password to stored admin password
  const ok = password === ADMIN_PASSWORD;
  if (!ok) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // In a real app, set auth cookie here
  return res.status(200).json({ success: true });
}