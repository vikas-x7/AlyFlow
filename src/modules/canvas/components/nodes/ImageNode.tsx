import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";
import { useState, useRef, useCallback } from "react";
import { useReactFlow } from "reactflow";

export function ImageNode({
  id,
  data,
}: NodeProps<{ url?: string; fileName?: string; bgColor?: string }>) {
  const [preview, setPreview] = useState<string | null>(data?.url ?? null);
  const [fileName, setFileName] = useState<string | null>(
    data?.fileName ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNodes } = useReactFlow();

  const applyFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreview(url);
        setFileName(file.name);
        setNodes((nodes) =>
          nodes.map((n) =>
            n.id === id
              ? { ...n, data: { ...n.data, url, fileName: file.name } }
              : n,
          ),
        );
      };
      reader.readAsDataURL(file);
    },
    [id, setNodes],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id
          ? { ...n, data: { ...n.data, url: undefined, fileName: undefined } }
          : n,
      ),
    );
  };

  return (
    <BaseNode
      title="Image"
      titleColor="#34d399"
      indicatorColor="#059669"
      bgColor={data?.bgColor}
    >
      <div className="w-full min-w-55 p-0">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div
            className="relative rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt=""
              className="w-full max-h-50 object-cover block rounded-lg border border-[#1f1f1f]"
            />

            {/* Top-right buttons */}
            <div
              className={`absolute top-1.5 right-1.5 flex flex-row gap-1 transition-opacity duration-200 ${
                isHovering
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => inputRef.current?.click()}
                className="bg-[#0e0e0fcc] backdrop-blur-md border border-[#34d39940] text-[#34d399] text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded cursor-pointer hover:bg-[#34d39915] transition-colors"
              >
                Replace
              </button>
              <button
                onClick={handleRemove}
                className="bg-[#0e0e0fcc] backdrop-blur-md border border-[#ef444440] text-[#ef4444] text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded cursor-pointer hover:bg-[#ef444415] transition-colors"
              >
                Remove
              </button>
            </div>

            {/* Filename badge */}
            {fileName && (
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/80 to-transparent text-[9.5px] text-[#6b7280] font-mono truncate pointer-events-none">
                {fileName}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 py-7 px-4 cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-[#34d399] bg-[#34d39908]"
                : "border-[#2a2a2a] bg-[#0c0c0d] hover:border-[#3a3a3a]"
            }`}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDragging ? "#34d399" : "#2e2e2e"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>

            <div className="text-center font-mono">
              <p
                className={`text-[11px] m-0 tracking-[0.04em] transition-colors duration-200 ${isDragging ? "text-[#34d399]" : "text-[#4a4a4a]"}`}
              >
                {isDragging ? "Drop it!" : "Click or drag to upload"}
              </p>
              <p className="text-[9.5px] text-[#2e2e2e] mt-0.5 tracking-[0.06em] uppercase">
                PNG · JPG · GIF · WEBP
              </p>
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
