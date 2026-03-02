import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function VideoNode({ data }: NodeProps<{ url?: string }>) {
  return (
    <BaseNode title="Video">
      {data?.url ? (
        <div className="text-xs text-gray-700 break-all">{data.url}</div>
      ) : (
        <p className="text-gray-600 text-sm">No video URL set</p>
      )}
    </BaseNode>
  );
}

