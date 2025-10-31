import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <header className={styles.header}>
        <div className={styles.brand}>SiBi CMS</div>
        <nav className={styles.nav}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/logout">Logout</Link>
        </nav>
      </header>
      <main className="admin-content">
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
    </div>
  );
}
