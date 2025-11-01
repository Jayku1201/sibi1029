import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    if (res.ok) {
      setLoggedIn(true);
      setPassword('');
    } else {
      setError(json.error || '登入失敗');
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 border rounded-lg">
          <h1 className="text-xl font-bold mb-4">管理者登入</h1>
          <input
            type="password"
            placeholder="輸入管理密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            登入
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  // Placeholder once logged in
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">網站後台管理</h1>
      <p>您已登入。這裡將提供區塊編輯、圖片上傳、導覽與社群連結設定等功能。</p>
    </div>
  );
}