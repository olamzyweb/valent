'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Modal({
  open,
  onClose,
  title,
  className,
  children
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    if (open) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Dialog'}
            className={cn(
              'glass-card relative w-full max-w-2xl rounded-3xl p-6 md:p-8',
              className
            )}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            onClick={(event) => event.stopPropagation()}
          >
            {title && <h3 className="text-xl font-semibold">{title}</h3>}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-rose-200 bg-white/70 px-3 py-1 text-xs font-semibold text-rose-600"
            >
              Close
            </button>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
