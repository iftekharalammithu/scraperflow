import { Skeleton } from "@/components/ui/skeleton";
import { waitfor } from "@/lib/helper/Waitfor";
import React, { Suspense } from "react";
import { GetWorkflowForUser } from "../../../../actions/workflows/getworkflowsforuser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
const page = () => {
  return (
    <div className=" flex-1 flex flex-col h-full ">
      <div className=" flex justify-between">
        <div className=" flex flex-col">
          <h1 className=" text-3xl font-bold">Work Flows</h1>
          <p className=" text-muted-foreground">Manage your Workflows</p>
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
  const workflow = await GetWorkflowForUser();

  if (!workflow) {
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

  if (workflow.length === 0) {
    return (
      <div className=" flex flex-col gap-4 h-full items-center justify-center">
        <div className=" rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon className=" stroke-primary " size={40}></InboxIcon>
        </div>
        <div className=" flex flex-col gap-1 text-center">
          <p className=" font-bold ">No Workflow created yet</p>
          <p className=" text-sm text-muted-foreground">
            Click the button to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create Your first workflow"></CreateWorkflowDialog>
      </div>
    );
  }
  return <div>UserWorkFlows</div>;
};

export default page;
