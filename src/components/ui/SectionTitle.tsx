import React from 'react';
export const SectionTitle: React.FC<{title: string}> = ({ title }) => (
  <div className="mb-3">
    <h2 className="text-xl font-semibold">{title}</h2>
  </div>
);
