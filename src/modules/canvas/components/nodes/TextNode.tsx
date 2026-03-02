import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function TextNode({ data }: NodeProps<{ text?: string }>) {
  return (
    <BaseNode title="Text">
      <p className="whitespace-pre-wrap">{data?.text ?? "Double click to edit text (todo)"} </p>
    </BaseNode>
  );
}

