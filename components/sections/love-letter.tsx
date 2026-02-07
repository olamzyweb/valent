'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/config/siteContent';

export function LoveLetter() {
  const reduce = useReducedMotion();
  const fullText = siteContent.loveLetter;
  const [displayed, setDisplayed] = React.useState(reduce ? fullText : '');
  const [toast, setToast] = React.useState('');

  React.useEffect(() => {
    if (reduce) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [reduce, fullText]);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(fullText);
      setToast('Copied to clipboard!');
    } catch {
      setToast('Unable to copy.');
    } finally {
      window.setTimeout(() => setToast(''), 1600);
    }
  }

  function downloadLetter() {
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'love-letter.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="letter" className="section-padding mx-auto w-full max-w-6xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Love Letter</p>
        <h2 className="font-display text-3xl md:text-4xl">A note straight from my heart</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          className="glass-card rounded-3xl p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        >
          <pre className="whitespace-pre-wrap font-body text-base leading-relaxed text-[color:var(--muted)]">
            {displayed}
          </pre>
        </motion.div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xl font-semibold">Keep it close</h3>
          <p className="mt-3 text-[color:var(--muted)]">
            Save this letter, share it, or just read it whenever you want a reminder.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={copyMessage}>Copy Message</Button>
            <Button variant="secondary" onClick={downloadLetter}>
              Download Letter
            </Button>
          </div>
          {toast && (
            <div className="mt-4 rounded-full bg-rose-100 px-4 py-2 text-xs font-semibold text-rose-600">
              {toast}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
