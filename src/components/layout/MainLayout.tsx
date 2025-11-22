import React from 'react';
import { Link } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <header className="bg-black/60 border-b border-gray-700">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <span className="text-brand text-xl font-semibold">RoamFlow</span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
          <Link to="/blog" className="text-white hover:underline">Blog</Link>
          <Link to="/settings" className="text-white hover:underline">Settings</Link>
        </nav>
      </div>
    </header>
  );
};

export default MainLayout;
