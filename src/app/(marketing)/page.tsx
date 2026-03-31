'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FAQ from '@/modules/marketing/components/Faq';
import { Features } from '@/modules/marketing/components/Features';
import { Footer } from '@/modules/marketing/components/Footer';
import { Hero } from '@/modules/marketing/components/Hero';

import Navbar from '@/modules/marketing/components/Navbar';
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
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <TrustedSection />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
