'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConfettiBurst } from '@/components/ui/confetti-burst';
import { cn } from '@/lib/utils';

function randomOffset(max: number) {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return sign * (Math.random() * max + 20);
}

type FinalCTAProps = {
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
};

export function FinalCTA({
  title = 'Will you be my Valentine?',
  subtitle = 'There is only one correct answer, but you can still try.',
  id = 'valentine',
  className
}: FinalCTAProps) {
  const reduce = useReducedMotion();
  const [noOffset, setNoOffset] = React.useState({ x: 0, y: 0 });
  const [celebrate, setCelebrate] = React.useState(false);
  const [confettiKey, setConfettiKey] = React.useState(0);

  const confettiPieces = React.useMemo(
    () =>
      Array.from({ length: 26 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        color: ['#ff6b9a', '#ff2f6f', '#f9a8d4', '#c084fc', '#f472b6'][
          Math.floor(Math.random() * 5)
        ]
      })),
    []
  );

function dodgeNo() {
  if (reduce) return;
  setNoOffset({ x: randomOffset(140), y: randomOffset(70) });
}

  function handleYesClick() {
    setCelebrate(true);
    setConfettiKey((prev) => prev + 1);
  }

  return (
    <section id={id} className={cn('section-padding mx-auto w-full max-w-6xl py-20', className)}>
      <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-16">
        <h2 className="font-display love-title text-3xl md:text-4xl">{title}</h2>
        <p className="mt-3 text-[color:var(--muted)]">{subtitle}</p>

        <div className="relative mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6">
          <motion.button
            className={cn(
              'rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow',
              'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500',
              celebrate ? 'animate-pulseGlow' : ''
            )}
            onClick={handleYesClick}
            aria-label="Yes, be my Valentine"
          >
            Yes ??
          </motion.button>
          <motion.button
            className="rounded-full border border-rose-200 bg-white/80 px-6 py-3 text-sm font-semibold text-rose-600"
            onPointerEnter={dodgeNo}
            onPointerDown={dodgeNo}
            animate={noOffset}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            aria-label="No"
          >
            No ??
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {celebrate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConfettiBurst trigger={confettiKey} />
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl bg-white/90 p-10 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            >
              <h3 className="font-display text-3xl text-rose-600">
                Yay! You're officially my Valentine ??
              </h3>
              <p className="mt-3 text-[color:var(--muted)]">
                I can't wait to celebrate you today and every day after.
              </p>
              <Button className="mt-6" onClick={() => setCelebrate(false)}>
                Close
              </Button>

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {confettiPieces.map((piece) => (
                  <motion.span
                    key={piece.id}
                    className="absolute top-0 h-3 w-2 rounded-full"
                    style={{ left: `${piece.left}%`, backgroundColor: piece.color }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 420, opacity: [0, 1, 0] }}
                    transition={{
                      duration: reduce ? 0 : 1.6,
                      delay: piece.delay,
                      ease: 'easeOut'
                    }}
                  />
                ))}
                {Array.from({ length: 10 }).map((_, index) => (
                  <motion.span
                    key={`heart-${index}`}
                    className="absolute bottom-8 text-pink-400"
                    style={{ left: `${10 + index * 8}%` }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -120, opacity: [0, 1, 0] }}
                    transition={{ duration: reduce ? 0 : 2, delay: 0.2 + index * 0.05 }}
                  >
                    ?
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
