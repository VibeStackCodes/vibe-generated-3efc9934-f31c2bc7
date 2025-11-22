import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <section className="rounded border border-gray-700 bg-gray-900 p-4">
      {title && <div className="text-lg font-semibold mb-2">{title}</div>}
      {subtitle && <div className="text-sm text-gray-400 mb-2">{subtitle}</div>}
      <div>{children}</div>
    </section>
  );
};

export default Card;
