import { MiniMap as ReactFlowMiniMap } from "reactflow";

export function MiniMap() {
  return (
    <div className="border rounded overflow-hidden bg-white shadow-sm">
      <ReactFlowMiniMap pannable zoomable />
    </div>
  );
}

