import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const MonetizationPanel: React.FC = () => {
  const [affiliate, setAffiliate] = useState({ name: '', url: '' });
  const [ads, setAds] = useState<{ id: string; name: string; active: boolean }[]>([
    { id: 'ad1', name: 'Header Banner', active: true },
  ]);
  const addAffiliate = () => {
    if (!affiliate.name || !affiliate.url) return;
    // In a real app, we'd persist; here we just log to UI state
    setAffiliate({ name: '', url: '' });
  };
  const addAd = () => {
    setAds((a) => [...a, { id: 'ad' + (a.length + 1), name: 'New Ad Slot', active: true }]);
  };
  return (
    <section aria-label="Monetization" className="container py-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Affiliate Links">
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded border border-gray-700 bg-black text-white" placeholder="Name" value={affiliate.name} onChange={(e)=>setAffiliate(a => ({...a, name: e.target.value}))} />
            <input className="flex-1 p-2 rounded border border-gray-700 bg-black text-white" placeholder="URL" value={affiliate.url} onChange={(e)=>setAffiliate(a => ({...a, url: e.target.value}))} />
            <button className="px-4 py-2 rounded bg-brand text-white" onClick={addAffiliate as any}>Add</button>
          </div>
          <ul className="mt-2 text-sm text-gray-300">
            <li>Example: <a href="#" className="text-blue-300">Affiliate Link</a></li>
          </ul>
        </Card>
        <Card title="Ad Slots">
          <Button onClick={addAd}>Add Ad Slot</Button>
          <ul className="mt-2 text-sm text-gray-300">
            {ads.map((a)=> (
              <li key={a.id}>{a.name} - {a.active ? 'Active' : 'Paused'}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default MonetizationPanel;
