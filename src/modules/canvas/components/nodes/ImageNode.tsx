import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function ImageNode({ data }: NodeProps<{ url?: string }>) {
  return (
    <BaseNode title="Image" titleColor="#34d399" indicatorColor="#059669">
      {data?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.url}
          alt=""
          className="max-h-32 w-full object-cover rounded border border-[#2e2e2e]"
        />
      ) : (
        <p className="text-xs text-[#6b7280]">No image URL set</p>
      )}
    </BaseNode>
  );
}
