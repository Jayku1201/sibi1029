import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// NOTE: For email notifications you would integrate with Resend or other service.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed');
  }

  const { name, company, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  // Insert into DB
  await prisma.contactSubmission.create({
    data: { name, company, email, message },
  });

  // TODO: send notification email using Resend or other service

  return res.status(200).json({ success: true });
}