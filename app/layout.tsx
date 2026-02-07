import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Great_Vibes, Playfair_Display, Manrope } from 'next/font/google';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700']
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

const script = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Valent',
  description: 'Create a shareable Valentine in seconds.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${script.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
