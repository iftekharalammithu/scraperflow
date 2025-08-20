import React, { ReactNode, useState } from "react";
import { GetWorkexecutionWithPhases } from "../../../../../../../actions/workflows/GetworkflowwithPhase";
import { useQuery } from "@tanstack/react-query";
import { WorkflowExecutionStatus } from "@/Types/workflow";
import {
  Calendar1Icon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatesToDurationString } from "@/lib/helper/dates";
import { GetPhasesTotalCost } from "@/lib/helper/Phases";
import { GetWorkflowPhaseDetails } from "../../../../../../../actions/workflows/GetWorkflowPhaseDetails";

interface ExecutionProps {
  initialData: ExecutionData;
}

type ExecutionData = Awaited<ReturnType<typeof GetWorkexecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: ExecutionProps) => {
  const [selectedPhase, setselectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: () => GetWorkexecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phasesDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;
  const duration = DatesToDurationString(
    query.data?.completed,
    query.data?.startedAt
  );

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);
  return (
    <div className=" flex w-full h-full">
      <aside className=" w-[440px] min-w-[440px] border-r-2 border-separate flex flex-col overflow-hidden">
        <div className=" py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label={"Status"}
            value={query.data?.status}
          ></ExecutionLabel>
          <ExecutionLabel
            icon={Calendar1Icon}
            label={"Started at"}
            value={
              <span>
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          ></ExecutionLabel>
          <ExecutionLabel
            icon={ClockIcon}
            label={"Duration"}
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon size={20} className=" animate-spin"></Loader2Icon>
              )
            }
          ></ExecutionLabel>
          <ExecutionLabel
            icon={CoinsIcon}
            label={"Credit Consumed"}
            value={creditsConsumed}
          ></ExecutionLabel>
        </div>
        <Separator></Separator>
        <div className=" flex justify-center items-center py-2 px-4">
          <div className=" text-muted-foreground flex items-center gap-2">
            <WorkflowIcon
              size={20}
              className=" stroke-accent-foreground"
            ></WorkflowIcon>
            <span className=" font-semibold">Phases</span>
          </div>
        </div>
        <Separator></Separator>
        <div className=" overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, i) => (
            <Button
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              key={phase.id}
              onClick={() => {
                if (isRunning) {
                  return;
                }
                setselectedPhase(phase.id);
              }}
              className=" w-full justify-between"
            >
              <div className=" flex items-center gap-2">
                <Badge variant={"outline"}>{i + 1}</Badge>
                <p className=" font-semibold">{phase.name}</p>
              </div>
              <p className=" text-xs text-muted-foreground">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
      <div className=" flex w-full h-full">
        <pre>{JSON.stringify(phasesDetails, null, 4)}</pre>
      </div>
    </div>
  );
};

export default ExecutionViewer;

const ExecutionLabel = ({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) => {
  const Icon = icon;
  return (
    <div>
      <div className=" flex justify-between items-center py-2 px-4 text-sm">
        <Icon size={20} className=" stroke-muted-foreground"></Icon>
        <span>{label}</span>
      </div>
      <div className=" font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};
