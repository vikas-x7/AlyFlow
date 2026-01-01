interface CanvasPageProps {
  params: {
    workflowId: string;
  };
}

export default function CanvasPage({ params }: CanvasPageProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Canvas for workflow</h1>
      <p className="text-gray-600">Workflow ID: {params.workflowId}</p>
    </div>
  );
}

