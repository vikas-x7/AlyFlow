import { BaseNode } from './BaseNode';
import type { NodeProps } from 'reactflow';
import { useState, useRef, useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { useCanvasStore } from '@/modules/canvas/store/canvas.store';

export function TextNode({
  id,
  data,
  selected,
}: NodeProps<{
  text?: string;
  isUserResized?: boolean;
  bgColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  width?: number;
  height?: number;
}>) {
  const [value, setValue] = useState(data?.text ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setNodes, getNodes } = useReactFlow();
  const pushHistory = useCanvasStore((s) => s.pushHistory);
  const minHeight = 44;

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(scrollHeight, minHeight);

      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${scrollHeight}px`;

      if (data?.isUserResized) {
        const currentNodes = getNodes();
        const nodeStyle = currentNodes.find((n) => n.id === id)?.style;
        const currentHeight = Number(nodeStyle?.height) || minHeight;
        if (scrollHeight > currentHeight) {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    data: { ...node.data, isUserResized: false },
                    style: {
                      ...node.style,
                      height: newHeight,
                    },
                  }
                : node,
            ),
          );
        }
      } else {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  style: {
                    ...node.style,
                    height: newHeight,
                  },
                }
              : node,
          ),
        );
      }
    }
  }, [value, id, data?.isUserResized, setNodes, getNodes, minHeight]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    setNodes((nodes) => nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, text: e.target.value } } : n)));
  }

  return (
    <BaseNode id={id} selected={selected} isUserResized={data?.isUserResized} bgColor={data?.bgColor}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onFocus={() => pushHistory()}
        onMouseDown={(e) => e.stopPropagation()}
        rows={1}
        className="border-none outline-none resize-none overflow-hidden w-full text-[20px] text-left text-black font-gothic bg-transparent"
        style={{
          fontWeight: data?.bold ? 'bold' : 'normal',
          fontStyle: data?.italic ? 'italic' : 'normal',
          textDecoration: data?.underline ? 'underline' : 'none',
        }}
      />
    </BaseNode>
  );
}
