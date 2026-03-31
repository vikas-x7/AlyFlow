import { useCallback, useEffect, useRef, useState } from 'react';
import type { Edge, Node } from 'reactflow';
import { canvasService } from '../services/canvas.service';
import { stripTransientEdge, stripTransientNode, useCanvasStore } from '../store/canvas.store';

const AUTOSAVE_DEBOUNCE_MS = 2000;
const AUTOSAVE_MAX_RETRY_DELAY_MS = 15000;

type PendingAutosavePayload = {
  dirtyNodes: Node[];
  removedNodeIds: string[];
  edges?: Edge[];
};

function getPendingAutosavePayload(): PendingAutosavePayload | null {
  const state = useCanvasStore.getState();
  const dirtyNodes = state.nodes.filter((node) => node.isDirty);
  const removedNodeIds = [...state.removedNodeIds];
  const edges = state.isEdgesDirty ? state.edges.map((edge) => stripTransientEdge(edge)) : undefined;

  if (dirtyNodes.length === 0 && removedNodeIds.length === 0 && !edges) {
    return null;
  }

  return {
    dirtyNodes: dirtyNodes.map((node) => stripTransientNode(node)),
    removedNodeIds,
    edges,
  };
}

export function useAutoSave({ workflowId, enabled, ready }: { workflowId: string; enabled: boolean; ready: boolean }) {
  const lastMutationAt = useCanvasStore((s) => s.lastMutationAt);
  const markSaved = useCanvasStore((s) => s.markSaved);

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isSavingRef = useRef(false);
  const queuedWhileSavingRef = useRef(false);
  const retryAttemptRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUnmountedRef = useRef(false);

  const flushPendingChanges = useCallback(async () => {
    if (!workflowId || !enabled || !ready || isUnmountedRef.current) return;

    if (isSavingRef.current) {
      queuedWhileSavingRef.current = true;
      return;
    }

    const payload = getPendingAutosavePayload();
    if (!payload) {
      setError(null);
      return;
    }

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    isSavingRef.current = true;
    setIsSaving(true);
    setError(null);

    try {
      const res = await canvasService.save(workflowId, {
        dirtyNodes: payload.dirtyNodes,
        removedNodeIds: payload.removedNodeIds,
        edges: payload.edges,
      });

      markSaved({
        savedNodes: payload.dirtyNodes,
        removedNodeIds: payload.removedNodeIds,
        savedEdges: payload.edges,
      });

      const ts = res.data?.updatedAt ? new Date(res.data.updatedAt) : new Date();
      setLastSavedAt(ts);
      retryAttemptRef.current = 0;
    } catch (e: any) {
      setError(typeof e?.response?.data?.error === 'string' ? e.response.data.error : 'Autosave failed');

      const attempt = retryAttemptRef.current + 1;
      retryAttemptRef.current = attempt;
      const delay = Math.min(AUTOSAVE_DEBOUNCE_MS * 2 ** (attempt - 1), AUTOSAVE_MAX_RETRY_DELAY_MS);

      retryTimerRef.current = setTimeout(() => {
        void flushPendingChanges();
      }, delay);
    } finally {
      if (isUnmountedRef.current) return;

      isSavingRef.current = false;
      setIsSaving(false);

      if (queuedWhileSavingRef.current) {
        queuedWhileSavingRef.current = false;

        const mutationAt = useCanvasStore.getState().lastMutationAt;
        const elapsed = mutationAt > 0 ? Date.now() - mutationAt : AUTOSAVE_DEBOUNCE_MS;
        const delay = Math.max(0, AUTOSAVE_DEBOUNCE_MS - elapsed);

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          void flushPendingChanges();
        }, delay);
      }
    }
  }, [enabled, ready, workflowId, markSaved]);

  useEffect(() => {
    if (!workflowId || !enabled || !ready || lastMutationAt <= 0) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      void flushPendingChanges();
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [workflowId, enabled, ready, lastMutationAt, flushPendingChanges]);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Try to flush pending changes when the user closes or navigates away.
  useEffect(() => {
    if (!workflowId || !enabled || !ready) return;

    const sendKeepalive = () => {
      // Skip if an autosave is already in-flight — it will handle
      // the pending changes and avoids two concurrent POSTs that
      // can overwrite each other on the server.
      if (isSavingRef.current) return;

      try {
        const payload = getPendingAutosavePayload();
        if (!payload) return;

        void fetch(`/api/canvas/${workflowId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dirtyNodes: payload.dirtyNodes,
            removedNodeIds: payload.removedNodeIds,
            edges: payload.edges,
          }),
          keepalive: true,
        }).catch(() => {
          // ignore
        });
      } catch (err) {
        // ignore
      }
    };

    const onBeforeUnload = () => sendKeepalive();
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendKeepalive();
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [workflowId, enabled, ready]);

  return { isSaving, lastSavedAt, error };
}
