"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import type { Workflow } from "@/modules/dashboard/types";
import { Loader } from "../ui/Loader";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { BsLayoutSidebar } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

function getErrorMessage(err: unknown) {
  const maybeError = err as { response?: { data?: { error?: unknown } } };
  if (typeof maybeError?.response?.data?.error === "string")
    return maybeError.response.data.error;
  return "Failed to load workflows";
}

function getAutoTitle(workflows: Workflow[]): string {
  const base = "Untitled";
  const existing = workflows.map((w) => w.name?.trim());
  if (!existing.includes(base)) return base;
  let i = 1;
  while (existing.includes(`${base} ${i}`)) i++;
  return `${base} ${i}`;
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
    deleteWorkflow,
  } = useWorkflows();

  const [isOpen, setIsOpen] = useState(true);

  const [inlineTitle, setInlineTitle] = useState<string | null>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);

  const activeWorkflowId = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts[1] === "canvas" ? (pathParts[2] ?? null) : null;
  }, [pathname]);

  useEffect(() => {
    if (inlineTitle !== null)
      setTimeout(() => inlineInputRef.current?.focus(), 50);
  }, [inlineTitle]);

  useEffect(() => {
    if (editingId !== null)
      setTimeout(() => {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }, 50);
  }, [editingId]);

  function handleStartCreate() {
    setInlineTitle(getAutoTitle(workflows));
  }

  async function handleInlineSubmit() {
    const finalTitle = inlineTitle?.trim() || getAutoTitle(workflows);
    setInlineTitle(null);
    const workflow = await createWorkflow({
      name: finalTitle,
      description: "",
    });
    router.push(`/canvas/${workflow.id}`);
  }

  function handleInlineKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleInlineSubmit();
    if (e.key === "Escape") setInlineTitle(null);
  }

  function handleDoubleClick(workflow: Workflow) {
    setEditingId(workflow.id);
    setEditingTitle(workflow.name);
  }

  async function handleEditSubmit(workflow: Workflow) {
    const finalTitle = editingTitle.trim() || workflow.name;
    setEditingId(null);
    await updateWorkflow(workflow.id, {
      name: finalTitle,
      description: workflow.description,
    });
  }

  function handleEditKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    workflow: Workflow,
  ) {
    if (e.key === "Enter") handleEditSubmit(workflow);
    if (e.key === "Escape") setEditingId(null);
  }

  return (
    <aside
      className={`h-screen flex flex-col transition-all duration-300 border-r bg-[#0D0D0D] border-[#1f1f1f] font-gothic ${isOpen ? "w-64 p-4" : "w-12 p-3"
        }`}
    >
      <div className="mb-4 flex items-center justify-between">
        {isOpen && (
          <div className="text-sm font-semibold text-white/80">Alyflow</div>
        )}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white/70 hover:text-white transition-colors cursor-po"
        >
          {isOpen ? (
            <BsLayoutSidebar size={14} />
          ) : (
            <BsLayoutSidebar size={14} />
          )}
        </button>
      </div>

      {/* Create button */}
      {isOpen && (
        <div className="mb-3">
          <button
            type="button"
            className="text-black cursor-pointer rounded-sm hover:text-black/80 transition-colors bg-white/70 w-full py-1 flex items-center justify-center gap-2"
            onClick={handleStartCreate}
            disabled={isCreating}
          >
            create new
            <FaRegPenToSquare size={13} />
          </button>
        </div>
      )}

      {/* Inline create input */}
      {isOpen && inlineTitle !== null && (
        <div className="mb-2 rounded border border-[#3a3a3a] bg-[#1a1a1a] px-2 py-1">
          <input
            ref={inlineInputRef}
            value={inlineTitle}
            onChange={(e) => setInlineTitle(e.target.value)}
            onBlur={handleInlineSubmit}
            onKeyDown={handleInlineKeyDown}
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
            placeholder="Untitled"
          />
        </div>
      )}

      {/* Workflow list */}
      <div className="flex-1 overflow-hidden ">
        {!isOpen ? null : error ? (
          <div className="mb-3 rounded border border-red-900 bg-red-950 px-2 py-1 text-xs text-red-400">
            {getErrorMessage(error)}
          </div>
        ) : isLoading ? (
          <Loader />
        ) : workflows.length === 0 && inlineTitle === null ? (
          <div className="rounded border border-[#2a2a2a] p-3 text-xs text-white/30">
            No workflows yet.
          </div>
        ) : (
          <nav className="space-y-1 overflow-y-auto h-full">
            {workflows.map((workflow) => {
              const isActive = workflow.id === activeWorkflowId;
              const isEditing = editingId === workflow.id;

              return (
                <div
                  key={workflow.id}
                  className={`group rounded border px-2 py-1.5 transition-colors relative flex items-center justify-between gap-2 ${isActive
                    ? "border-[#2e2e2e] bg-[#1f1f1f]"
                    : "border-transparent hover:border-[#2e2e2e] hover:bg-[#161616]"
                    }`}
                >
                  {isEditing ? (
                    // Inline edit input on double click
                    <input
                      ref={editInputRef}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleEditSubmit(workflow)}
                      onKeyDown={(e) => handleEditKeyDown(e, workflow)}
                      className="w-full bg-transparent text-xs text-white outline-none border-b border-[#3a3a3a] py-0.5"
                    />
                  ) : (
                    <>
                      {/* Single click = navigate, Double click = edit */}
                      <Link
                        href={`/canvas/${workflow.id}`}
                        className="flex-1 min-w-0"
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          handleDoubleClick(workflow);
                        }}
                      >
                        <div
                          className={`truncate text-xs font-medium select-none ${isActive ? "text-white" : "text-white/60 group-hover:text-white/80"
                            }`}
                        >
                          {workflow.name}
                        </div>
                      </Link>

                      {/* Delete button (shows on hover) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setWorkflowToDelete(workflow);
                        }}
                        className={`text-red-400/0 hover:!text-red-400 transition-colors p-1 -mr-1 rounded hover:bg-red-400/10 group-hover:text-red-400/50 ${isActive ? "text-red-400/50" : ""
                          }`}
                        title="Delete workflow"
                      >
                        <FaRegTrashCan size={12} />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Bottom user section */}
      {isOpen && (
        <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2e2e2e] flex items-center justify-center text-white/60 text-xs font-semibold shrink-0">
            U
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-white/80">
              Username
            </div>
            <div className="truncate text-xs text-white/40">user@email.com</div>
          </div>
        </div>
      )}

      {/* Collapsed — just avatar */}
      {!isOpen && (
        <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex justify-center">
          <div className="w-7 h-7 rounded-full bg-[#2e2e2e] flex items-center justify-center text-white/60 text-xs font-semibold">
            U
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {workflowToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 w-80 shadow-xl font-gothic text-left">
            <h3 className="text-white font-medium text-base mb-2">Delete Workflow</h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-white/80">"{workflowToDelete.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setWorkflowToDelete(null)}
                className="text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const id = workflowToDelete.id;
                  setWorkflowToDelete(null);
                  await deleteWorkflow(id);
                }}
                className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer px-4 py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
