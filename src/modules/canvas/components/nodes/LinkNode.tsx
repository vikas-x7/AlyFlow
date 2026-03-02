import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function LinkNode({ data }: NodeProps<{ url?: string; label?: string }>) {
  return (
    <BaseNode title="Link">
      {data?.url ? (
        <a className="text-blue-600 underline break-all" href={data.url} target="_blank" rel="noreferrer">
          {data.label?.trim() ? data.label : data.url}
        </a>
      ) : (
        <p className="text-gray-600 text-sm">No link URL set</p>
      )}
    </BaseNode>
  );
}

