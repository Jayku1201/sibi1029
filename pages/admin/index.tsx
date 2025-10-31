import { GetServerSideProps } from 'next';
import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import Toast from '../../components/Toast';
import { getSectionContent } from '../../lib/content';
import { getTokenFromCookie } from '../../lib/session';
import { verifyToken } from '../../lib/auth';

interface HeroContent {
  headline: string;
  subhead: string;
  description: string;
  ctaLabel: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  cards: { title: string; body: string }[];
}

interface PathsContent {
  title: string;
  subtitle: string;
  paths: { title: string; description: string }[];
}

interface MetricsContent {
  title: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
}

interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
  };
}

interface AdminPageProps {
  hero: HeroContent;
  about: AboutContent;
  paths: PathsContent;
  metrics: MetricsContent;
  contact: ContactContent;
}

export default function AdminDashboard({ hero, about, paths, metrics, contact }: AdminPageProps) {
  const [heroState, setHero] = useState(hero);
  const [aboutState, setAbout] = useState(about);
  const [pathsState, setPaths] = useState(paths);
  const [metricsState, setMetrics] = useState(metrics);
  const [contactState, setContact] = useState(contact);
  const [toast, setToast] = useState('');

  const triggerToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSave = async (section: string, payload: unknown) => {
    try {
      await axios.put(`/api/v1/content/${section}`, payload);
      triggerToast('儲存成功');
    } catch (error) {
      console.error(error);
      triggerToast('儲存失敗，請稍後再試。');
    }
  };

  return (
    <AdminLayout title="Content Dashboard">
      {toast && <Toast message={toast} />}

      <section className="section-card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h2>Hero 區</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="primary"
              style={{ background: 'rgba(148, 163, 184, 0.2)', color: '#e2e8f0' }}
              onClick={() => window.open('/#hero', '_blank')}
            >
              預覽
            </button>
            <button className="primary" onClick={() => handleSave('hero', heroState)}>儲存</button>
          </div>
        </header>
        <label>
          主標（headline）
          <input
            type="text"
            value={heroState.headline}
            onChange={(e) => setHero((prev) => ({ ...prev, headline: e.target.value }))}
          />
        </label>
        <label>
          副標（subhead）
          <input
            type="text"
            value={heroState.subhead}
            onChange={(e) => setHero((prev) => ({ ...prev, subhead: e.target.value }))}
          />
        </label>
        <label>
          說明（description）
          <textarea
            rows={4}
            value={heroState.description}
            onChange={(e) => setHero((prev) => ({ ...prev, description: e.target.value }))}
          />
        </label>
        <label>
          CTA 按鈕文字
          <input
            type="text"
            value={heroState.ctaLabel}
            onChange={(e) => setHero((prev) => ({ ...prev, ctaLabel: e.target.value }))}
          />
        </label>
      </section>

      <section className="section-card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h2>About 區</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="primary"
              style={{ background: 'rgba(148, 163, 184, 0.2)', color: '#e2e8f0' }}
              onClick={() => window.open('/#about', '_blank')}
            >
              預覽
            </button>
            <button className="primary" onClick={() => handleSave('about', aboutState)}>儲存</button>
          </div>
        </header>
        <label>
          標題
          <input
            type="text"
            value={aboutState.title}
            onChange={(e) => setAbout((prev) => ({ ...prev, title: e.target.value }))}
          />
        </label>
        <label>
          副標
          <input
            type="text"
            value={aboutState.subtitle}
            onChange={(e) => setAbout((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>
        <label>
          內文
          <textarea
            rows={4}
            value={aboutState.description}
            onChange={(e) => setAbout((prev) => ({ ...prev, description: e.target.value }))}
          />
        </label>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {aboutState.cards.map((card, index) => (
            <div key={card.title + index} className="section-card" style={{ background: 'rgba(15,23,42,0.9)' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>理念卡片 {index + 1}</h3>
              </header>
              <label>
                標題
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) =>
                    setAbout((prev) => {
                      const cards = [...prev.cards];
                      cards[index] = { ...cards[index], title: e.target.value };
                      return { ...prev, cards };
                    })
                  }
                />
              </label>
              <label>
                說明
                <textarea
                  rows={3}
                  value={card.body}
                  onChange={(e) =>
                    setAbout((prev) => {
                      const cards = [...prev.cards];
                      cards[index] = { ...cards[index], body: e.target.value };
                      return { ...prev, cards };
                    })
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Services / Paths 區</h2>
          <button className="primary" onClick={() => handleSave('paths', pathsState)}>儲存</button>
        </header>
        <label>
          標題
          <input
            type="text"
            value={pathsState.title}
            onChange={(e) => setPaths((prev) => ({ ...prev, title: e.target.value }))}
          />
        </label>
        <label>
          副標
          <input
            type="text"
            value={pathsState.subtitle}
            onChange={(e) => setPaths((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {pathsState.paths.map((path, index) => (
            <div key={path.title + index} className="section-card" style={{ background: 'rgba(15,23,42,0.9)' }}>
              <h3>顧問路徑 {index + 1}</h3>
              <label>
                標題
                <input
                  type="text"
                  value={path.title}
                  onChange={(e) =>
                    setPaths((prev) => {
                      const nextPaths = [...prev.paths];
                      nextPaths[index] = { ...nextPaths[index], title: e.target.value };
                      return { ...prev, paths: nextPaths };
                    })
                  }
                />
              </label>
              <label>
                說明（支援 Markdown）
                <textarea
                  rows={4}
                  value={path.description}
                  onChange={(e) =>
                    setPaths((prev) => {
                      const nextPaths = [...prev.paths];
                      nextPaths[index] = { ...nextPaths[index], description: e.target.value };
                      return { ...prev, paths: nextPaths };
                    })
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Metrics 區</h2>
          <button className="primary" onClick={() => handleSave('metrics', metricsState)}>儲存</button>
        </header>
        <label>
          標題
          <input
            type="text"
            value={metricsState.title}
            onChange={(e) => setMetrics((prev) => ({ ...prev, title: e.target.value }))}
          />
        </label>
        <label>
          副標
          <input
            type="text"
            value={metricsState.subtitle}
            onChange={(e) => setMetrics((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {metricsState.metrics.map((metric, index) => (
            <div key={metric.label + index} className="section-card" style={{ background: 'rgba(15,23,42,0.9)' }}>
              <h3>指標 {index + 1}</h3>
              <label>
                數值
                <input
                  type="text"
                  value={metric.value}
                  onChange={(e) =>
                    setMetrics((prev) => {
                      const metricsList = [...prev.metrics];
                      metricsList[index] = { ...metricsList[index], value: e.target.value };
                      return { ...prev, metrics: metricsList };
                    })
                  }
                />
              </label>
              <label>
                說明
                <textarea
                  rows={3}
                  value={metric.label}
                  onChange={(e) =>
                    setMetrics((prev) => {
                      const metricsList = [...prev.metrics];
                      metricsList[index] = { ...metricsList[index], label: e.target.value };
                      return { ...prev, metrics: metricsList };
                    })
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Contact 區</h2>
          <button className="primary" onClick={() => handleSave('contact', contactState)}>儲存</button>
        </header>
        <label>
          標題
          <input
            type="text"
            value={contactState.title}
            onChange={(e) => setContact((prev) => ({ ...prev, title: e.target.value }))}
          />
        </label>
        <label>
          副標
          <textarea
            rows={3}
            value={contactState.subtitle}
            onChange={(e) => setContact((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={contactState.email}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
          />
        </label>
        <div className="section-card" style={{ background: 'rgba(15,23,42,0.9)' }}>
          <h3>表單文字</h3>
          {Object.entries(contactState.labels).map(([key, value]) => (
            <label key={key}>
              {key}
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setContact((prev) => ({
                    ...prev,
                    labels: { ...prev.labels, [key]: e.target.value }
                  }))
                }
              />
            </label>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async ({ req }) => {
  const token = getTokenFromCookie(req.headers.cookie);
  if (!token) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') {
      throw new Error('Not admin');
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  const [hero, about, paths, metrics, contact] = await Promise.all([
    getSectionContent('hero'),
    getSectionContent('about'),
    getSectionContent('paths'),
    getSectionContent('metrics'),
    getSectionContent('contact')
  ]);

  return {
    props: {
      hero,
      about,
      paths,
      metrics,
      contact
    } as AdminPageProps
  };
};
