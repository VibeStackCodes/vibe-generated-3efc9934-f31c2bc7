import React from 'react';
import { cn } from '@/utils';
import { ButtonProps as Props } from '@/types';

import { cn as _cn } from '@/lib/utils';
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = React.memo(({
  variant = 'primary', size = 'md', disabled, loading, onClick, className, children, ...rest
}) => {
  const base = 'rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const color = variant === 'primary' ? 'bg-brand text-white hover:bg-blue-600' :
                variant === 'secondary' ? 'bg-gray-800 text-white hover:bg-gray-700' :
                variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-transparent text-brand';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const cls = _cn(base, sizeClass, color, disabledClass, className);
  return (
    <button disabled={disabled || loading} onClick={onClick} className={cls} {...rest} aria-label={typeof children === 'string' ? (children as string) : 'button'}>
      {loading ? 'Loading...' : children}
    </button>
  );
});
Button.displayName = 'Button';

export default Button;
