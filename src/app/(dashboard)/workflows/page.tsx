import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import { GetWorkflowForUser } from "../../../../actions/workflows/getworkflowsforuser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";
const page = () => {
  return (
    <div className=" flex-1 flex flex-col h-full ">
      <div className=" flex justify-between">
        <div className=" flex flex-col">
          <h1 className=" text-3xl font-bold">Work Flows</h1>
          <p className=" text-foreground-foreground">Manage your Workflows</p>
        </div>
        <CreateWorkflowDialog></CreateWorkflowDialog>
      </div>
      <div className=" h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton></UserWorkflowsSkeleton>}>
          <UserWorkFlows></UserWorkFlows>
        </Suspense>
      </div>
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="  space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className=" h-32  w-full"></Skeleton>
      ))}
    </div>
  );
};

const UserWorkFlows = async () => {
  const workflows = await GetWorkflowForUser();
  // console.log(workflows);

  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className=" w-4 h-4"></AlertCircle>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className=" flex flex-col gap-4 h-full items-center justify-center">
        <div className=" rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon className=" stroke-primary " size={40}></InboxIcon>
        </div>
        <div className=" flex flex-col gap-1 text-center">
          <p className=" font-bold ">No Workflow created yet</p>
          <p className=" text-sm text-foreground-foreground">
            Click the button to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create Your first workflow"></CreateWorkflowDialog>
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow}></WorkflowCard>
      ))}
    </div>
  );
};

export default page;
