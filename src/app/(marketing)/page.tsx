'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FAQ from '@/modules/marketing/components/Faq';
import { Footer } from '@/modules/marketing/components/Footer';
import { Hero } from '@/modules/marketing/components/Hero';

import TrustedSection from '@/modules/marketing/components/TrustedSection';

export default function LandingPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') router.replace('/canvas');
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') return null;

  return (
    <main id="home" className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <Hero />

      <TrustedSection />
      <FAQ />

      <Footer />
    </main>
  );
}
