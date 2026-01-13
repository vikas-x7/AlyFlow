"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import type { Workflow } from "@/modules/dashboard/types";
import { Loader } from "../ui/Loader";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

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
  } = useWorkflows();

  const [isOpen, setIsOpen] = useState(true);

  const [inlineTitle, setInlineTitle] = useState<string | null>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const activeWorkflowId = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts[1] === "canvas" ? (pathParts[2] ?? null) : null;
  }, [pathname]);

  useEffect(() => {
    if (inlineTitle !== null)
      setTimeout(() => inlineInputRef.current?.focus(), 50);
  }, [inlineTitle]);

  useEffect(() => {
    if (editingId !== null) setTimeout(() => editInputRef.current?.focus(), 50);
  }, [editingId]);

  // ✅ Fixed: mousedown + data-menu to avoid conflict
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-menu]")) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

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

  function handleStartEdit(workflow: Workflow) {
    setMenuOpenId(null);
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
      className={`h-screen flex flex-col transition-all duration-300 border-r bg-[#0D0D0D] border-[#1f1f1f] font-gothic ${
        isOpen ? "w-64 p-4" : "w-16 p-2"
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        {isOpen && (
          <div className="text-sm font-semibold text-white/80">Aly flow</div>
        )}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white/70 hover:text-white transition-colors "
        >
          {isOpen ? <IoClose size={20} /> : <HiBars3 size={20} />}
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

      {/* Workflow list — flex-1 so it fills space */}
      <div className="flex-1 overflow-hidden">
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
              const isMenuOpen = menuOpenId === workflow.id;

              return (
                <div
                  key={workflow.id}
                  className={`group rounded border px-2 py-1.5 transition-colors relative ${
                    isActive
                      ? "border-[#2e2e2e] bg-[#1f1f1f]"
                      : "border-transparent hover:border-[#2e2e2e] hover:bg-[#161616]"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {isEditing ? (
                      <input
                        ref={editInputRef}
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={() => handleEditSubmit(workflow)}
                        onKeyDown={(e) => handleEditKeyDown(e, workflow)}
                        className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none border-b border-[#3a3a3a]"
                      />
                    ) : (
                      <Link
                        href={`/canvas/${workflow.id}`}
                        className="min-w-0 flex-1"
                      >
                        <div
                          className={`truncate text-xs font-medium ${
                            isActive ? "text-white" : "text-white/60"
                          }`}
                        >
                          {workflow.name}
                        </div>
                      </Link>
                    )}

                    {!isEditing && (
                      <button
                        data-menu
                        type="button"
                        className="shrink-0 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white transition-all"
                        onClick={() =>
                          setMenuOpenId(isMenuOpen ? null : workflow.id)
                        }
                      >
                        <HiOutlineDotsHorizontal size={14} />
                      </button>
                    )}
                  </div>

                  {/* Dropdown */}
                  {isMenuOpen && (
                    <div
                      data-menu
                      className="absolute left-full top-0 ml-1 z-50 rounded border border-[#2e2e2e] bg-[#1a1a1a] shadow-lg overflow-hidden"
                    >
                      <button
                        data-menu
                        type="button"
                        className="w-full px-4 py-2 text-left text-xs text-white/70 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                        onClick={() => handleStartEdit(workflow)}
                      >
                        Rename
                      </button>
                    </div>
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
    </aside>
  );
}
