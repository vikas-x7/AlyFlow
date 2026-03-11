"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import type { Workflow } from "@/modules/dashboard/types";
import { Loader } from "../ui/Loader";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { BsConeStriped, BsEjectFill } from "react-icons/bs";

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

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
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

  const [inlineTitle, setInlineTitle] = useState<string | null>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(
    null,
  );
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { logout, user } = useAuth();
  const avatarUrl = (user as any)?.avatar || (user as any)?.image || null;
  const initials = (() => {
    const name = user?.name?.trim();
    if (name)
      return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    const email = user?.email?.trim();
    if (email) return email[0].toUpperCase();
    return "U";
  })();

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
      className={`h-screen flex flex-col transition-all duration-300 border-r bg-[#0D0D0D] border-[#1f1f1f] font-gothic overflow-hidden ${
        isOpen ? "w-56" : "w-0 border-r-0"
      }`}
    >
      <div className="mb-4 flex items-center justify-between px-3 py-2  border-b border-[#1f1f1f]">
        <div className="text-[17px] font-semibold text-[#D9D9D9] flex items-center gap-2">
          <BsEjectFill className="bg-[#D9D9D9] text-[#0D0D0D] text-[17px] p-px rounded-xs" />
          Alyflow
        </div>
      </div>

      <div className="mb-3 px-3">
        <button
          type="button"
          className="text-black cursor-pointer rounded-xs hover:text-black/80 transition-colors bg-[#D9D9D9] w-full py-0.5 flex items-center justify-center gap-2 "
          onClick={handleStartCreate}
          disabled={isCreating}
        >
          create new
          <FaRegPenToSquare size={13} />
        </button>
      </div>

      {/* Inline create input */}
      {inlineTitle !== null && (
        <div className="px-3">
          <div className=" rounded  bg-[#1a1a1a] px-2 py-1 ">
            <input
              ref={inlineInputRef}
              value={inlineTitle}
              onChange={(e) => setInlineTitle(e.target.value)}
              onBlur={handleInlineSubmit}
              onKeyDown={handleInlineKeyDown}
              className="w-full  text-xs text-white outline-none placeholder:text-white/30  "
              placeholder="Untitled"
            />
          </div>
        </div>
      )}

      {/* Workflow list */}
      <div className="flex-1 overflow-hidden p-3 ">
        {error ? (
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
                  className={`group rounded-xs px-2 py-1.5 transition-colors relative flex items-center justify-between gap-2 ${
                    isActive ? " bg-[#191919]" : "hover:bg-[#191919]"
                  }`}
                >
                  {isEditing ? (
                    <input
                      ref={editInputRef}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleEditSubmit(workflow)}
                      onKeyDown={(e) => handleEditKeyDown(e, workflow)}
                      className="w-full bg-transparent text-xs text-white outline-none  py-0.5"
                    />
                  ) : (
                    <>
                      <Link
                        href={`/canvas/${workflow.id}`}
                        className="flex-1 min-w-0"
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          handleDoubleClick(workflow);
                        }}
                      >
                        <div
                          className={`truncate text-xs font-medium select-none ${
                            isActive
                              ? "text-white"
                              : "text-white/60 group-hover:text-white/80"
                          }`}
                        >
                          {workflow.name}
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setWorkflowToDelete(workflow);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-400/50 hover:text-red-400 transition-all p-1 -mr-1 rounded hover:bg-red-400/10"
                        title="Delete workflow"
                      >
                        <FaRegTrashCan size={11} />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      <div className="mt-4 pt-3 flex items-center gap-2 p-3">
        <div className="w-7 h-7  rounded-xs overflow-hidden shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#2e2e2e] flex items-center justify-center text-white/90 text-xs font-semibold">
              {initials}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-white/80">
            {user?.name ?? "Username"}
          </div>
          <div className="truncate text-xs text-white/40">
            {user?.email ?? "user@email.com"}
          </div>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <IoIosLogOut size={17} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {workflowToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 w-80 shadow-xl font-gothic text-left">
            <h3 className="text-white font-medium text-base mb-2">
              Delete Workflow
            </h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white/80">
                "{workflowToDelete.name}"
              </span>
              ? This action cannot be undone.
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
                  const wasActive = id === activeWorkflowId;
                  setWorkflowToDelete(null);
                  await deleteWorkflow(id);
                  if (wasActive) {
                    const remaining = workflows.filter((w) => w.id !== id);
                    if (remaining.length > 0) {
                      router.replace(`/canvas/${remaining[0].id}`);
                    } else {
                      router.replace("/canvas");
                    }
                  }
                }}
                className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer px-4 py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 w-80 shadow-xl font-gothic text-left">
            <h3 className="text-white font-medium text-base mb-2">
              Confirm Logout
            </h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Are you sure you want to log out? You will need to sign in again
              to access your canvases.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowLogoutConfirm(false);
                  try {
                    await logout();
                  } catch (e) {
                    // ignore
                  }
                  router.replace("/");
                }}
                className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer px-4 py-1.5 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
