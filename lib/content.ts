import { prisma } from './prisma';

export type ContentSection =
  | 'hero'
  | 'about'
  | 'paths'
  | 'metrics'
  | 'contact';

export async function getSectionContent(section: ContentSection) {
  const blocks = await prisma.contentBlock.findMany({
    where: { section },
    orderBy: { fieldKey: 'asc' }
  });

  return blocks.reduce<Record<string, unknown>>((acc, block) => {
    acc[block.fieldKey] = block.content;
    return acc;
  }, {});
}

export async function setSectionContent(section: ContentSection, data: Record<string, unknown>) {
  const entries = Object.entries(data);
  await prisma.$transaction(
    entries.map(([fieldKey, value]) =>
      prisma.contentBlock.upsert({
        where: { section_fieldKey: { section, fieldKey } },
        update: { content: value },
        create: { section, fieldKey, content: value }
      })
    )
  );
}
