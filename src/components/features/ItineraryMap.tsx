import React, { useMemo, useState } from 'react';
import { ItineraryItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ItineraryMap: React.FC = () => {
  const [items, setItems] = useState<ItineraryItem[]>([
    { id: 'i1', title: 'Start at Old Town', date: '2025-04-01', location: 'City Center' },
  ]);
  const [title, setTitle] = useState('');
  const addItem = () => {
    if (!title) return;
    const it: ItineraryItem = { id: 'i' + (items.length + 1), title, date: new Date().toISOString().slice(0,10), location: 'Unknown' };
    setItems((p) => [...p, it]);
    setTitle('');
  };
  const mapStyle: React.CSSProperties = { width: '100%', height: 260, borderRadius: 8, border: '1px solid #374151', background: 'linear-gradient(#0b1020,#111827)' };
  return (
    <section aria-label="Itinerary Maps" className="container py-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Map" subtitle="Itinerary Overview">
          <div style={mapStyle} aria-label="Map placeholder" />
        </Card>
        <Card title="Add Stop">
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded border border-gray-700 bg-black text-white" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="New stop" />
            <Button onClick={addItem}>Add</Button>
          </div>
          <ul className="mt-2 text-sm text-gray-300">
            {items.map((it)=> (
              <li key={it.id}>{it.title} - {it.date}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default ItineraryMap;
