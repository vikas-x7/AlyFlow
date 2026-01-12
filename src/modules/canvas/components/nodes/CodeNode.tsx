import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function CodeNode({
  data,
}: NodeProps<{ code?: string; language?: string }>) {
  return (
    <BaseNode
      title={`Code${data?.language ? ` (${data.language})` : ""}`}
      titleColor="#f59e0b"
      indicatorColor="#d97706"
    >
      <pre className="text-xs whitespace-pre-wrap font-mono text-[#9a9a9a]">
        {data?.code ?? "// code..."}
      </pre>
    </BaseNode>
  );
}
