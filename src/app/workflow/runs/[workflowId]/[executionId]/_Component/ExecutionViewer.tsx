import React from "react";
import { GetWorkexecutionWithPhases } from "../../../../../../../actions/workflows/GetworkflowwithPhase";
import { useQuery } from "@tanstack/react-query";
import { WorkflowExecutionStatus } from "@/Types/workflow";
import { Calendar1Icon, CircleDashedIcon } from "lucide-react";

interface ExecutionProps {
  initialData: ExecutionData;
}

type ExecutionData = Awaited<ReturnType<typeof GetWorkexecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: ExecutionProps) => {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: () => GetWorkexecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });
  return (
    <div className=" flex w-full h-full">
      <aside className=" w-[440px] min-w-[440px] border-r-2 border-separate flex flex-col overflow-hidden">
        <div className=" py-4 px-2">
          <div className=" flex justify-between items-center py-2 px-4 text-sm">
            <CircleDashedIcon
              size={20}
              className=" stroke-muted-foreground"
            ></CircleDashedIcon>
            <span>Status</span>
          </div>
          <div className=" font-semibold capitalize flex gap-2 items-center">
            {query.data?.status}
          </div>
        </div>
        <div className=" text-accent-foreground flex">
          <div>
            <Calendar1Icon
              className=" stroke-accent-foreground"
              size={20}
            ></Calendar1Icon>
            <span>Started at</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;
