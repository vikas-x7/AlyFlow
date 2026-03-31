'use client';

import type { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { BsLayoutSidebar } from 'react-icons/bs';
import { useState } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-foreground/60" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((p) => !p)} />
      <div className="flex-1 flex flex-col relative">
        {/* Floating sidebar toggle button on canvas */}
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className="absolute top-3 left-3 z-10 p-1.5 rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer backdrop-blur-sm"
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <BsLayoutSidebar size={14} />
        </button>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
