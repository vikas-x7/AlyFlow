import type { ReactNode } from "react";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { Navbar } from "@/shared/components/layout/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#010102]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
