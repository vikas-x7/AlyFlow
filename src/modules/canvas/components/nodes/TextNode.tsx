// TextNode.tsx
import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";
import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "reactflow";

export function TextNode({
  id,
  data,
}: NodeProps<{
  text?: string;
  bgColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}>) {
  const [value, setValue] = useState(data?.text ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, text: e.target.value } } : n,
      ),
    );
  }

  return (
    <BaseNode bgColor={data?.bgColor}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        rows={1}
        className="border-none outline-none resize-none overflow-hidden w-full text-[20px] text-center text-black font-gothic bg-transparent"
        style={{
          fontWeight: data?.bold ? "bold" : "normal",
          fontStyle: data?.italic ? "italic" : "normal",
          textDecoration: data?.underline ? "underline" : "none",
        }}
      />
    </BaseNode>
  );
}
