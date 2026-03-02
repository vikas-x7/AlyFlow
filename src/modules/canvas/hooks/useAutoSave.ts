import { useEffect, useRef, useState } from "react";
import type { Edge, Node } from "reactflow";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { canvasService } from "../services/canvas.service";

export function useAutoSave({
  workflowId,
  nodes,
  edges,
  enabled,
  ready,
}: {
  workflowId: string;
  nodes: Node[];
  edges: Edge[];
  enabled: boolean;
  ready: boolean;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const first = useRef(true);

  const payload = useDebounce({ nodes, edges }, 800);

  useEffect(() => {
    if (!enabled || !ready) return;
    if (first.current) {
      first.current = false;
      return;
    }

    setIsSaving(true);
    setError(null);
    canvasService
      .save(workflowId, payload)
      .then((res) => {
        const ts = res.data?.updatedAt ? new Date(res.data.updatedAt) : new Date();
        setLastSavedAt(ts);
      })
      .catch((e: any) => {
        setError(typeof e?.response?.data?.error === "string" ? e.response.data.error : "Autosave failed");
      })
      .finally(() => setIsSaving(false));
  }, [enabled, ready, workflowId, payload]);

  return { isSaving, lastSavedAt, error };
}

