import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";
import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "reactflow";

export function TextNode({ id, data }: NodeProps<{ text?: string }>) {
  const [value, setValue] = useState(data?.text ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setNodes } = useReactFlow();

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, text: e.target.value } } : n,
      ),
    );
  }

  return (
    <BaseNode title="Text" titleColor="#c084fc" indicatorColor="#9333ea">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Start typing..."
        className="w-full h-24 bg-transparent text-xs text-[#9a9a9a] outline-none resize both border border-[#2e2e2e] rounded p-1.5 placeholder:text-white/20 min-h-15 min-w-40 no-scrollbar"
        style={{ resize: "both" }}
      />
    </BaseNode>
  );
}
