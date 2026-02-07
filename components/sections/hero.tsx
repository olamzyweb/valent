'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/config/siteContent';

export function Hero() {
  const reduce = useReducedMotion();

  const stagger = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12 }
    }
  };

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section id="home" className="section-padding relative mx-auto w-full max-w-6xl pt-16">
      <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-16 md:px-14">
        <div className="absolute inset-0">
          <div className="absolute -top-10 right-0 h-44 w-44 rounded-full bg-rose-200/60 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-36 w-36 rounded-full bg-fuchsia-200/50 blur-2xl" />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-6">
            <motion.p variants={stagger} className="text-sm uppercase tracking-[0.3em] text-rose-500">
              Valentine’s Day
            </motion.p>
            <motion.h1 variants={stagger} className="font-display text-4xl leading-tight md:text-5xl">
              Happy Valentine’s Day, <span className="gradient-text">{siteContent.recipientName}</span> 💝
            </motion.h1>
            <motion.p variants={stagger} className="max-w-xl text-lg text-[color:var(--muted)]">
              {siteContent.heroMessage}
            </motion.p>
            <motion.div variants={stagger} className="flex flex-wrap gap-3">
              <Button className="shadow-glow" onClick={() => scrollToSection('surprise')}>
                Open Your Surprise
              </Button>
              <Button variant="secondary" onClick={() => scrollToSection('letter')}>
                Read the Note
              </Button>
            </motion.div>
          </div>
          <motion.div variants={stagger} className="relative flex items-center justify-center">
            <motion.div
              animate={
                reduce
                  ? { opacity: 1 }
                  : { y: [0, -12, 0], transition: { duration: 5, repeat: Infinity } }
              }
              className="relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 text-6xl text-white shadow-glow"
            >
              ♥
              <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white/70" />
              <span className="absolute -left-3 bottom-5 h-3 w-3 rounded-full bg-white/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
