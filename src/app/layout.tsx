import type { ReactNode } from 'react';
import '../styles/globals.css';
import { Providers } from './providers';

import { Zen_Kaku_Gothic_New, JetBrains_Mono, Italiana } from 'next/font/google';

export const metadata = {
  title: 'Alyflow',
};

const gothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-vilo-gothic',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-vilo-mono',
});

const instrument = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${gothic.variable} ${mono.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
