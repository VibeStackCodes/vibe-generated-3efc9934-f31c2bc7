import React from 'react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { formatDate, formatCurrency } from '@/lib/utils';

export const DashboardPage: React.FC = () => {
  // Simple dashboard metrics, derived from local storage mock data
  const now = new Date();
  const today = formatDate(now);
  const revenue = 1290; // placeholder

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <SectionTitle title="Overview" />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card title="Today" subtitle={today}>
          <div className="text-xl font-semibold">{formatCurrency(9.99)}</div>
        </Card>
        <Card title="Revenue" subtitle="Lifetime" >
          <div className="text-xl font-semibold">{formatCurrency(revenue)}</div>
        </Card>
        <Card title="Drafts" subtitle="Local" >
          <div className="text-xl font-semibold">0</div>
        </Card>
      </div>
      <SectionTitle title="Quick Actions" />
      <div className="flex flex-wrap gap-3">
        <div className="p-4 rounded border bg-gray-900">New Post</div>
        <div className="p-4 rounded border bg-gray-900">Manage SEO</div>
        <div className="p-4 rounded border bg-gray-900">Itineraries</div>
      </div>
    </div>
  );
};

export default DashboardPage;
