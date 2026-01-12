import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function FileNode({
  data,
}: NodeProps<{ filename?: string; url?: string }>) {
  return (
    <BaseNode title="File" titleColor="#34a3e4" indicatorColor="#059669">
      <div className="text-sm font-medium">
        {data?.filename ?? "Untitled file"}
      </div>
      {data?.url ? (
        <a
          className="text-xs text-blue-600 underline break-all"
          href={data.url}
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>
      ) : (
        <div className="text-xs text-gray-600">No file URL set</div>
      )}
    </BaseNode>
  );
}
