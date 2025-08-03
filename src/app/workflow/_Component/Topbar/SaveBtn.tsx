import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { UpdateWorkflow } from "../../../../../actions/workflows/UpdateWorkflow";
import { toast } from "sonner";

const SaveBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  const { isPending, mutate } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved Successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Flow Failed to saved", { id: "save-workflow" });
    },
  });

  return (
    <Button
      disabled={isPending}
      variant={"outline"}
      className=" flex items-center gap-2"
      onClick={() => {
        const workflowDefinitaion = JSON.stringify(toObject());
        toast.loading("Saving Workflow...", { id: "save-workflow" });
        mutate({
          id: workflowId,
          definition: workflowDefinitaion,
        });
      }}
    >
      <CheckIcon size={16} className=" stroke-green-400"></CheckIcon> Save
    </Button>
  );
};

export default SaveBtn;
