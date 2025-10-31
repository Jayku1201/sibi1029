import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await axios.post('/api/v1/auth/logout');
      router.replace('/admin/login');
    };
    void performLogout();
  }, [router]);

  return (
    <div className="admin-layout" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <main className="admin-content" style={{ maxWidth: 400 }}>
        <p>Logging out…</p>
      </main>
    </div>
  );
}
