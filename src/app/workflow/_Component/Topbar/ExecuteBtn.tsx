import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { RunWorkflow } from "../../../../../actions/workflows/RunWorkflow";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Execution Failed", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant={"outline"}
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      className=" flex items-center gap-2"
    >
      <PlayIcon size={16} className=" stroke-orange-400"></PlayIcon>
      Execute
    </Button>
  );
};

export default ExecuteBtn;
