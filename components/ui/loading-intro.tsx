'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function LoadingIntro() {
  const reduce = useReducedMotion();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-rose-950/80 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-4xl font-semibold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            Valentine
          </motion.div>
          <motion.div
            className="mt-3 h-1 w-40 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-fuchsia-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <button
            className="mt-6 rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.2em]"
            onClick={() => setShow(false)}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
