'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function BackgroundBlobs() {
  const reduce = useReducedMotion();

  const base = reduce
    ? { opacity: 0.6 }
    : {
        opacity: [0.45, 0.65, 0.5],
        scale: [1, 1.1, 1],
        transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
      };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="blob absolute -top-24 left-[-120px] h-[280px] w-[280px] rounded-full bg-rose-300/70"
        animate={base}
      />
      <motion.div
        className="blob absolute top-32 right-[-140px] h-[320px] w-[320px] rounded-full bg-fuchsia-300/60"
        animate={base}
      />
      <motion.div
        className="blob absolute bottom-[-120px] left-[20%] h-[260px] w-[260px] rounded-full bg-pink-300/60"
        animate={base}
      />
    </div>
  );
}
