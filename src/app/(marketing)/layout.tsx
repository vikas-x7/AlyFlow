import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#010102]">
      <div>{children}</div>
    </div>
  );
}
