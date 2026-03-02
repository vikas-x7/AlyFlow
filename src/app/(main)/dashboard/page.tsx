"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Loader } from "@/shared/components/ui/Loader";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import { WorkflowGrid } from "@/modules/dashboard/components/WorkflowGrid";
import { CreateWorkflowModal } from "@/modules/dashboard/components/CreateWorkflowModal";

export default function DashboardPage() {
  const router = useRouter();
  const { workflows, isLoading, createWorkflow, isCreating } = useWorkflows();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button onClick={() => setOpen(true)}>New workflow</Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : workflows.length === 0 ? (
        <div className="rounded border p-6 text-sm text-gray-600">
          No workflows yet. Create your first one.
        </div>
      ) : (
        <WorkflowGrid workflows={workflows} />
      )}

      <CreateWorkflowModal
        open={open}
        onClose={() => setOpen(false)}
        isCreating={isCreating}
        onCreate={async (input) => {
          const w = await createWorkflow(input);
          router.push(`/canvas/${w.id}`);
        }}
      />
    </div>
  );
}

