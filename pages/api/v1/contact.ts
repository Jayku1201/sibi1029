import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      message
    }
  });

  console.log(`New contact message from ${name} <${email}>: ${message}`);

  res.status(200).json({ status: 'success' });
}
