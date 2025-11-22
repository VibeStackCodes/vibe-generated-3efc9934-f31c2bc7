import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/providers/AuthProvider';
import { DashboardPage } from '@/pages/Dashboard';
import { BlogPage } from '@/pages/Blog';
import { SettingsPage } from '@/pages/Settings';
import { LoginPage } from '@/pages/Login';
import { MainLayout } from '@/components/layout/MainLayout';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Default export for potential testing environments
export default App;
