import { useState } from "react";
import { Modal } from "@/shared/components/ui/Modal";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

export function CreateWorkflowModal({
  open,
  onClose,
  onCreate,
  isCreating,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: { name: string; description?: string }) => Promise<void>;
  isCreating: boolean;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    await onCreate({
      name: name.trim(),
      description: description.trim() || undefined,
    }).catch((err: any) => {
      setError(
        typeof err?.response?.data?.error === "string"
          ? err.response.data.error
          : "Failed to create workflow",
      );
    });

    if (!error) {
      setName("");
      setDescription("");
      onClose();
    }
  }

  return (
    <Modal open={open}>
      <form className="w-[420px] space-y-3 z-999" onSubmit={submit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create workflow</h2>
          <button
            type="button"
            className="text-sm text-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {error ? (
          <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My workflow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            className="bg-gray-200 text-black"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
