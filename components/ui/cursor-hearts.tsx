'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';

const MAX_HEARTS = 12;

export function CursorHearts({ enabled }: { enabled: boolean }) {
  const reduce = useReducedMotion();
  const [hearts, setHearts] = React.useState<{ id: number; x: number; y: number }[]>([]);

  React.useEffect(() => {
    if (!enabled || reduce) return;

    let id = 0;
    function onMove(event: MouseEvent) {
      id += 1;
      const next = { id, x: event.clientX, y: event.clientY };
      setHearts((prev) => [...prev.slice(-MAX_HEARTS + 1), next]);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, reduce]);

  if (!enabled || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float text-pink-400"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
            animationDuration: '1.6s'
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
