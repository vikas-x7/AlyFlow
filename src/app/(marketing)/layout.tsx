import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black">
      <div>{children}</div>
    </div>
  );
}
