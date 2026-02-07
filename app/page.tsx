'use client';

import * as React from 'react';
import Link from 'next/link';
import { encodeVal, getTheme, themeOptions, type ValPayload, type ValTheme } from '@/lib/val';
import { CursorHearts } from '@/components/ui/cursor-hearts';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { ConfettiBurst } from '@/components/ui/confetti-burst';

export default function HomePage() {
  const [toName, setToName] = React.useState('');
  const defaultMessage = 'You make my days brighter. Will you be my val?';
  const [theme, setTheme] = React.useState<ValTheme>('rose');
  const [shareLink, setShareLink] = React.useState('');
  const [sharePath, setSharePath] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [confettiKey, setConfettiKey] = React.useState(0);

  const previewTheme = getTheme(theme);
  const previewMessage = defaultMessage;

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ValPayload = {
      toName: toName.trim() || 'My Valentine',
      fromName: 'Someone who adores you',
      message: defaultMessage,
      theme,
      createdAt: new Date().toISOString()
    };
    const token = encodeVal(payload);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setSharePath(`/v/${token}`);
    setShareLink(`${origin}/v/${token}`);
    setCopied(false);
    setConfettiKey((prev) => prev + 1);
  };

  const onCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <CursorHearts enabled />
      {confettiKey > 0 && <ConfettiBurst trigger={confettiKey} />}
      <header className="section-padding pt-8">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-wide">
            <span className="love-title text-2xl text-rose-600">Valent</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#how" className="hover:opacity-80">
              How it works
            </a>
            <a href="#create" className="rounded-full border border-black/10 px-4 py-2 text-sm hover:bg-black/5">
              Create a val
            </a>
          </div>
        </nav>
      </header>

      <section className="section-padding pb-10 pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">For the general public</p>
            <h1 className="text-4xl font-semibold md:text-6xl">
              Make a{' '}
              <span className="love-title text-rose-600">shareable Valentine</span> in seconds.
            </h1>
            <p className="text-lg text-black/70">
              Write a short message, pick a vibe, and send a link. No accounts. No setup. Just a sweet surprise.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#create"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20"
              >
                Create your val
              </a>
              <a
                href="#how"
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-black/80"
              >
                See how it works
              </a>
            </div>
          </div>
          <div
            className="relative rounded-3xl border border-white/40 p-8 shadow-2xl"
            style={{
              background: previewTheme.background,
              boxShadow: `0 30px 80px ${previewTheme.glow}`
            }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/60 blur-3xl" />
              <div className="absolute -bottom-16 -left-6 h-36 w-36 rounded-full bg-rose-200/70 blur-3xl" />
            </div>
            <div className="space-y-5">
              <div className="text-xs uppercase tracking-[0.3em] text-black/50">Preview</div>
              <div className="text-2xl font-semibold">{toName.trim() || 'My Valentine'}</div>
              <p className="text-sm text-black/70">{previewMessage}</p>
              <div className="h-1 w-16 rounded-full" style={{ background: previewTheme.accent }} />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section-padding py-12">
        <div className="grid gap-6 rounded-3xl border border-white/40 bg-white/60 p-8 md:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-black/60">Step 1</div>
            <h3 className="mt-3 text-xl font-semibold text-black">Write the message</h3>
            <p className="mt-2 text-sm text-black/70">A quick, heartfelt note is all you need.</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-black/60">Step 2</div>
            <h3 className="mt-3 text-xl font-semibold text-black">Pick a vibe</h3>
            <p className="mt-2 text-sm text-black/70">Choose a theme that fits your person.</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-black/60">Step 3</div>
            <h3 className="mt-3 text-xl font-semibold text-black">Send the link</h3>
            <p className="mt-2 text-sm text-black/70">Share it anywhere. It just works.</p>
          </div>
        </div>
      </section>

      <section id="create" className="section-padding py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <form
            onSubmit={onCreate}
            className="glass-card rounded-3xl border border-white/40 p-8 shadow-xl"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Create your val</h2>
                <p className="text-sm text-[var(--muted)]">No account needed. You will get a private link.</p>
              </div>
              <label className="block text-sm font-medium">
                To
                <input
                  value={toName}
                  onChange={(event) => setToName(event.target.value)}
                  placeholder="Their name"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-black/80 placeholder:text-black/40 outline-none focus:border-black/30"
                />
              </label>
              <div>
                <div className="text-sm font-medium">Theme</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {themeOptions.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setTheme(option.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        theme === option.id
                          ? 'border-black/50 bg-black text-white'
                          : 'border-black/10 bg-white/70 text-black/70 hover:border-black/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-400/40"
              >
                Create share link
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="glass-card rounded-3xl border border-white/40 p-8">
              <h3 className="text-lg font-semibold">Your share link</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">This link is unlisted. Anyone with it can view.</p>
              <div className="mt-4 flex flex-col gap-3">
                <input
                  readOnly
                  value={shareLink}
                  placeholder="Create a link to see it here"
                  className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-black/80 placeholder:text-black/40"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onCopy}
                    className="flex-1 rounded-full border border-black/10 px-4 py-3 text-sm font-semibold"
                  >
                    {copied ? 'Copied' : 'Copy link'}
                  </button>
                  {sharePath ? (
                    <Link
                      href={sharePath}
                      className="flex-1 rounded-full bg-black px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Open
                    </Link>
                  ) : (
                    <span className="flex-1 rounded-full border border-black/10 px-4 py-3 text-center text-sm text-black/40">
                      Open
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/40 bg-white/70 p-6 text-sm text-[var(--muted)]">
              Tip: this link contains the message, so keep it only with the person you want to surprise.
            </div>
          </div>
        </div>
      </section>

      <footer className="section-padding pb-12 pt-4 text-sm text-[var(--muted)]">
        Built for sharing sweet moments. Make another any time.
      </footer>
    </main>
  );
}
