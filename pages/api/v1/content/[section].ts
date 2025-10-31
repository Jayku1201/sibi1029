import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/api';
import { ContentSection } from '../../../../lib/content';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section } = req.query;
  const sectionKey = section as ContentSection;
  const allowedSections: ContentSection[] = ['hero', 'about', 'paths', 'metrics', 'contact'];

  if (!sectionKey || !allowedSections.includes(sectionKey)) {
    return res.status(400).json({ error: 'Invalid section' });
  }

  if (req.method === 'GET') {
    const blocks = await prisma.contentBlock.findMany({
      where: { section: sectionKey },
      orderBy: { fieldKey: 'asc' }
    });

    const fields = blocks.reduce<Record<string, unknown>>((acc, block) => {
      acc[block.fieldKey] = block.content;
      return acc;
    }, {});

    return res.status(200).json({ section: sectionKey, fields });
  }

  if (req.method === 'PUT') {
    const admin = requireAdmin(req, res);
    if (!admin) {
      return;
    }

    const data = req.body as Record<string, unknown>;
    await prisma.$transaction(
      Object.entries(data).map(([fieldKey, content]) =>
        prisma.contentBlock.upsert({
          where: { section_fieldKey: { section: sectionKey, fieldKey } },
          update: { content },
          create: { section: sectionKey, fieldKey, content }
        })
      )
    );

    return res.status(200).json({ status: 'success' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
