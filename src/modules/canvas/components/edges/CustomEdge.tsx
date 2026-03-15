import type { EdgeProps } from "reactflow";
import {
  BaseEdge,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
} from "reactflow";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps) {
  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const [path] =
    data?.edgeType === "straight"
      ? getStraightPath(pathParams)
      : data?.edgeType === "step" || data?.edgeType === "smoothstep"
        ? getSmoothStepPath({
            ...pathParams,
            borderRadius: data?.edgeType === "smoothstep" ? 10 : 0,
          })
        : getBezierPath(pathParams);

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={{
        stroke: "#E3DBBB",
        strokeWidth: data?.strokeWidth ?? 1.5,
        strokeDasharray: data?.edgeType === "animated" ? "6 3" : undefined,
      }}
      interactionWidth={50}
    />
  );
}
