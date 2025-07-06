// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('cfe_user') || 'null');

    if (!user) {
      router.replace('/login');
      return;
    }

    switch (user.role) {
      case 'admin':
        router.replace('/admin/dashboard');
        break;
      case 'dods':
        router.replace('/dods/dashboard');
        break;
      case 'dean':
        router.replace('/dean/dashboard');
        break;
      case 'faculty':
        router.replace('/faculty/dashboard');
        break;
      default:
        router.replace('/login');
    }
  }, [router]);

  return null;
}
