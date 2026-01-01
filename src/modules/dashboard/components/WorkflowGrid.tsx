import { WorkflowCard } from "./WorkflowCard";

export function WorkflowGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <WorkflowCard />
      <WorkflowCard />
      <WorkflowCard />
    </div>
  );
}

