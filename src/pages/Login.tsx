import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState('Mira');
  const [role, setRole] = useState<'viewer'|'editor'|'admin'>('editor');
  const [needs2fa, setNeeds2fa] = useState(false);
  const [code, setCode] = useState('');

  const onLogin = () => {
    login(name, role);
    // simulate 2FA requirement for admins
    if (role === 'admin') {
      setNeeds2fa(true);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="text-3xl font-semibold mb-4">RoamFlow - Sign In</h1>
      <div className="space-y-3 max-w-md">
        <input className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        <select className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white" value={role} onChange={(e)=>setRole(e.target.value as any)}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <Button onClick={onLogin} className="w-full" variant="primary">Login as {name} ({role})</Button>
      </div>
      {needs2fa && (
        <div className="mt-6 p-4 rounded border border-accent bg-gray-900 max-w-md">
          <p className="mb-2">Two-Factor Authentication required. Enter code:</p>
          <input className="w-full p-2 rounded border border-gray-700 bg-black" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="123456" />
          <div className="mt-2 flex justify-end">
            <span className="text-sm text-gray-400">Using mock 2FA: code must be 123456</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
