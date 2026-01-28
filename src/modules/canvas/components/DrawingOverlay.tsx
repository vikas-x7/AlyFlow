"use client";

import { useRef, useState, useCallback } from "react";
import type { ReactFlowInstance } from "reactflow";

interface DrawingOverlayProps {
  active: boolean;
  rfInstance: ReactFlowInstance | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  color?: string;
  strokeWidth?: number;
  onDrawingComplete: (
    points: { x: number; y: number }[],
    color: string,
    strokeWidth: number,
  ) => void;
}

export function DrawingOverlay({
  active,
  rfInstance,
  containerRef,
  color = "#e05555",
  strokeWidth = 3,
  onDrawingComplete,
}: DrawingOverlayProps) {
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const [displayPoints, setDisplayPoints] = useState<
    { x: number; y: number }[]
  >([]);

  const getPos = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [containerRef],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!active) return;
      e.preventDefault();
      e.stopPropagation();
      isDrawingRef.current = true;
      pointsRef.current = [];
      const pos = getPos(e);
      pointsRef.current.push(pos);
      setDisplayPoints([pos]);
    },
    [active, getPos],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawingRef.current || !active) return;
      const pos = getPos(e);
      pointsRef.current.push(pos);
      setDisplayPoints((prev) => [...prev, pos]);
    },
    [active, getPos],
  );

  const finalize = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (!rfInstance || !active) {
      pointsRef.current = [];
      setDisplayPoints([]);
      return;
    }

    const pts = [...pointsRef.current];
    pointsRef.current = [];
    setDisplayPoints([]);

    if (pts.length < 2) return;

    // Convert viewport coords → flow coords
    const flowPoints = pts.map((p) => rfInstance.project(p));
    onDrawingComplete(flowPoints, color, strokeWidth);
  }, [active, rfInstance, color, strokeWidth, onDrawingComplete]);

  if (!active) return null;

  const pointsStr = displayPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        cursor: "crosshair",
        touchAction: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={finalize}
      onMouseLeave={finalize}
    >
      {displayPoints.length > 1 && (
        <polyline
          points={pointsStr}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
