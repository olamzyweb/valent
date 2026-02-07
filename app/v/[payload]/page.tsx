'use client';

import * as React from 'react';
import Link from 'next/link';
import { decodeVal, getTheme } from '@/lib/val';
import { FinalCTA } from '@/components/sections/final-cta';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { CursorHearts } from '@/components/ui/cursor-hearts';
import { motion } from 'framer-motion';

export default function ValPage({ params }: { params: { payload: string } }) {
  const payload = decodeVal(params.payload);

  if (!payload) {
    return (
      <main className="section-padding flex min-h-screen items-center justify-center py-20">
        <div className="glass-card w-full max-w-xl rounded-3xl border border-white/40 p-10 text-center">
          <h1 className="text-2xl font-semibold">That link did not work</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            It may be incomplete or copied incorrectly.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Create a new val
          </Link>
        </div>
      </main>
    );
  }

  const theme = getTheme(payload.theme);
  const labelClass = theme.id === 'midnight' ? 'text-white/60' : 'text-black/50';
  const [step, setStep] = React.useState(0);

  const steps = [
    `Hey ${payload.toName},`,
    'We have made so many sweet memories together.',
    'You make me smile every single day.',
    'So I have something to ask you...'
  ];

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: theme.background, color: theme.id === 'midnight' ? '#f7e9ee' : '#1f0c14' }}
    >
      <FloatingHearts />
      <CursorHearts enabled />
      <div className="section-padding py-10">
        <div className="flex items-center justify-between text-sm">
          <Link href="/" className="font-semibold tracking-wide">
            <span className="love-title text-2xl text-rose-600">Valent</span>
          </Link>
          <Link href="/" className="rounded-full border border-black/10 px-4 py-2 text-xs">
            Make your own
          </Link>
        </div>
      </div>

      <section className="section-padding pb-16">
        <div
          className="mx-auto max-w-3xl rounded-3xl border border-white/40 p-10 shadow-2xl"
          style={{
            background: theme.card,
            boxShadow: `0 30px 80px ${theme.glow}`
          }}
        >
          <div className="mt-2 h-1 w-20 rounded-full" style={{ background: theme.accent }} />
          {step < steps.length ? (
            <div className="mt-8 space-y-6 text-center">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="love-title text-3xl font-semibold leading-relaxed text-rose-700"
              >
                {steps[step]}
              </motion.p>
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}
                className="rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-400/40"
              >
                Tap to continue
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {step >= steps.length && (
        <FinalCTA
          id="answer"
          title={`Will you be my val, ${payload.toName}?`}
          subtitle="Tap yes to celebrate. No is just for fun."
          className="pt-0"
        />
      )}

      <div className="section-padding pb-16 text-center text-sm text-[var(--muted)]">
        Want to send one back? Make your own in under a minute.
        <div className="mt-6 flex justify-center">
          <Link href="/" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
            Create a val
          </Link>
        </div>
      </div>
    </main>
  );
}
