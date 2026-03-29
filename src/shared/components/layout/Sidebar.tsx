'use client';

import Link from 'next/link';
import { useMemo, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useWorkflows } from '@/modules/dashboard/hooks/useWorkflows';
import type { Workflow } from '@/modules/dashboard/types';
import { Loader } from '../ui/Loader';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import { BsConeStriped, BsEjectFill } from 'react-icons/bs';
import { GiCrownedExplosion } from 'react-icons/gi';
import { LuUpload, LuDownload, LuImage, LuFileJson } from 'react-icons/lu';
import { useCanvasStore } from '@/modules/canvas/store/canvas.store';
import { toPng } from 'html-to-image';
import { useTheme } from 'next-themes';
import { getNodesBounds, getViewportForBounds } from 'reactflow';
import { SidebarLoader } from '../ui/SidebarLoader';

function getErrorMessage(err: unknown) {
  const maybeError = err as { response?: { data?: { error?: unknown } } };
  if (typeof maybeError?.response?.data?.error === 'string') return maybeError.response.data.error;
  return 'Failed to load workflows';
}

function getAutoTitle(workflows: Workflow[]): string {
  const base = 'Untitled';
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

  const { workflows, isLoading, error, createWorkflow, isCreating, updateWorkflow, deleteWorkflow } = useWorkflows();

  const [inlineTitle, setInlineTitle] = useState<string | null>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const { nodes: canvasNodes, edges: canvasEdges, setCanvasSnapshot, setNodes, setEdges } = useCanvasStore();

  const { logout, user } = useAuth();
  const avatarUrl = (user as any)?.avatar || (user as any)?.image || null;
  const initials = (() => {
    const name = user?.name?.trim();
    if (name)
      return name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    const email = user?.email?.trim();
    if (email) return email[0].toUpperCase();
    return 'U';
  })();

  const activeWorkflowId = useMemo(() => {
    const pathParts = pathname.split('/');
    return pathParts[1] === 'canvas' ? (pathParts[2] ?? null) : null;
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (inlineTitle !== null) setTimeout(() => inlineInputRef.current?.focus(), 50);
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
      description: '',
    });
    router.push(`/canvas/${workflow.id}`);
  }

  function handleInlineKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleInlineSubmit();
    if (e.key === 'Escape') setInlineTitle(null);
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

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>, workflow: Workflow) {
    if (e.key === 'Enter') handleEditSubmit(workflow);
    if (e.key === 'Escape') setEditingId(null);
  }

  const handleExportJson = () => {
    setShowExportMenu(false);
    if (!activeWorkflowId) {
      alert('Please open a canvas to export.');
      return;
    }
    const dataStr = JSON.stringify({ nodes: canvasNodes, edges: canvasEdges }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `workflow-${activeWorkflowId}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExportPng = () => {
    setShowExportMenu(false);
    if (!activeWorkflowId) {
      alert('Please open a canvas to export.');
      return;
    }

    if (canvasNodes.length === 0) {
      alert('Canvas is empty.');
      return;
    }

    const reactFlowViewport = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!reactFlowViewport) {
      alert('Canvas element not found on the page.');
      return;
    }

    const imageWidth = 1920;
    const imageHeight = 1080;

    const nodesBounds = getNodesBounds(canvasNodes);

    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2.0, 0.1);

    const bgColor = resolvedTheme === 'dark' ? '#000000' : '#ffffff';

    toPng(reactFlowViewport, {
      backgroundColor: bgColor,
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
      filter: (node) => {
        if (node.classList?.contains('react-flow__minimap') || node.classList?.contains('react-flow__controls')) {
          return false;
        }
        return true;
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `workflow-${activeWorkflowId}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to export PNG', err);
        alert('Failed to export PNG. Please try again.');
      });
  };

  const handleImportClick = () => {
    if (!activeWorkflowId) {
      alert('Please open a canvas to import into.');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      alert('Only JSON files are supported for import.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
          alert("Invalid file format. Ensure it contains 'nodes' and 'edges' arrays from React Flow.");
          return;
        }

        const newNodes = parsed.nodes.map((n: any) => ({ ...n, isDirty: true }));
        const newEdges = parsed.edges;

        setCanvasSnapshot({ nodes: newNodes, edges: newEdges });
        setNodes(newNodes, { markDirty: true });
        setEdges(newEdges, { markDirty: true });
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <aside className={`h-screen flex flex-col transition-all duration-300 border-r bg-panel border-border font-gothic overflow-hidden ${isOpen ? 'w-64' : 'w-0 border-r-0'}`}>
      <div className="mb-4 flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="text-[17px] font-semibold text-foreground flex items-center gap-2">
          <img src="/images/alylogo.jpg" alt="" className="w-5 absolute  " />
          <span className="ml-7">Alyflow</span>
        </div>
      </div>

      <div className="mb-3 px-3">
        <button
          type="button"
          className="text-background cursor-pointer rounded-xs hover:text-background/80 transition-colors bg-foreground w-full py-0.5 flex items-center justify-center gap-2 "
          onClick={handleStartCreate}
          disabled={isCreating}
        >
          Create new
          <FaRegPenToSquare size={13} />
        </button>
      </div>

      {inlineTitle !== null && (
        <div className="px-3">
          <div className="rounded bg-foreground/5 px-2 py-1">
            <input
              ref={inlineInputRef}
              value={inlineTitle}
              onChange={(e) => setInlineTitle(e.target.value)}
              onBlur={handleInlineSubmit}
              onKeyDown={handleInlineKeyDown}
              className="w-full text-xs text-foreground outline-none placeholder:text-foreground/30"
              placeholder="Untitled"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden p-3 ">
        {error ? (
          <div className="mb-3 rounded border border-red-900 bg-red-950 px-2 py-1 text-xs text-red-400">{getErrorMessage(error)}</div>
        ) : isLoading ? (
          <SidebarLoader />
        ) : workflows.length === 0 && inlineTitle === null ? (
          <div className="rounded border border-border p-3 text-xs text-foreground/30">No workflows yet.</div>
        ) : (
          <nav className="space-y-1 overflow-y-auto h-full">
            {workflows.map((workflow) => {
              const isActive = workflow.id === activeWorkflowId;
              const isEditing = editingId === workflow.id;

              return (
                <div
                  key={workflow.id}
                  className={`group rounded-xs px-2 py-1.5 transition-colors relative flex items-center justify-between gap-2 ${isActive ? ' bg-foreground/10' : 'hover:bg-foreground/10'}`}
                >
                  {isEditing ? (
                    <input
                      ref={editInputRef}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleEditSubmit(workflow)}
                      onKeyDown={(e) => handleEditKeyDown(e, workflow)}
                      className="w-full bg-transparent text-xs text-foreground outline-none py-0.5"
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
                        <div className={`truncate text-[13px] font-medium select-none ${isActive ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground/80'}`}>{workflow.name}</div>
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

      <div className="px-3 flex gap-2 mb-2">
        <input type="file" accept=".json,application/json" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <button
          onClick={handleImportClick}
          className="flex-1 text-[11px] font-medium py-1.5 border border-border/50 rounded-xs flex items-center justify-center gap-2 hover:bg-foreground/5 transition-colors cursor-pointer text-foreground/70 bg-foreground/5"
        >
          <LuUpload size={13} />
          Import
        </button>
        <div className="relative flex-1" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full text-[11px] font-medium py-1.5 border border-border/50 rounded-xs flex items-center justify-center gap-2 hover:bg-foreground/5 transition-colors cursor-pointer text-foreground/70 bg-foreground/5"
          >
            <LuDownload size={13} />
            Export
          </button>

          {showExportMenu && (
            <div className="absolute bottom-full left-0 w-full mb-1 bg-panel border border-border rounded-xs shadow-lg overflow-hidden z-50 py-1">
              <button onClick={handleExportJson} className="w-full text-left px-3 py-1.5 text-[10px] hover:bg-foreground/10 text-foreground transition-colors flex items-center gap-2">
                <LuFileJson size={12} />
                JSON
              </button>
              <button onClick={handleExportPng} className="w-full text-left px-3 py-1.5 text-[10px] hover:bg-foreground/10 text-foreground transition-colors flex items-center gap-2">
                <LuImage size={12} />
                PNG Image
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 flex items-center gap-2 p-3">
        <div className="w-7 h-7 rounded-xs overflow-hidden shrink-0">
          <div className="w-full h-full bg-foreground/10 flex items-center justify-center text-foreground/90 text-xs font-semibold">{initials}</div>
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-medium text-foreground/80">{user?.name ?? 'Username'}</div>
          <div className="truncate text-[11px] text-foreground/40">{user?.email ?? 'user@email.com'}</div>
        </div>
        <div className="ml-auto">
          <button type="button" onClick={() => setShowLogoutConfirm(true)} className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer">
            <IoIosLogOut size={17} />
          </button>
        </div>
      </div>

      {workflowToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-panel rounded-lg p-5 w-80 shadow-xl font-gothic text-left border border-border">
            <h3 className="text-foreground font-medium text-base mb-2">Delete Workflow</h3>
            <p className="text-foreground/60 text-sm mb-5 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-foreground/80">"{workflowToDelete.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => setWorkflowToDelete(null)} className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer px-3 py-1.5">
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
                      router.replace('/canvas');
                    }
                  }
                }}
                className="text-xs font-medium text-background bg-foreground transition-colors cursor-pointer px-4 py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-panel rounded-lg p-5 w-80 shadow-xl font-gothic text-left border border-border">
            <h3 className="text-foreground font-medium text-base mb-2">Confirm Logout</h3>
            <p className="text-foreground/60 text-sm mb-5 leading-relaxed">Are you sure you want to log out? You will need to sign in again to access your canvases.</p>
            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => setShowLogoutConfirm(false)} className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer px-3 py-1.5">
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowLogoutConfirm(false);
                  try {
                    await logout();
                  } catch (e) {}
                  router.replace('/');
                }}
                className="text-xs font-medium text-background bg-foreground transition-colors cursor-pointer px-4 py-1.5 rounded"
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
