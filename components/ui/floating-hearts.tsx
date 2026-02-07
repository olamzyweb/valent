'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FloatingHeartsProps = {
  className?: string;
  density?: number;
};

export function FloatingHearts({ className, density = 14 }: FloatingHeartsProps) {
  const reduce = useReducedMotion();
  const hearts = React.useMemo(
    () =>
      Array.from({ length: density }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: 30 + Math.random() * 70,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 6,
        drift: 3 + Math.random() * 5,
        opacity: 0.35 + Math.random() * 0.45
      })),
    [density]
  );

  if (reduce) return null;

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-pink-400/80 animate-heartFloat"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`
          }}
        >
          ♥
        </span>
      ))}
      {hearts.slice(0, Math.max(4, Math.floor(density / 2))).map((heart) => (
        <span
          key={`drift-${heart.id}`}
          className="absolute text-rose-300/40 animate-heartDrift"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top + 5}%`,
            fontSize: `${heart.size * 0.8}px`,
            opacity: heart.opacity * 0.6,
            animationDuration: `${heart.drift}s`,
            animationDelay: `${heart.delay * 0.6}s`
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
