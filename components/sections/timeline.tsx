'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { siteContent } from '@/config/siteContent';

export function Timeline() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="section-padding mx-auto w-full max-w-6xl py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Our Story</p>
          <h2 className="font-display text-3xl md:text-4xl">Moments that led to us</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {siteContent.timeline.map((item) => (
          <motion.article
            key={item.title}
            className="glass-card group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:rotate-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-rose-500">{item.date}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-[color:var(--muted)]">{item.description}</p>
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400 opacity-70 transition group-hover:w-32" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
