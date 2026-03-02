import type { ReactNode } from "react";
import { Handle, Position } from "reactflow";

interface BaseNodeProps {
  title: string;
  children: ReactNode;
}

export function BaseNode({ title, children }: BaseNodeProps) {
  return (
    <div className="rounded border bg-white shadow-sm min-w-[220px]">
      <div className="px-2 py-1 border-b text-xs font-semibold text-gray-700 bg-gray-50 rounded-t">
        {title}
      </div>
      <div className="p-2 text-sm">{children}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

