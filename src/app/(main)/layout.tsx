"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { BsLayoutSidebar } from "react-icons/bs";

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
      />
      <div className="flex-1 flex flex-col relative">
        {/* Floating sidebar toggle button on canvas */}
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className="absolute top-3 left-3 z-10 p-1.5 rounded-md   text-white/70 hover:text-white hover:bg-[#252525] transition-all cursor-pointer backdrop-blur-sm"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <BsLayoutSidebar size={14} />
        </button>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
