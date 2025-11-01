import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug: string }

  if (req.method === 'GET') {
    const page = await prisma.page.findUnique({ where: { slug } })
    return res.status(200).json(page ?? null)
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title, content },
      create: { slug, title, content },
    })
    return res.status(200).json(page)
  }

  res.setHeader('Allow', 'GET,PUT')
  res.status(405).end('Method Not Allowed')
}
