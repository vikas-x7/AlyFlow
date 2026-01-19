"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Sidebar } from "@/shared/components/layout/Sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/login");
    }
  }, [mounted, token, router]);

  if (!mounted || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010102]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white/60" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#010102]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
