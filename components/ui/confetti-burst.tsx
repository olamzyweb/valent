'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ConfettiBurstProps = {
  trigger: number;
  className?: string;
};

export function ConfettiBurst({ trigger, className }: ConfettiBurstProps) {
  const reduce = useReducedMotion();
  const pieces = React.useMemo(
    () =>
      Array.from({ length: 64 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: 1.6 + Math.random() * 1.0,
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 180,
        type: Math.random() > 0.75 ? 'heart' : 'rect',
        color: ['#ff6b9a', '#ff2f6f', '#f9a8d4', '#c084fc', '#f472b6', '#fb7185'][
          Math.floor(Math.random() * 6)
        ]
      })),
    [trigger]
  );

  if (reduce) return null;

  return (
    <div aria-hidden className={cn('pointer-events-none fixed inset-0 z-50', className)}>
      {pieces.map((piece) =>
        piece.type === 'heart' ? (
          <motion.span
            key={`${trigger}-${piece.id}`}
            className="absolute top-0"
            style={{
              left: `${piece.left}%`,
              fontSize: `${piece.size * 1.2}px`,
              color: piece.color
            }}
            initial={{ y: 0, opacity: 0, rotate: piece.rotate }}
            animate={{ y: 540, opacity: [0, 1, 0], rotate: piece.rotate + 180 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut'
            }}
          >
            ♥
          </motion.span>
        ) : (
          <motion.span
            key={`${trigger}-${piece.id}`}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size * 1.8}px`,
              backgroundColor: piece.color
            }}
            initial={{ y: 0, opacity: 0, rotate: piece.rotate }}
            animate={{ y: 540, opacity: [0, 1, 0], rotate: piece.rotate + 160 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut'
            }}
          />
        )
      )}
    </div>
  );
}
