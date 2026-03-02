import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function ImageNode({ data }: NodeProps<{ url?: string }>) {
  return (
    <BaseNode title="Image">
      {data?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.url} alt="" className="max-h-32 w-full object-cover rounded" />
      ) : (
        <p className="text-gray-600 text-sm">No image URL set</p>
      )}
    </BaseNode>
  );
}

