import Link from "next/link";
import type { Workflow } from "../types";

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link
      href={`/canvas/${workflow.id}`}
      className="block border rounded p-4 hover:shadow-sm transition-shadow"
    >
      <h3 className="font-semibold">{workflow.name}</h3>
      <p className="text-sm text-gray-600">
        {workflow.description?.trim() ? workflow.description : "No description"}
      </p>
    </Link>
  );
}

