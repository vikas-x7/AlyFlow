import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#0D0D0D]">
      <div>{children}</div>
    </div>
  );
}
