import type { ReactNode } from "react";

interface BaseNodeProps {
  children: ReactNode;
}

export function BaseNode({ children }: BaseNodeProps) {
  return <div className="rounded border bg-white p-2 shadow-sm">{children}</div>;
}

