"use client";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/Types/workflow";
import { Workflow } from "@prisma/client";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteWorkflow from "./DeleteWorkflow";

interface WorkflowCardProps {
  workflow: Workflow;
}

const statusColor = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className=" border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className=" p-4 flex items-center justify-between h-[100px]">
        <div className=" flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10  rounded-full flex items-center  justify-center",
              statusColor[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className=" h-5 w-5"></FileTextIcon>
            ) : (
              <PlayIcon className=" h-5 w-5 text-white"></PlayIcon>
            )}
          </div>
          <div>
            <h3 className=" text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className=" flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className=" ml-2 px-2 py-0.5 text-xs font-medium text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className=" flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className=" flex items-center gap-2 "
          >
            <ShuffleIcon size={16}></ShuffleIcon>
            Edit
          </Link>
          <WorkflowAction
            workflowId={workflow.id}
            workflowName={workflow.name}
          ></WorkflowAction>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;

const WorkflowAction = ({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteWorkflow
        workflowId={workflowId}
        workflowName={workflowName}
        open={open}
        setOpen={setOpen}
      ></DeleteWorkflow>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More Actions"}>
              <MoreVerticalIcon size={18}></MoreVerticalIcon>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem
            className="  text-destructive flex items-center gap-2"
            onSelect={() => setOpen((open) => !open)}
          >
            <TrashIcon size={16}></TrashIcon>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
