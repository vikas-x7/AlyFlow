'use client';

import type { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/canvas');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') return null;

  return <>{children}</>;
}
