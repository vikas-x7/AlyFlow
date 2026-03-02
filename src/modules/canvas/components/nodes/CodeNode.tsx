import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function CodeNode({ data }: NodeProps<{ code?: string; language?: string }>) {
  return (
    <BaseNode title={`Code${data?.language ? ` (${data.language})` : ""}`}>
      <pre className="text-xs whitespace-pre-wrap">{data?.code ?? "// code..."}</pre>
    </BaseNode>
  );
}

