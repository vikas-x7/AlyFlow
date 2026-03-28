import { memo } from 'react';
import type { NodeProps } from 'reactflow';

export const DrawingNode = memo(({ data }: NodeProps) => {
  const { points, color, strokeWidth } = data;
  const pointsStr = points?.map((p: { x: number; y: number }) => `${p.x},${p.y}`).join(' ');

  return (
    <div style={{ pointerEvents: 'none', position: 'relative' }}>
      <svg style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
        <polyline points={pointsStr} fill="none" stroke={color || '#e05555'} strokeWidth={strokeWidth || 3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});

DrawingNode.displayName = 'DrawingNode';
