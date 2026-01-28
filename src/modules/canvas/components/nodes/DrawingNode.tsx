import type { NodeProps } from "reactflow";

export interface DrawingData {
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
  width: number;
  height: number;
}

export function DrawingNode({ data, selected }: NodeProps<DrawingData>) {
  const {
    points,
    color = "#e05555",
    strokeWidth = 3,
    width = 10,
    height = 10,
  } = data;

  if (!points || points.length < 2) {
    return <div style={{ width: 10, height: 10 }} />;
  }

  const padding = strokeWidth + 6;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <div
      style={{
        width: width + padding * 2,
        height: height + padding * 2,
        position: "relative",
        outline: selected ? "1px dashed rgba(255,255,255,0.25)" : "none",
        borderRadius: 4,
        cursor: "move",
      }}
    >
      <svg
        width={width + padding * 2}
        height={height + padding * 2}
        style={{ display: "block", overflow: "visible" }}
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${padding}, ${padding})`}
        />
      </svg>
    </div>
  );
}
