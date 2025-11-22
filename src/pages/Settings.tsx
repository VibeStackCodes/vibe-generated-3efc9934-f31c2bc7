import React from 'react';
import { Card } from '@/components/ui/Card';

export const SettingsPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Security" subtitle="TLS, 2FA options">
          <div className="text-sm text-gray-300">TLS is enforced on all endpoints. Optional 2FA per user.</div>
        </Card>
        <Card title="Authors" subtitle="Multi-author publishing">
          <div className="text-sm text-gray-300">Manage permissions, roles, and localization</div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
