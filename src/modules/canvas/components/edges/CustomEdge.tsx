import type { EdgeProps, Connection } from "reactflow";
import {
  BaseEdge,
  getBezierPath,
  useReactFlow,
  reconnectEdge,
} from "reactflow";
import { useRef } from "react";

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
  const { setEdges } = useReactFlow();
  const edgeReconnectSuccessful = useRef(true);

  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={{ stroke: "#ec4899", strokeWidth: 2 }}
      interactionWidth={20}
    />
  );
}
