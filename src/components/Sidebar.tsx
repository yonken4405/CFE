'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, User, Home, LogOut } from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('cfe_user') || 'null');
    if (user) setRole(user.role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cfe_user');
    router.replace('/login');
  };

  const goToDashboard = () => {
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'dods') router.push('/dods/dashboard');
    else if (role === 'dean') router.push('/dean/dashboard');
    else if (role === 'faculty') router.push('/faculty/dashboard');
  };

  return (
    <div className={`h-screen bg-blue-600 text-white flex flex-col ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      <button onClick={() => setCollapsed(!collapsed)} className="p-4 hover:bg-blue-700">
        <Menu />
      </button>

      <nav className="flex-1 space-y-2 mt-4">
        <button onClick={goToDashboard} className="flex items-center gap-3 p-4 hover:bg-blue-700 w-full text-left">
          <Home />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {role === 'admin' && (
          <button onClick={() => router.push('/admin/users')} className="flex items-center gap-3 p-4 hover:bg-blue-700 w-full text-left">
            <User />
            {!collapsed && <span>Manage Users</span>}
          </button>
        )}
      </nav>

      <button onClick={handleLogout} className="flex items-center gap-3 p-4 hover:bg-blue-700 w-full text-left mb-4">
        <LogOut />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
}
