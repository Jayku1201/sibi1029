import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/v1/auth/login', { email, password });
      await router.push('/admin');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout" style={{ justifyContent: 'center' }}>
      <Head>
        <title>SiBi CMS Login</title>
      </Head>
      <main className="admin-content" style={{ maxWidth: 420 }}>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit} className="section-card" style={{ background: 'rgba(11,37,69,0.85)' }}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
          {error && <p style={{ color: '#f87171' }}>{error}</p>}
        </form>
      </main>
    </div>
  );
}
