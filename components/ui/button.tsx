import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        variant === 'primary' &&
          'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-glow hover:scale-[1.02] active:scale-[0.98]',
        variant === 'secondary' &&
          'bg-white/70 text-rose-700 ring-1 ring-rose-200 hover:bg-white',
        variant === 'ghost' &&
          'bg-transparent text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50/70',
        className
      )}
      {...props}
    />
  );
}
