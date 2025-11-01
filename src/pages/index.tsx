import { useEffect, useState } from 'react';

interface PageContent {
  title: string;
  blocks: any;
}

export default function HomePage() {
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/content/home');
        if (res.ok) {
          const json = await res.json();
          setContent(json);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">{content?.title || '希比策略顧問'}</h1>
      </header>
      <main className="flex-1 p-4">
        <p>歡迎來到希比策略顧問的網站。</p>
        {/* TODO: Render dynamic blocks when available */}
      </main>
      <footer className="p-4 border-t text-sm text-center">
        © {new Date().getFullYear()} 希比策略顧問
      </footer>
    </div>
  );
}