import { WorkflowCard } from "./WorkflowCard";
import type { Workflow } from "../types";

export function WorkflowGrid({ workflows }: { workflows: Workflow[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {workflows.map((w) => (
        <WorkflowCard key={w.id} workflow={w} />
      ))}
    </div>
  );
}

