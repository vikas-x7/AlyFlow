import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workflowService } from "../services/workflow.service";
import type { Workflow } from "../types";

export function useWorkflows() {
  const qc = useQueryClient();

  const workflowsQuery = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const res = await workflowService.list();
      return (res.data?.workflows ?? []) as Workflow[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (input: { name: string; description?: string }) => {
      const res = await workflowService.create(input);
      return res.data.workflow as Workflow;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: { name: string; description?: string };
    }) => {
      const res = await workflowService.update(id, input);
      return res.data.workflow as Workflow;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });

  return {
    workflows: workflowsQuery.data ?? [],
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error,
    refetch: workflowsQuery.refetch,
    createWorkflow: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateWorkflow: (id: string, input: { name: string; description?: string }) =>
      updateMutation.mutateAsync({ id, input }),
    isUpdating: updateMutation.isPending,
  };
}
