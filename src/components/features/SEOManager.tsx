import React from 'react';

export interface SeoManagerProps {
  title: string;
  description: string;
}

export const SEOManager: React.FC<SeoManagerProps> = ({ title, description }) => {
  return (
    <section aria-label="SEO Manager" className="container py-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded border bg-gray-900">
          <div className="text-sm text-gray-400">SEO Title</div>
          <div className="font-semibold">{title || '(no title)'}</div>
        </div>
        <div className="p-4 rounded border bg-gray-900">
          <div className="text-sm text-gray-400">SEO Description</div>
          <div className="font-semibold">{description || '(no description)'}</div>
        </div>
      </div>
    </section>
  );
};

export default SEOManager;
