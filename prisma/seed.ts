import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { hashPassword } from '../lib/auth';

async function main() {
  const adminEmail = 'admin@sibi-advisory.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Administrator',
      passwordHash: hashPassword(adminPassword),
      role: 'admin'
    }
  });

  const defaultContent: Record<string, Record<string, unknown>> = {
    hero: {
      headline: 'BUILD DEPTH. GROW STEADY.',
      subhead: 'Focus on your future.',
      description: 'A disciplined perspective for long-term growth. We help family businesses and founders build resilient capital structures with clarity and conviction.',
      ctaLabel: 'Start the Conversation'
    },
    about: {
      title: 'About SiBi Strategic Advisory',
      subtitle: '希比策略顧問，陪伴企業家與家族創造穩健長遠的資本藍圖。',
      description:
        'SiBi 提供資本策略、財務規劃與治理顧問服務，協助團隊在關鍵時刻做出深思熟慮的決策。我們專注於結構性的資金配置、跨世代資本治理與新創策略支援。',
      cards: [
        {
          title: 'Deep Insight',
          body: '以嚴謹分析拆解企業資本結構，提出前瞻性的洞察與可行方案。'
        },
        {
          title: 'Steady Growth',
          body: '協助企業建立穩健資金策略，讓成長有節奏且有備援。'
        },
        {
          title: 'Trusted Partnership',
          body: '以長期合作夥伴為目標，陪伴客戶走過市場波動與轉型挑戰。'
        }
      ]
    },
    paths: {
      title: 'Consulting Paths',
      subtitle: '三大顧問路徑，支持企業在各階段的資本策略需求。',
      paths: [
        {
          title: 'Capital Strategy & Governance',
          description:
            '<p>建立清晰的資本治理架構，確保每項決策皆與長期願景對齊。</p>'
        },
        {
          title: 'Founder & Family Office Advisory',
          description:
            '<p>陪伴創辦人與家族在世代交替、投資布局與資產配置上的關鍵決策。</p>'
        },
        {
          title: 'Venture & Innovation Support',
          description:
            '<p>提供新創團隊財務策略、募資節奏與合作資源的整體規劃。</p>'
        }
      ]
    },
    metrics: {
      title: 'Metrics that Matter',
      subtitle: '以數據與紀律守護成長基礎。',
      metrics: [
        { value: '15+', label: 'Years of cross-border advisory experience' },
        { value: '$500M', label: 'Capital allocation guided for clients' },
        { value: '30+', label: 'Founder and family partners served' }
      ]
    },
    contact: {
      title: 'Start a Conversation with SiBi',
      subtitle: '告訴我們您的挑戰，我們將提供合適的策略與資源建議。',
      email: 'hello@sibi-advisory.com',
      labels: {
        name: 'Your Name',
        email: 'Email',
        message: 'How can we help?',
        submit: 'Send Message',
        success: 'Thank you for your message. We will get back to you shortly.'
      }
    }
  };

  await Promise.all(
    Object.entries(defaultContent).map(([section, fields]) =>
      Promise.all(
        Object.entries(fields).map(([fieldKey, content]) =>
          prisma.contentBlock.upsert({
            where: {
              section_fieldKey: {
                section,
                fieldKey
              }
            },
            update: { content },
            create: { section, fieldKey, content }
          })
        )
      )
    )
  );

  console.log('Database seeded.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
