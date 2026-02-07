'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Modal } from '@/components/ui/modal';
import { siteContent } from '@/config/siteContent';
import { Button } from '@/components/ui/button';

export function Surprise() {
  const [open, setOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const reduce = useReducedMotion();

  const hasSong = Boolean(siteContent.songPath);

  function toggleAudio() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <section id="surprise" className="section-padding mx-auto w-full max-w-6xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Surprise</p>
        <h2 className="font-display text-3xl md:text-4xl">A little gift just for you</h2>
      </div>
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
        <motion.button
          className="relative mx-auto h-56 w-56"
          whileHover={reduce ? {} : { scale: 1.03 }}
          whileTap={reduce ? {} : { scale: 0.97 }}
          onClick={() => setOpen(true)}
          aria-label="Open the surprise"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 to-fuchsia-400 shadow-glow" />
          <div className="absolute inset-6 rounded-2xl bg-white/80" />
          <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-rose-200/70" />
          <div className="absolute left-0 top-1/2 h-6 w-full -translate-y-1/2 bg-rose-200/70" />
          <div className="absolute left-1/2 top-[-16px] h-10 w-10 -translate-x-1/2 rounded-full border-4 border-rose-200/70" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-rose-700">
            Tap to open
          </span>
        </motion.button>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold">The surprise is waiting</h3>
          <p className="mt-3 text-[color:var(--muted)]">
            Click the gift to reveal a note, photos, and a song that reminds me of you.
          </p>
          {hasSong && (
            <div className="mt-4 flex items-center gap-3">
              <Button variant="secondary" onClick={toggleAudio}>
                {playing ? 'Pause Song' : 'Play Song'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {hasSong && <audio ref={audioRef} src={siteContent.songPath} preload="none" />}

      <Modal open={open} onClose={() => setOpen(false)} title="Surprise!">
        <div className="space-y-5">
          <p className="text-lg font-medium">{siteContent.surpriseMessage}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.surprisePhotos.map((label) => (
              <div
                key={label}
                className="flex h-28 items-center justify-center rounded-xl border border-dashed border-rose-200 bg-white/60 text-xs uppercase tracking-[0.2em] text-rose-500"
              >
                {label}
              </div>
            ))}
          </div>
          {hasSong && (
            <div className="flex items-center gap-3">
              <Button onClick={toggleAudio}>{playing ? 'Pause Song' : 'Play Song'}</Button>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
}
