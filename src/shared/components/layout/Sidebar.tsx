"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import { WorkflowModal } from "@/modules/dashboard/components/WorkflowModal";
import type { Workflow } from "@/modules/dashboard/types";
import { Loader } from "../ui/Loader";
import { FaRegPenToSquare } from "react-icons/fa6";

function getErrorMessage(err: unknown) {
  const maybeError = err as { response?: { data?: { error?: unknown } } };
  if (typeof maybeError?.response?.data?.error === "string")
    return maybeError.response.data.error;
  return "Failed to load workflows";
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    workflows,
    isLoading,
    error,
    createWorkflow,
    isCreating,
    updateWorkflow,
    isUpdating,
  } = useWorkflows();

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Workflow | null>(null);

  const activeWorkflowId = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts[1] === "canvas" ? (pathParts[2] ?? null) : null;
  }, [pathname]);

  return (
    <>
      <aside className="w-61 border-r p-4 bg-[#0D0D0D]">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-white/80">Aly flow</div>
          <button
            type="button"
            className="rounded px-2 py-1 text-xs font-medium text-white/80"
            onClick={() => setCreateOpen(true)}
          >
            <FaRegPenToSquare size={18} />
          </button>
        </div>

        {error ? (
          <div className="mb-3 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">
            {getErrorMessage(error)}
          </div>
        ) : null}

        {isLoading ? (
          <Loader />
        ) : workflows.length === 0 ? (
          <div className="rounded border p-3 text-xs text-gray-600">
            No workflows yet. Create your first one.
          </div>
        ) : (
          <nav className="space-y-2">
            {workflows.map((workflow) => {
              const isActive = workflow.id === activeWorkflowId;
              return (
                <div
                  key={workflow.id}
                  className={`rounded border p-2 ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Link
                      href={`/canvas/${workflow.id}`}
                      className="min-w-0 flex-1"
                    >
                      <div className="truncate text-sm font-medium">
                        {workflow.name}
                      </div>
                      <div
                        className={`truncate text-xs ${isActive ? "text-gray-200" : "text-gray-500"}`}
                      >
                        {workflow.description?.trim()
                          ? workflow.description
                          : "No description"}
                      </div>
                    </Link>
                    <button
                      type="button"
                      className={`shrink-0 rounded px-2 py-1 text-xs ${
                        isActive
                          ? "bg-white text-black"
                          : "border hover:bg-gray-100"
                      }`}
                      onClick={() => setEditing(workflow)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </nav>
        )}
      </aside>

      <WorkflowModal
        open={createOpen}
        title="Create workflow"
        submitLabel="Create"
        isSubmitting={isCreating}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (input) => {
          const workflow = await createWorkflow(input);
          router.push(`/canvas/${workflow.id}`);
        }}
      />

      <WorkflowModal
        open={!!editing}
        title="Edit workflow"
        submitLabel="Save"
        isSubmitting={isUpdating}
        initialValue={
          editing
            ? {
                name: editing.name,
                description: editing.description,
              }
            : undefined
        }
        onClose={() => setEditing(null)}
        onSubmit={async (input) => {
          if (!editing) return;
          const workflow = await updateWorkflow(editing.id, input);
          router.push(`/canvas/${workflow.id}`);
        }}
      />
    </>
  );
}
