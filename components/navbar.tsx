'use client';

import { Heart, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'Reasons', href: '#reasons' },
  { label: 'Surprise', href: '#surprise' },
  { label: 'Letter', href: '#letter' },
  { label: 'Valentine', href: '#valentine' }
];

export function Navbar({
  cursorHearts,
  onToggleCursor
}: {
  cursorHearts: boolean;
  onToggleCursor: () => void;
}) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-3 z-40 mx-auto w-[min(1200px,95%)]">
      <nav className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 p-2 text-white shadow-glow">
            <Heart size={16} />
          </span>
          <span className="font-display">Valentine</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium md:text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] text-rose-700 transition hover:text-rose-500"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCursor}
            aria-label="Toggle cursor hearts"
            className={cn(
              'rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold transition',
              cursorHearts ? 'bg-rose-100 text-rose-600' : 'bg-white/70 text-rose-600'
            )}
          >
            <span className="flex items-center gap-1">
              <Sparkles size={14} /> Cursor
            </span>
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="rounded-full border border-rose-200 bg-white/70 px-3 py-2 text-xs font-semibold text-rose-600"
          >
            <span className="flex items-center gap-1">
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
