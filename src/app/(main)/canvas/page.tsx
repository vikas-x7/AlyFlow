"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkflows } from "@/modules/dashboard/hooks/useWorkflows";
import { Button } from "@/shared/components/ui/Button";
import { Loader } from "@/shared/components/ui/Loader";

function getErrorMessage(err: unknown) {
  const maybeError = err as { response?: { data?: { error?: unknown } } };
  if (typeof maybeError?.response?.data?.error === "string")
    return maybeError.response.data.error;
  return "Failed to open canvas";
}

export default function CanvasEntryPage() {
  const router = useRouter();
  const { workflows, isLoading, error, refetch, createWorkflow, isCreating } =
    useWorkflows();
  const startedRef = useRef(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading || error || startedRef.current) return;

    startedRef.current = true;

    if (workflows.length > 0) {
      setIsRedirecting(true);
      router.replace(`/canvas/${workflows[0].id}`);
      return;
    }

    createWorkflow({ name: "Untitled" })
      .then((workflow) => {
        setIsRedirecting(true);
        router.replace(`/canvas/${workflow.id}`);
      })
      .catch((err) => {
        setInitError(getErrorMessage(err));
        startedRef.current = false;
      });
  }, [isLoading, error, workflows, createWorkflow, router]);

  const listError = error ? getErrorMessage(error) : null;
  const activeError = initError ?? listError;

  if (activeError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#101011]">
        <div className="space-y-3 text-center">
          <div className="rounded border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-400">
            {activeError}
          </div>
          {activeError === "Unauthorized" ? (
            <Link
              href="/login"
              className="text-sm text-blue-400 hover:underline"
            >
              Go to login
            </Link>
          ) : (
            <Button
              onClick={() => {
                setInitError(null);
                startedRef.current = false;
                void refetch();
              }}
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Show loader for ALL states until fully redirected
  return (
    <div className="flex h-screen items-center justify-center bg-[#101011]">
      <Loader />
    </div>
  );
}
