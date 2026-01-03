import { useEffect, useState } from "react";
import { Modal } from "@/shared/components/ui/Modal";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

interface WorkflowModalProps {
  open: boolean;
  title: string;
  submitLabel: string;
  isSubmitting: boolean;
  initialValue?: {
    name: string;
    description?: string;
  };
  onClose: () => void;
  onSubmit: (input: { name: string; description?: string }) => Promise<void>;
}

function getErrorMessage(err: unknown) {
  const maybeError = err as { response?: { data?: { error?: unknown } } };
  if (typeof maybeError?.response?.data?.error === "string") return maybeError.response.data.error;
  return "Failed to save workflow";
}

export function WorkflowModal({
  open,
  title,
  submitLabel,
  isSubmitting,
  initialValue,
  onClose,
  onSubmit,
}: WorkflowModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(initialValue?.name ?? "");
    setDescription(initialValue?.description ?? "");
    setError(null);
  }, [open, initialValue]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name is required");
      return;
    }

    try {
      await onSubmit({ name: trimmedName, description: description.trim() || undefined });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <Modal open={open}>
      <form className="w-[420px] space-y-3" onSubmit={submit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" className="text-sm text-gray-600" onClick={onClose}>
            Close
          </button>
        </div>

        {error ? (
          <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My workflow" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" className="bg-gray-200 text-black" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
