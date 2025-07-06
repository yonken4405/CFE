'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ManageUsersPage() {
  const router = useRouter();
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('cfe_user') || 'null');
    if (!user || user.role !== 'admin') {
      router.replace('/');
    } else {
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const { users } = await res.json();
      setUsers(users);
    }
  };

  const handleCreateOrUpdate = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !fullName || (!editingUser && !password)) {
      setErrorMsg('All fields are required.');
      return;
    }

    const method = editingUser ? 'PUT' : 'POST';
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users';
    const body = editingUser
      ? { email, fullName, role }
      : { email, fullName, password, role };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSuccessMsg(editingUser ? 'User updated!' : 'User created!');
      setEmail('');
      setFullName('');
      setPassword('');
      setRole('admin');
      setEditingUser(null);
      fetchUsers();
    } else {
      const { error } = await res.json();
      setErrorMsg(error || 'Operation failed.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });

    if (res.ok) {
      fetchUsers();
    }
  };

  const startEdit = (user: any) => {
    setEditingUser(user);
    setEmail(user.email);
    setFullName(user.full_name);
    setRole(user.role);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEmail('');
    setFullName('');
    setPassword('');
    setRole('admin');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="bg-white p-6 rounded shadow max-w-md space-y-4 mb-8">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {!editingUser && (
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <select
          className="border p-2 w-full rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="dods">Dean of Deans</option>
          <option value="dean">Dean</option>
          <option value="faculty">Faculty</option>
        </select>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreateOrUpdate}
          >
            {editingUser ? 'Update User' : 'Create User'}
          </button>
          {editingUser && (
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.full_name}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => startEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
