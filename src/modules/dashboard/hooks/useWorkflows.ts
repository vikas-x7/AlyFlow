import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workflowService } from '../services/workflow.service';
import type { Workflow } from '../types';

export function useWorkflows() {
  const qc = useQueryClient();

  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
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
    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: ['workflows'] });

      const previous = qc.getQueryData<Workflow[]>(['workflows']);

      const optimistic: Workflow = {
        id: `temp-${Date.now()}`,
        name: input.name,
        description: input.description ?? '',
      };

      qc.setQueryData<Workflow[]>(['workflows'], (old) => [optimistic, ...(old ?? [])]);

      return { previous };
    },
    onError: (_err, _input, context) => {
      if (context?.previous) {
        qc.setQueryData(['workflows'], context.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, input }: { id: string; input: { name: string; description?: string } }) => {
      const res = await workflowService.update(id, input);
      return res.data.workflow as Workflow;
    },
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: ['workflows'] });
      const previous = qc.getQueryData<Workflow[]>(['workflows']);

      qc.setQueryData<Workflow[]>(['workflows'], (old) => {
        if (!old) return [];
        return old.map((workflow) => (workflow.id === id ? { ...workflow, name: input.name, description: input.description ?? workflow.description } : workflow));
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        qc.setQueryData(['workflows'], context.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await workflowService.remove(id);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  return {
    workflows: workflowsQuery.data ?? [],
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error,
    refetch: workflowsQuery.refetch,
    createWorkflow: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateWorkflow: (id: string, input: { name: string; description?: string }) => updateMutation.mutateAsync({ id, input }),
    isUpdating: updateMutation.isPending,
    deleteWorkflow: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
