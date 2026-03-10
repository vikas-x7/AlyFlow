import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";
import { useState, useRef, useCallback } from "react";
import { useReactFlow } from "reactflow";

export function ImageNode({
  id,
  data,
}: NodeProps<{ url?: string; fileName?: string }>) {
  const [preview, setPreview] = useState<string | null>(data?.url ?? null);
  const [fileName, setFileName] = useState<string | null>(
    data?.fileName ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
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
    <BaseNode title="Image" titleColor="#34d399" indicatorColor="#059669">
      <div style={{ minWidth: 220, width: "100%" }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {preview ? (
          // ── Preview State ──────────────────────────────────────────
          <div
            style={{
              position: "relative",
              borderRadius: 8,
              overflow: "hidden",
            }}
            onMouseEnter={() => setIsHoveringPreview(true)}
            onMouseLeave={() => setIsHoveringPreview(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt=""
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "cover",
                display: "block",
                borderRadius: 8,
                border: "1px solid #1f1f1f",
                transition: "filter 0.25s ease",
                filter: isHoveringPreview
                  ? "brightness(0.45)"
                  : "brightness(1)",
              }}
            />

            {/* Hover overlay actions */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: isHoveringPreview ? 1 : 0,
                transition: "opacity 0.25s ease",
                pointerEvents: isHoveringPreview ? "all" : "none",
              }}
            >
              {/* Replace button */}
              <button
                onClick={() => inputRef.current?.click()}
                style={{
                  background: "#0e0e0f",
                  border: "1px solid #34d39955",
                  color: "#34d399",
                  fontSize: 10.5,
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "5px 14px",
                  borderRadius: 5,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#34d39915")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0e0e0f")
                }
              >
                Replace
              </button>

              {/* Remove button */}
              <button
                onClick={handleRemove}
                style={{
                  background: "#0e0e0f",
                  border: "1px solid #ef444455",
                  color: "#ef4444",
                  fontSize: 10.5,
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "5px 14px",
                  borderRadius: 5,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ef444415")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0e0e0f")
                }
              >
                Remove
              </button>
            </div>

            {/* Filename badge */}
            {fileName && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "4px 8px",
                  background: "linear-gradient(to top, #000000cc, transparent)",
                  fontSize: 9.5,
                  color: "#6b7280",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  pointerEvents: "none",
                }}
              >
                {fileName}
              </div>
            )}
          </div>
        ) : (
          // ── Upload / Drop Zone ─────────────────────────────────────
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              position: "relative",
              borderRadius: 8,
              border: `1.5px dashed ${isDragging ? "#34d399" : "#2a2a2a"}`,
              background: isDragging ? "#34d39908" : "#0c0c0d",
              padding: "28px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
          >
            {/* Upload icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDragging ? "#34d399" : "#2e2e2e"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.2s" }}
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>

            <div
              style={{
                textAlign: "center",
                fontFamily: "monospace",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: isDragging ? "#34d399" : "#4a4a4a",
                  margin: 0,
                  transition: "color 0.2s",
                  letterSpacing: "0.04em",
                }}
              >
                {isDragging ? "Drop it!" : "Click or drag to upload"}
              </p>
              <p
                style={{
                  fontSize: 9.5,
                  color: "#2e2e2e",
                  margin: "3px 0 0",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                PNG · JPG · GIF · WEBP
              </p>
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
