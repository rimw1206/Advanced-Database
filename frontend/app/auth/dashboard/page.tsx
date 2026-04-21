'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard for now
    router.push('/admin');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)'
    }}>
      <div>
        <h1>Đang chuyển hướng...</h1>
        <p>Chuyển đến trang quản trị</p>
      </div>
    </div>
  );
}