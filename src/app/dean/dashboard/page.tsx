'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeanDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('cfe_user') || 'null');
    if (!user || user.role !== 'dean') {
      router.replace('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('cfe_user');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">CFE System - Dean Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, Dean!</h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Department Management</h3>
            <p className="text-gray-600">Manage your department's academic structure.</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Faculty Coordination</h3>
            <p className="text-gray-600">Coordinate faculty activities and assignments.</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Reports</h3>
            <p className="text-gray-600">View reports related to your department.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
