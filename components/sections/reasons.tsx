'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteContent } from '@/config/siteContent';
import { cn } from '@/lib/utils';

export function Reasons() {
  const [flipped, setFlipped] = React.useState<Record<number, boolean>>({});
  const reduce = useReducedMotion();

  return (
    <section id="reasons" className="section-padding mx-auto w-full max-w-6xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Reasons I Love You</p>
        <h2 className="font-display text-3xl md:text-4xl">A few of my favorite things about you</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {siteContent.reasons.map((reason, index) => {
          const isFlipped = flipped[index];
          return (
            <motion.button
              key={reason.title}
              type="button"
              className="group relative h-48 w-full rounded-2xl text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              onClick={() =>
                setFlipped((prev) => ({
                  ...prev,
                  [index]: !prev[index]
                }))
              }
              aria-pressed={isFlipped}
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]',
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                )}
              >
                <div className="glass-card absolute inset-0 flex flex-col justify-between rounded-2xl p-5 [backface-visibility:hidden]">
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                  <span className="text-xs uppercase tracking-[0.25em] text-rose-500">Tap to flip</span>
                </div>
                <div className="glass-card absolute inset-0 rounded-2xl p-5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p className="text-sm text-[color:var(--muted)]">{reason.message}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
