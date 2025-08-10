import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        const plan = generate();
        console.log(plan);
      }}
      className=" flex items-center gap-2"
    >
      <PlayIcon size={16} className=" stroke-orange-400"></PlayIcon>
      Execute
    </Button>
  );
};

export default ExecuteBtn;
